/**
 * @file A registry of all z-indexes to improve maintainability.
 *
 * The z-indexes defined here are to be used in v-bind directives in CSS.
 */

// NOTE: When changing a property here, don't rely on IDE functionality to
// find usages. Instead search for v-bind("zindex.<property-name>").
export default {
    shutter: 1,
    section: 2,
    navbar: 3,
    navbarBackground: 3,
    navbarContent: 4,
};
