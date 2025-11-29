<!-- A regular <script> tag (without setup) is needed so I can export `plugin` from this file -->
<script lang="ts">
import type { App, PropType } from "vue";
import { defineComponent, h } from "vue";
import type { Project } from "@/projects";
import Icon from "@/components/generic/Icon.vue";
import Label from "@/components/generic/Label.vue";
import type { IconProps } from "@/components/generic/Icon.vue";
import type { IconName } from "@fortawesome/fontawesome-svg-core";

interface URLEntryProps {
  href: string;
  iconProps: IconProps;
}

const mousePosAtLastMouseUpEvent = {
  x: 0,
  y: 0,
};
let mounted = false;

function getCenterPoint(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

function getPopupAnimation(element: HTMLElement) {
  const { x, y } = mousePosAtLastMouseUpEvent;
  const center = getCenterPoint(element);
  return [
    {
      transform: `translate(${x - center.x}px, ${y - center.y}px) scale(0)`,
    },
    {
      transform: `translate(0) scale(1)`,
    },
  ];
}

function getRepoUrlIconName(url: string | undefined): IconName | undefined {
  if (!url) return undefined;
  if (url.match(/^https?:\/\/(www\.)?github\.com\//)) return "github";
  else if (url.match(/^https?:\/\/(www\.)?gitlab\.com\//)) return "gitlab";
  else return "code";
}

const component = defineComponent({
  components: {
    Icon,
    Label,
    // TODO: Extract into .vue component
    UrlEntry: defineComponent({
      props: ["href", "iconProps"],
      render({ href, iconProps }: URLEntryProps) {
        return h("a", { class: "urlEntry", href, target: "_blank" }, [
          iconProps ? h(Icon, { ...iconProps, className: "icon" }) : null,
          h("div", {}, this.$slots.default?.()),
          h(Icon, {
            name: "externalLink",
            className: "icon externalLink",
            center: true,
          }),
        ]);
      },
    }),
  },
  props: {
    project: Object as PropType<Project | undefined>,
  },
  data() {
    return {
      /** Indicates whether the popout animation is active. */
      poppingOut: false,
    };
  },
  mounted() {
    const container = this.$refs.container as HTMLElement;
    // NOTE: In development mode, sometimes after hot reload, the origin of the animation
    // will be (0, 0) regardless of the mouse pos. This is not an issue in production.
    container.animate(getPopupAnimation(container), {
      duration: 150,
      easing: "ease-out",
    });
    // Prevent body scrolling while modal is active
    document.body.addEventListener("wheel", this.eventPreventDefault, {
      passive: false,
    });
    mounted = true;
  },
  unmounted() {
    // Re-allow body scrolling after modal was closed
    document.body.removeEventListener("wheel", this.eventPreventDefault);
    mounted = false;
  },
  emits: ["close"],
  methods: {
    close() {
      const container = this.$refs.container as HTMLElement;
      const animation = container.animate(getPopupAnimation(container), {
        duration: 150,
        easing: "ease-out",
        direction: "reverse",
      });
      this.poppingOut = true;
      animation.addEventListener("finish", () => {
        this.$emit("close");
      });
    },
    getRepoUrlIconName,
    eventPreventDefault(event: Event) {
      event.preventDefault();
    },
  },
});

/**
 * Plugin that enables us to listen for "mouseup" events on the document even before
 * this component is mounted. This is used to obtain the mouse position before the
 * modal is shown in order to adjust the animation.
 */
export const plugin = {
  install(app: App) {
    const mount = app.mount;
    app.mount = function (rootContainer, isHydrate, isSVG) {
      document.addEventListener("mousedown", (e) => {
        if (!mounted) {
          Object.assign(mousePosAtLastMouseUpEvent, {
            x: e.clientX,
            y: e.clientY,
          });
        }
      });
      return mount(rootContainer, isHydrate, isSVG);
    };
  },
};

export default component;
</script>

<template>
  <Teleport to="body">
    <div
      :class="{
        [s.modalBackground]: true,
        [s.poppingOut]: poppingOut,
      }"
      class="fixed inset-0 flex items-center justify-center"
      @click="close"
    >
      <div :class="s.container" ref="container" @click.stop>
        <button class="absolute top-6 right-8" @click="close">
          <Icon
            name="x"
            class="text-[1.75rem] text-[var(--color-secondary)]"
          ></Icon>
        </button>
        <div :class="s.identity">
          <img
            v-if="project?.image_url"
            :src="project?.image_url"
            alt="Project image"
            class="h-14 max-w-[60%]"
            loading="lazy"
          />
          <div v-if="project?.show_title ?? true" class="text-2xl">
            {{ project?.title }}
          </div>
          <div :class="p.description">{{ project?.desc }}</div>
        </div>
        <div :class="s.urls">
          <UrlEntry :href="project?.url" :iconProps="{ name: 'web' }"
            >Project website
          </UrlEntry>
          <UrlEntry
            v-if="project?.repo_url"
            :href="project?.repo_url"
            :iconProps="{
              name: getRepoUrlIconName(project?.repo_url),
            }"
          >
            Repo
          </UrlEntry>
          <UrlEntry
            v-if="project?.my_contributions_url"
            :href="project?.my_contributions_url"
            :iconProps="{ name: 'PR' }"
          >
            My contributions
          </UrlEntry>
        </div>
        <div>
          <h4>Roles</h4>
          <div :class="s.tags">
            <Label
              v-bind:key="label"
              v-for="label in project?.roles"
              :title="label"
            ></Label>
          </div>
        </div>
        <div>
          <h4>Tools & Languages</h4>
          <div :class="s.tags">
            <Label
              v-bind:key="label"
              v-for="label in project?.languages"
              :title="label"
            ></Label>
          </div>
        </div>
        <!--                <Button>Contribute</Button>-->
      </div>
    </div>
  </Teleport>
</template>

<style module="s" lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/project.module.scss" as p;

.ignorePointerEvents {
  pointer-events: none;
}

.modalBackground {
  @include c.fillWindow;
  @include c.centerFlex;
  background: rgba(var(--color-background-0-rgb), 0.4);
  // TODO Would normally use v-bind("zindex.modal"), but doesn't cooperate with <Teleport>.
  z-index: 100;

  @include c.opacityFadeIn(0.2s ease-in-out);

  &.poppingOut {
    @include c.opacityFadeIn(0.2s ease-in-out reverse);
  }

  pointer-events: all;
}

.closeButton {
  all: unset;
  position: absolute;
  inset: 14px 14px auto auto;
  padding: 4px;
  border-radius: 8px;

  display: inline-flex;

  background: rgba(var(--color-secondary-rgb), 0.2);
  cursor: pointer;

  .closeIcon {
    color: rgba(var(--color-secondary-rgb), 0.8);
    width: 20px;
    height: 20px;
  }
}

.container {
  @include c.centerFlex;
  flex-direction: column;
  position: fixed;
  max-width: 1200px;

  border-radius: 16px;
  padding: 48px;
  gap: 32px;
  background: var(--color-background-2);

  @include p.containerHighlighted;

  .identity {
    @include c.centerFlex;
    flex-direction: column;
    gap: 16px;
  }

  & > div {
    @include c.centerFlex;
    flex-direction: column;
    gap: 12px;
  }

  .tags {
    @include c.centerFlex;
    gap: 8px;
  }
}
</style>

<style scoped lang="scss">
.urlEntry {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  :deep(.icon) {
    height: 20px;
    color: var(--color-primary);
  }

  :deep(.externalLink) {
    color: var(--color-secondary);
  }
}
</style>

<style module="p" lang="scss">
@forward "@/assets/project.module.scss";
</style>

<style module="c" lang="scss">
@forward "@/assets/common.module.scss";
</style>
