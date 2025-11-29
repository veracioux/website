export interface Skill {
  // TODO: Make required
  key?: string;
  name: string;
  icon?: string;
  disabled?: boolean;
  group?: SkillGroup;
  experience?: string;
}

export interface SkillGroup {
  key: string;
  name: string;
  disabled?: boolean;
}
