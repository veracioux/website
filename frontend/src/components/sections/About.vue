<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import Icon from "@/components/generic/Icon.vue";
import mugshot from "@/assets/mugshot.webp";
</script>

<template>
    <div class="fullWindow section">
        <SectionTitle :class="s.sectionTitle"> About Me</SectionTitle>
        <div class="contentContainer">
            <div class="content">
                <div class="leftContent">
                    <div class="frame">
                        <div class="photoWrapper">
                            <img v-lazy="mugshot" class="photo" />
                        </div>
                        <div class="versionContainer">
                            <span class="version"> version: 23 </span>
                        </div>
                        <div class="socialsContainer">
                            <div class="socials">
                                <Icon name="github" class="icon" />
                                <Icon name="linkedin" class="icon" />
                                <Icon name="mail" class="icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bio">
                    <div class="bioContent">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas vitae lorem eu velit tincidunt sagittis eget
                        sit amet nulla. Curabitur sodales malesuada tempor.
                        Pellentesque ut lacus egestas, mattis lectus non,
                        tincidunt urna. Duis ut blandit neque. Curabitur eu
                        mattis leo. Phasellus eleifend velit maximus tempus
                        finibus. Fusce varius, nisl non cursus ultricies, dui
                        odio luctus ipsum, et placerat orci tellus in dolor.
                        Cras vitae ipsum ac sapien interdum euismod eget id
                        dolor. Praesent tincidunt finibus enim quis sagittis.
                        Nunc posuere iaculis fermentum. Praesent fermentum mi id
                        bibendum tempus. Etiam eget nisl at libero dapibus
                        pulvinar a in purus. Ut at magna diam. Proin sed
                        interdum ex. Integer at urna pretium, facilisis felis
                        tempor, cursus dui. Proin blandit ipsum vitae tristique
                        posuere. Integer et turpis sit amet eros molestie porta
                        et sed sem. Curabitur suscipit magna mauris, eu molestie
                        ipsum tincidunt vel. Maecenas sit amet ipsum tempus,
                        fermentum orci eget, ornare ipsum. Vivamus eget elit et
                        elit interdum sagittis. Mauris viverra, dui sit amet
                        molestie dictum, quam nisl ultrices purus, eget faucibus
                        libero felis a nunc. Vivamus pellentesque fermentum
                        consequat. Ut mollis, mauris non tincidunt congue, est
                        tortor venenatis nulla, quis interdum nisi lorem at
                        lectus. Curabitur nunc diam, auctor et purus ut, rhoncus
                        condimentum dolor. Nulla ultricies lectus quam, eget
                        iaculis magna rutrum at. Mauris auctor at ante a
                        scelerisque. Suspendisse potenti. Class aptent taciti
                        sociosqu ad litora torquent per conubia nostra, per
                        inceptos himenaeos. Ut at metus vel lacus gravida tempus
                        id eget odio. Sed pellentesque sem eget elit tempor
                        ultrices. Ut ac quam nunc. Vestibulum ante ipsum primis
                        in faucibus orci luctus et ultrices posuere cubilia
                        curae; Donec vestibulum libero eu urna imperdiet
                        egestas. Pellentesque sodales purus enim, vel feugiat
                        ligula finibus ut. Etiam ut malesuada libero.
                        Suspendisse lacinia feugiat nisl, rutrum vestibulum
                        lorem lobortis varius. In vel leo molestie, sollicitudin
                        justo eu, mollis est. Praesent id faucibus felis. Donec
                        tincidunt felis facilisis est cursus, convallis varius
                        elit rutrum. Proin faucibus neque ac tortor convallis,
                        sed interdum dui scelerisque. Vestibulum quis posuere
                        libero. Duis pharetra purus nec sapien auctor porttitor.
                        Aliquam dignissim molestie odio, ac pharetra ex ornare
                        ut. Proin facilisis a leo eget mattis. Morbi turpis
                        purus, suscipit vitae pretium ac, pulvinar ac sem. In et
                        mattis orci. Nunc imperdiet nibh sed cursus dapibus.
                        Integer efficitur diam tincidunt magna tincidunt, ut
                        eleifend eros dapibus. Aliquam consequat quam nec diam
                        bibendum, in feugiat nisi facilisis. Morbi eget leo ut
                        ipsum dignissim ultricies. Aenean malesuada, dui at
                        scelerisque ullamcorper, massa velit fermentum orci, at
                        hendrerit augue metus id purus. Aliquam vitae metus non
                        metus euismod consectetur. Duis sit amet justo at purus
                        interdum pharetra. Fusce congue fringilla consequat.
                        Suspendisse tincidunt lacus dui, et ultricies nunc
                        faucibus auctor. Nullam gravida diam dapibus urna
                        ultricies maximus. Mauris ac accumsan neque. Suspendisse
                        nec elit elit. Mauris tincidunt fermentum viverra.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/global.scss" as g;

.section {
    background: var(--color-background-1);

    .sectionTitle {
        position: sticky;
        top: 0;
    }
}

.contentContainer {
    @include c.fillParent;
    padding: 32px 24px;

    @include c.centerFlex;

    .content {
        @include c.centerFlex;
        flex-direction: column;
        gap: 48px;
        font-family: monospace;

        @include g.screenWidthAbove(g.$small) {
            flex-direction: row;
            align-items: start;
        }

        .leftContent {
            @include c.centerFlex;
            flex-direction: column;
            gap: 16px;
            height: 100%;

            .frame {
                position: relative;
                background: rgba(white, 0.03);
                $edgeRadius: 32px;
                @include c.beveledEdges($edgeRadius);

                --frame-height: 3.2em;

                padding: var(--frame-height);

                &::before,
                &::after {
                    z-index: -1;
                    position: absolute;
                    background: inherit;
                    content: "";
                }

                &::before {
                    inset: calc(var(--frame-height) / 3);
                    @include c.beveledEdges(calc($edgeRadius * 0.75));
                }

                &::after {
                    inset: calc(var(--frame-height) * 2 / 3);
                    @include c.beveledEdges(calc($edgeRadius * 0.5));
                }

                .photoWrapper {
                    position: relative;
                    @include c.beveledEdges($edgeRadius * 0.4);
                    height: fit-content;
                    // If omitted, there is some weird padding between this and <img>
                    display: flex;

                    .photo {
                        max-width: 40vw;
                        max-height: min(240px, 30vh);
                    }

                    &::after {
                        @include c.fillParent;
                        z-index: 5;
                        content: "";
                        box-shadow: inset 0 0 40px var(--color-background-2);
                    }
                }

                @mixin badgeContainer($side) {
                    position: absolute;
                    inset: auto 0;
                    #{$side}: 0;
                    height: var(--frame-height);
                    @include c.centerFlex;
                }

                @mixin badge {
                    padding: 0.5em 0.75em;
                    background: var(--color-background-0);
                }

                .versionContainer {
                    @include badgeContainer(bottom);
                    user-select: none;

                    .version {
                        font-family: monospace;
                        font-weight: bold;
                        color: var(--color-secondary);

                        @include badge;
                        @include c.beveledEdges(8px);
                    }
                }

                .socialsContainer {
                    @include badgeContainer(top);

                    .socials {
                        @include c.centerFlex;
                        gap: 1em;
                        @include badge;
                        @include c.beveledEdges(8px);

                        .icon {
                            width: 1.2em;
                            height: 1.2em;
                            color: var(--color-primary);
                        }
                    }
                }
            }
        }

        .bio {
            max-width: 600px;
            height: 400px;
            overflow: hidden;

            .bioContent {
                -webkit-column-width: 600px;
                column-width: 600px;
                height: 100%;
                line-height: 150%;
                text-align: justify;
            }
        }
    }
}
</style>

<style module="s" lang="scss">
.sectionTitle {
    position: sticky;
    top: 0;
}
</style>
