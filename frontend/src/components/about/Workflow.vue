<script setup lang="ts">
import { h, type VNode } from "vue";
import _Icon from "@/components/generic/Icon.vue";
import iconI3 from "@/assets/icons/i3.svg";
import iconAlacritty from "@/assets/icons/alacritty.svg";
import iconArchlinux from "@/assets/icons/archlinux.svg";
import iconGit from "@/assets/icons/git.svg";
import iconGitWithText from "@/assets/icons/git-with-text.svg";
import iconFish from "@/assets/icons/fish.png";
import iconNeovim from "@/assets/icons/neovim.svg";
import iconEmacs from "@/assets/icons/emacs.svg";
import iconDocker from "@/assets/icons/docker.svg";

function Icon(props: { src: string; alt?: string; href?: string }) {
  const icon = h(_Icon, { class: "icon", ...props });
  return props.href
    ? h("a", { href: props.href, target: "_blank" }, icon)
    : icon;
}

const workflow: Record<string, (() => VNode)[]> = {
  home: [
    () =>
      h(Icon, {
        src: iconArchlinux,
        alt: "archlinux",
        href: "https://archlinux.org",
      }),
    () =>
      h("a", { href: "https://i3wm.org", target: "_blank", class: "icon" }, [
        h(Icon, { src: iconI3, alt: "i3" }),
        " i3wm",
      ]),
    () =>
      h(
        "a",
        { href: "https://alacritty.org", target: "_blank", class: "icon" },
        [h(Icon, { src: iconAlacritty, alt: "alacritty" }), " alacritty"]
      ),
    () =>
      h(
        "a",
        { href: "https://fishshell.com", target: "_blank", class: "icon" },
        [
          h(Icon, {
            src: iconFish,
            alt: "fish",
            href: "https://fishshell.com",
          }),
          " fish",
        ]
      ),
    () =>
      h(
        "a",
        {
          href: "https://github.com/veracioux/dotfiles",
          target: "_blank",
          class: "icon",
        },
        [h(Icon, { src: iconGit, alt: "git" }), " dotfiles"]
      ),
  ],
  editors: [
    () =>
      h("a", { href: "https://neovim.io/", target: "_blank", class: "icon" }, [
        h(Icon, { src: iconNeovim, alt: "neovim" }),
        " neovim",
      ]),
    () =>
      h(
        "a",
        {
          href: "https://www.gnu.org/s/emacs",
          target: "_blank",
          class: "icon",
        },
        [h(Icon, { src: iconEmacs, alt: "emacs" }), " emacs"]
      ),
  ],
  tools: [
    () =>
      h(Icon, {
        src: iconGitWithText,
        alt: "git",
        href: "https://git-scm.com",
      }),
    () =>
      h(Icon, {
        src: iconDocker,
        alt: "docker",
        href: "https://www.docker.com",
      }),
  ],
};
</script>

<template>
  <div class="clippedContainer">
    <div class="workflowRoot">
      <span class="!inline-flex items-center"
        ><b class="text-[var(--color-text)]">Workflow</b>.json</span
      >
      <div>{</div>
      <div
        v-bind:key="key"
        v-for="([key, items], i) of Object.entries(workflow)"
        class="ml-5"
      >
        "<b class="text-[var(--color-text)]"> {{ key }} </b>": [
        <div class="mx-5">
          <span
            v-bind:key="i"
            v-for="(item, i) of items"
            style="line-height: 1"
          >
            <span class="text-white">
              <component :is="item" />
            </span>
            <pre>{{ i !== items.length - 1 ? ", " : "" }}</pre>
          </span>
        </div>
        ]{{ i !== items.length - 1 ? ", " : "" }}
      </div>
      <div>}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.clippedContainer {
  filter: drop-shadow(0 0 0.25rem rgba(var(--color-secondary-rgb), 0.5));
}

.workflowRoot {
  position: relative;
  color: rgb(var(--color-text-rgb), 0.75);
  padding: 24px;
  line-height: 2;
  z-index: 20;
  @include c.beveledEdges(20px);
  background: var(--color-background-2);
}

.icon,
:deep(.customIcon) {
  $iconSize: 24px;
  height: $iconSize;
  width: auto;

  font-size: 0.8em;
  text-align: center;
  vertical-align: middle;

  &[alt="fish"] {
    margin-left: 0.3em;
    transform: translateY(-5%) scale(1.1);
  }

  &[alt="docker"] {
    transform: scale(0.75);
  }

  &[alt="git"] {
    transform: scale(0.75);
  }

  &[alt="alacritty"] {
    transform: scale(0.75);
  }
}

span,
a,
b,
:deep(span) {
  white-space: nowrap;
  // This is just so browser inspect tools show a reasonable boundary around items
  display: inline-block;
  vertical-align: middle;
}

pre {
  display: inline-block;
}
</style>
