Bun is used as the runtime instead of Node.js.

## Adding a New Skill

To add a new skill to the CV:

1. **Gather information from user:**

   - Skill name (e.g., "Node.js")
   - Skill group (e.g., "programmingLanguages", "technologies", "otherTools", "others")
   - Experience (e.g., "4 years")
   - Icon scale factor (default 1.0, or specify if different)
   - Confirm if icon exists in @/assets/icons/ (assume {lowercase name}.svg)
   - Any special properties (e.g., disabled: true/false, default false)

2. **Edit @src/cv.tsx:**

   - Add import for the icon: `import icon{Name} from "@/assets/icons/{name}.svg";`
   - Add skill object in \_skills with name, icon, group, experience, and other properties

3. **Edit @src/components/cv/SkillsPane.vue:**
   - Add to extraClasses: `{name}: "icon{Name}"`
   - Add CSS class: `.icon{Name} { @include scaledIcon({scale}); }`
