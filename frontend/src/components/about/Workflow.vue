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
import iconJetBrains from "@/assets/icons/jetbrains.svg";
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
    () => h(Icon, { src: iconI3, alt: "i3", href: "https://i3.org" }),
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
    () =>
      h(Icon, {
        src: iconJetBrains,
        alt: "jetbrains",
        href: "https://www.jetbrains.com",
      }),
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
    () =>
      h(
        "a",
        { href: "https://github.com/tem-cli/tem", target: "_blank" },
        "tem"
      ),
  ],
};
</script>

<template>
  <div class="workflowRoot">
    <span style="display: inline"
      ><b class="highlight" style="display: inline">Workflow</b>.json</span
    >
    <div>{</div>
    <div
      v-bind:key="key"
      v-for="([key, items], i) of Object.entries(workflow)"
      class="indented"
    >
      "<b class="highlight">{{ key }}</b
      >": [
      <div class="mx-5">
        <span v-bind:key="i" v-for="(item, i) of items" style="line-height: 1">
          <span class="highlight">
            <component :is="item" />
          </span>
          <pre>{{ i !== items.length - 1 ? ", " : "" }}</pre>
        </span>
      </div>
      ]{{ i !== items.length - 1 ? ", " : "" }}
    </div>
    <div>}</div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.workflowRoot {
  background: var(--color-background-0);
  color: #ffffff33; // TODO change
  @include c.beveledEdges(20px);
  padding: 24px;
  line-height: 2;
}

.highlight {
  color: white;
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

  &[alt="jetbrains"] {
    transform: scale(2.4) translate(calc(-0.25 * #{$iconSize}));
    transform-origin: 0;
    margin-right: calc(0.125 * #{$iconSize});
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
