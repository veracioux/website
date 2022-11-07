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

export interface Skill {
    name: string;
    icon?: string;
    disabled?: boolean;
    group?: SkillGroup;
}

export interface SkillGroup {
    name: string;
    disabled?: boolean;
}

const _skillGroups = {
    programmingLanguages: {
        name: "Programming Languages",
    },
    frameworksAndTechnologies: {
        name: "Frameworks & Technologies",
    },
    otherTools: {
        name: "Other Tools",
    },
    automation: {
        name: "Automation Industry"
    },
    others: {
        name: "Others",
    },
    stale: {
        name: "Stale",
        disabled: true,
    },
}
export const skillGroups = _skillGroups as Record<keyof typeof _skillGroups, SkillGroup>;

export const _skills: Record<string, Skill> = {
    javascript: {
        name: "JavaScript",
        icon: iconJS,
        group: skillGroups.programmingLanguages,
    },
    typescript: {
        name: "TypeScript",
        icon: iconTS,
        group: skillGroups.programmingLanguages,
    },
    c: {
        name: "C",
        icon: iconC,
        group: skillGroups.programmingLanguages,
    },
    cpp: {
        name: "C++",
        icon: iconCpp,
        group: skillGroups.programmingLanguages,
    },
    python: {
        name: "Python",
        icon: iconPython,
        group: skillGroups.programmingLanguages,
    },
    bash: {
        name: "Bash",
        icon: iconBash,
        group: skillGroups.programmingLanguages,
    },
    qt: {
        name: "Qt",
        icon: iconQt,
        group: skillGroups.frameworksAndTechnologies,
    },
    react: {
        name: "ReactJS",
        icon: iconReact,
        group: skillGroups.frameworksAndTechnologies,
    },
    vue: {
        name: "Vue.js",
        icon: iconVue,
        group: skillGroups.frameworksAndTechnologies,
    },
    django: {
        name: "Django",
        icon: iconQt,
        group: skillGroups.frameworksAndTechnologies,
    },
    ethereum: {
        name: "Ethereum",
        icon: iconEthereum,
        group: skillGroups.frameworksAndTechnologies,
    },
    solana: {
        name: "Solana",
        icon: iconSolana,
        group: skillGroups.frameworksAndTechnologies,
    },
    nginx: {
        name: "Nginx",
        icon: iconNginx,
        group: skillGroups.frameworksAndTechnologies,
    },
    docker: {
        name: "Docker",
        icon: iconDocker,
        group: skillGroups.otherTools,
    },
    git: {
        name: "Git",
        icon: iconGit,
        group: skillGroups.otherTools,
    },
    jetbrains: {
        name: "JetBrains",
        icon: iconJetBrains,
        group: skillGroups.otherTools,
    },
    linux: {
        name: "Linux",
        icon: iconLinux,
        group: skillGroups.otherTools,
    },
    emacs: {
        name: "Emacs",
        icon: iconEmacs,
        group: skillGroups.otherTools,
    },
    plc: {
        name: "PLC programming",
        group: skillGroups.automation,
    },
    tiaPortal: {
        name: "TIA Portal",
        group: skillGroups.automation,
        disabled: true,
    },
    soMachine: {
        name: "SoMachine",
        group: skillGroups.automation,
        disabled: true,
    },
    abbVFD: {
        name: "ABB VFDs (basic)",
        group: skillGroups.automation,
        disabled: true,
    },
    java: {
        name: "Java",
        icon: iconJava,
        group: skillGroups.stale,
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
};

export const skills = _skills as Record<keyof typeof _skills, Skill>;
