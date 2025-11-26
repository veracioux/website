import iconTS from "@/assets/icons/typescript.svg";
import iconJS from "@/assets/icons/javascript.svg";
import iconPython from "@/assets/icons/python.svg";
import iconC from "@/assets/icons/c.svg";
import iconCpp from "@/assets/icons/cpp.svg";
import iconQt from "@/assets/icons/qt.svg";
import iconBash from "@/assets/icons/bash.svg";
import iconReact from "@/assets/icons/react.svg";
import iconVue from "@/assets/icons/vue.svg";
import iconDjango from "@/assets/icons/django.svg";
import iconDocker from "@/assets/icons/docker.svg";
import iconLinux from "@/assets/icons/linux.svg";
import iconGit from "@/assets/icons/git-with-text.svg";
import iconJetBrains from "@/assets/icons/jetbrains.svg";
import iconEmacs from "@/assets/icons/emacs.svg";
import iconNginx from "@/assets/icons/nginx.svg";
import iconEthereum from "@/assets/icons/ethereum.svg";
import iconSolana from "@/assets/icons/solana.svg";
import iconJava from "@/assets/icons/java.svg";
import iconCSharp from "@/assets/icons/csharp.svg";
import type { JSX } from "vue/jsx-runtime";

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

const _skillGroups = {
  programmingLanguages: {
    key: "programmingLanguages",
    name: "Programming Languages",
  },
  frameworksAndTechnologies: {
    key: "frameworksAndTechnologies",
    name: "Frameworks & Technologies",
  },
  otherTools: {
    key: "otherTools",
    name: "Other Tools",
  },
  others: {
    key: "others",
    name: "Others",
  },
  stale: {
    key: "stale",
    name: "Stale",
    disabled: true,
  },
} as const satisfies Record<string, SkillGroup>;

export const skillGroups = _skillGroups as Record<
  keyof typeof _skillGroups,
  SkillGroup
>;

const _skills = {
  javascript: {
    name: "JavaScript",
    icon: iconJS,
    group: skillGroups.programmingLanguages,
    experience: "4 years",
  },
  typescript: {
    name: "TypeScript",
    icon: iconTS,
    group: skillGroups.programmingLanguages,
    experience: "4 years",
  },
  c: {
    name: "C",
    icon: iconC,
    group: skillGroups.programmingLanguages,
    experience: "1 year",
  },
  cpp: {
    name: "C++",
    icon: iconCpp,
    group: skillGroups.programmingLanguages,
    experience: "3 years",
  },
  python: {
    name: "Python",
    icon: iconPython,
    group: skillGroups.programmingLanguages,
    experience: "5 years",
  },
  bash: {
    name: "Bash",
    icon: iconBash,
    group: skillGroups.programmingLanguages,
    experience: "2 years",
  },
  qt: {
    name: "Qt",
    icon: iconQt,
    group: skillGroups.frameworksAndTechnologies,
    experience: "1 year",
  },
  react: {
    name: "ReactJS",
    icon: iconReact,
    group: skillGroups.frameworksAndTechnologies,
    experience: "1 year",
  },
  angular: {
    name: "Angular",
    icon: iconReact, // FIXME
    group: skillGroups.frameworksAndTechnologies,
    experience: "1 year",
  },
  golang: {
    name: "Go",
    icon: iconReact, // FIXME
    group: skillGroups.programmingLanguages,
    experience: "6 months",
  },
  vue: {
    name: "Vue.js",
    icon: iconVue,
    group: skillGroups.frameworksAndTechnologies,
    experience: "6 months",
  },
  django: {
    name: "Django",
    icon: iconDjango,
    group: skillGroups.frameworksAndTechnologies,
    disabled: true,
  },
  ethereum: {
    name: "Ethereum",
    icon: iconEthereum,
    group: skillGroups.frameworksAndTechnologies,
    experience: "6 months",
  },
  solana: {
    name: "Solana",
    icon: iconSolana,
    group: skillGroups.frameworksAndTechnologies,
    disabled: true,
  },
  nginx: {
    name: "Nginx",
    icon: iconNginx,
    group: skillGroups.frameworksAndTechnologies,
    experience: "6 months",
  },
  docker: {
    name: "Docker",
    icon: iconDocker,
    group: skillGroups.otherTools,
    experience: "1 year",
  },
  git: {
    name: "Git",
    icon: iconGit,
    group: skillGroups.otherTools,
    experience: "3 years",
  },
  jetbrains: {
    name: "JetBrains",
    icon: iconJetBrains,
    group: skillGroups.otherTools,
    experience: "1 year",
    disabled: true,
  },
  linux: {
    name: "Linux",
    icon: iconLinux,
    group: skillGroups.otherTools,
    experience: "3 years",
  },
  emacs: {
    name: "Emacs",
    icon: iconEmacs,
    group: skillGroups.otherTools,
    experience: "2 years",
    disabled: true,
  },
  plc: {
    name: "PLC programming",
    group: skillGroups.others,
    experience: "6 months",
  },
  tiaPortal: {
    name: "TIA Portal",
    group: skillGroups.others,
    disabled: true,
  },
  soMachine: {
    name: "SoMachine",
    group: skillGroups.others,
    disabled: true,
  },
  abbVFD: {
    name: "ABB VFDs (basic)",
    group: skillGroups.others,
    disabled: true,
  },
  java: {
    name: "Java",
    icon: iconJava,
    experience: "1 year",
    group: skillGroups.programmingLanguages,
  },
  csharp: {
    name: "C#",
    icon: iconCSharp,
    group: skillGroups.stale,
  },
  teaching: {
    name: "Teaching",
    group: skillGroups.others,
    disabled: true,
  },
  technicalWriting: {
    name: "Technical writing",
    group: skillGroups.others,
  },
} as const satisfies Record<string, Skill>;

export const skills = _skills as Record<keyof typeof _skills, Skill>;

export interface Group {
  key: string;
  name: string;
  disabled?: boolean;
  entries?: Entry[];
}

export interface Entry {
  key?: string;
  node: () => JSX.Element;
  startDate: string;
  endDate?: string;
  displayDate?: string;
  skills: Array<Skill | string>;
  labels?: string[];
  group?: Group;
  disabled?: boolean;
}

const _groups = {
  education: {
    name: "Education",
    key: "education",
  },
  professionalExperience: {
    name: "Professional Experience",
    key: "professionalExperience",
  },
  otherExperience: {
    name: "Other experience",
    key: "otherExperience",
  },
  extraCurricular: {
    name: "Extra-curricular",
    key: "extraCurricular",
    disabled: true,
  },
} as const satisfies Record<string, Group>;

export const groups = _groups as Record<keyof typeof _groups, Group>;

const _entries = {
  enocean: {
    node: () => (
      <span>
        <a href="https://www.linkedin.com/company/enocean/" target="_blank">
          <b>EnOcean</b>
        </a>
        , Full-Stack Software Engineer, Full-Time
      </span>
    ),
    startDate: "2023-01",
    displayDate: "Jan 2023 - present",
    skills: [
      _skills.typescript,
      _skills.python,
      _skills.javascript,
      _skills.java,
      _skills.angular,
      _skills.docker,
      _skills.golang,
      _skills.git,
      _skills.jetbrains,
    ],
    labels: ["IoT", "Frontend", "Backend"],
    group: groups.professionalExperience,
  },
  evoltSoftwareEngineer: {
    node: () => (
      <span>
        <a href="https://www.linkedin.com/company/evolt-dev/" target="_blank">
          <b>Evolt</b>
        </a>
        , Full-Stack Software Engineer, Full-Time
      </span>
    ),
    startDate: "2022-01",
    displayDate: "Jan 2022 - present",
    skills: [
      skills.javascript,
      skills.typescript,
      skills.react,
      skills.git,
      skills.docker,
      skills.ethereum,
      skills.docker,
      skills.jetbrains,
      skills.docker,
    ],
    labels: ["Backend", "Frontend", "Blockchain"],
    group: groups.professionalExperience,
  },
  evoltInternship: {
    node: () => (
      <span>
        <a href="https://www.linkedin.com/company/evolt-dev/" target="_blank">
          <b>Evolt</b>
        </a>
        , one month internship
      </span>
    ),
    startDate: "2021-12",
    displayDate: "Dec 2021",
    skills: [skills.python, skills.django, skills.docker, skills.jetbrains],
    labels: ["Backend"],
    group: groups.professionalExperience,
    disabled: true,
  },
  personalWebsite: {
    node: () => (
      <span>
        <a href="https://github.com/veracioux/website" target="_blank">
          Personal website and webserver
        </a>
      </span>
    ),
    startDate: "2021-11",
    displayDate: "Nov 2021 - present",
    skills: [
      skills.python,
      skills.django,
      skills.typescript,
      skills.javascript,
      skills.docker,
      skills.vue,
      skills.nginx,
      skills.linux,
      skills.bash,
    ],
    labels: ["Backend", "Frontend", "Google Cloud"],
    group: groups.otherExperience,
  },
  opencode: {
    node: () => (
      <span>
        <a href="https://opencode.ai" target="_blank">
          <b>OpenCode</b>
        </a>
        , Open Source Terminal AI Agent
      </span>
    ),
    startDate: "2025-10",
    displayDate: "Oct 2025 - present",
    skills: [skills.typescript, skills.git],
    labels: ["Contributor"],
    group: groups.otherExperience,
  },
  flameshot: {
    node: () => (
      <span>
        <a href="https://flameshot.org" target="_blank">
          <b>Flameshot</b>
        </a>
        , A Free & Open Source Screenshot Program <br />
      </span>
    ),
    startDate: "2021",
    endDate: "present",
    skills: [skills.cpp, skills.qt, skills.git],
    labels: ["Co-maintainer", "Developer", "Tester", "UI/UX Designer"],
    group: groups.otherExperience,
  },
  bachelor: {
    node: () => (
      <span>
        <b>Bachelor of Electrical Engineering</b>, Automation and Electronics,
        Faculty of Electrical Engineering, University of Sarajevo
        <br />
        <pre>- GPA 9.19/10.00</pre>
      </span>
    ),
    startDate: "2017",
    endDate: "2020",
    group: groups.education,
    skills: [skills.plc, skills.soMachine, skills.cpp],
  },
  rotatingLedDisplay: {
    node: () => (
      <span>
        <a
          href="https://github.com/veracioux/rotating-led-display"
          target="_blank"
        >
          <b>Rotating LED Display</b>
        </a>
        , High School Project Festival, Hadžići, Bosnia and Herzegovina
        <br />
      </span>
    ),
    startDate: "2017",
    displayDate: "Spring 2017",
    skills: [skills.cpp],
    labels: ["Lead Engineer", "Lead Designer", "Lead Programmer"],
    group: groups.otherExperience,
  },
  woodFall: {
    node: () => (
      <span>
        <a href="https://github.com/veracioux/wood-fall" target="_blank">
          <b>Wood Fall</b>
        </a>
        , video game, solo project
      </span>
    ),
    startDate: "2016",
    endDate: "2017",
    // skills: ["C#", "Unity"],
    labels: ["Programmer", "Artist", "Sound Designer", "Publisher"],
    group: groups.otherExperience,
  },
  renovation: {
    node: () => (
      <span>
        <b>Renovation of sports grounds</b>, Kamberovića polje Zenica
      </span>
    ),
    startDate: "2016-03",
    endDate: "2016-11",
    displayDate: "Mar - Nov 2016",
    labels: ["Participant", "Youth Leadership Program 2016"],
    group: groups.extraCurricular,
  },
  demosPMS: {
    node: () => (
      <span>
        <b>Undergraduate Teaching Assistant</b>, Faculty of Electrical
        Engineering, University of Sarajevo, Course:{" "}
        <i>Design of Microprocessor Systems</i>
      </span>
    ),
    startDate: "2021-03",
    endDate: "2021-06",
    displayDate: "Mar - Jun 2021",
    skills: [skills.plc, skills.soMachine, skills.teaching],
    labels: ["PLC programming", "SoMachine"],
    group: groups.professionalExperience,
  },
  elektromatik: {
    node: () => <span>Internship, Elektromatik d.o.o. Zenica</span>,
    startDate: "2019",
    endDate: "2020",
    displayDate: "Summer 2019, Summer 2020",
    skills: [skills.plc, skills.tiaPortal, skills.abbVFD],
    labels: [
      "PLC programming",
      "Industrial sensors",
      "Motor control",
      "Industrial schematic design",
    ],
    group: groups.professionalExperience,
  },
  demosTP: {
    node: () => (
      <span>
        <b>Undergraduate Teaching Assistant</b>, Faculty of Electrical
        Engineering, University of Sarajevo, Course:{" "}
        <i>Programming Techniques</i>
      </span>
    ),
    startDate: "2019-03",
    endDate: "2019-06",
    displayDate: "Mar - Jun 2019",
    skills: [skills.cpp, skills.teaching],
    labels: ["C++"],
    group: groups.professionalExperience,
  },
  stackExchange: {
    node: () => (
      <span>
        <b>Answering community questions</b>,{" "}
        <a href="https://math.stackexchange.com/users/450231" target="_blank">
          Mathematics StackExchange
        </a>
      </span>
    ),
    startDate: "2018",
    endDate: "present",
    skills: [skills.teaching],
    group: groups.extraCurricular,
  },
  githubProjects: {
    node: () => (
      <span>
        <b>
          Various personal projects on{" "}
          <a href="https://github.com/veracioux" target="_blank">
            GitHub
          </a>
        </b>
      </span>
    ),
    startDate: "2018",
    endDate: "present",
    skills: [
      skills.jetbrains,
      skills.git,
      skills.nginx,
      skills.c,
      skills.cpp,
      skills.docker,
      skills.typescript,
      skills.javascript,
      skills.django,
      skills.qt,
      skills.bash,
      skills.technicalWriting,
      skills.emacs,
    ],
    group: groups.otherExperience,
  },
};

export const entries = Object.fromEntries(
  Object.entries(_entries).map(([key, entry]) => [key, { ...entry, key }])
) as Record<keyof typeof _entries, Entry>;

Object.entries(skills).forEach(([key, skill]) => (skill.key = key));
Object.entries(skillGroups).forEach(
  ([key, skillGroup]) => (skillGroup.key = key)
);
Object.entries(entries).forEach(([key, entry]) => (entry.key = key));
Object.entries(groups).forEach(([key, group]) => {
  group.key = key;
  group.entries = Object.values(entries).filter(
    (entry) => entry.group === group
  );
});

export type DisplayMode = "timeline" | "byCategory";
