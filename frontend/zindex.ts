/**
 * @file A registry of all z-indexes to improve maintainability.
 *
 * The z-indexes defined here are to be used in v-bind directives in CSS.
 */

// NOTE: When changing a property here, don't rely on IDE functionality to
// find usages. Instead, search for v-bind("zindex.<property-name>").
export default {
    section: 1,
    shutter: 2,
    introSection: 3,
    navbar: 4,
    navbarBackground: 4,
    navbarContent: 5,
    // NOTE: The modal is wrapped by a <Teleport>, hence v-bind("zindex.modal") doesn't work.
    // Therefore, this value is unused, but is kept here as documentation of that fact.
    modal: 100,
};
