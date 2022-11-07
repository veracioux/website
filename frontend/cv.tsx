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

const _skills = {
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
        icon: iconDjango,
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
        disabled: true,
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

export interface Group {
    name: string;
    disabled?: boolean;
    entries?: Entry[];
}

export interface Entry {
    node: () => JSX.Element;
    startDate: string;
    endDate?: string;
    displayDate?: string;
    skills: Array<Skill | string>;
    labels?: string[];
    group?: Group;
}

const _groups = {
    education: {
        name: "Education",
    },
    professionalExperience: {
        name: "Professional Experience"
    },
    otherExperience: {
        name: "Other experience",
    },
    extraCurricular: {
        name: "Extra-curricular",
        disabled: true,
    }
}

export const groups = _groups as Record<keyof typeof _groups, Group>;

const _entries = {
    evoltSoftwareEngineer: {
        node: () => <span><b>Evolt</b>, Software Engineer</span>,
        startDate: "2022-01",
        displayDate: "Jan 2022 - present",
        skills: [skills.javascript, skills.typescript, skills.react, skills.git, skills.docker, skills.ethereum],
        labels: ["Backend", "Frontend", "Blockchain"],
        group: groups.professionalExperience,
    },
    evoltInternship: {
        node: () => <span><b>Evolt</b>, one month internship</span>,
        startDate: "2021-12",
        displayDate: "Dec 2021",
        skills: [skills.python, skills.django, skills.docker],
        labels: ["Backend"],
        group: groups.professionalExperience,
    },
    bachelor: {
        node: () => (
            <span>
                <b>Bachelor of Electrical Engineering</b>, Department of
                Automation and Electronics, Faculty of Electrical
                Engineering, University of Sarajevo
                <br />
                <pre>- GPA 9.19/10.00</pre>
            </span>
        ),
        startDate: "2017",
        endDate: "2020",
        group: groups.education,
    },
    flameshot: {
        node: () => (
            <span>
                <a href="https://flameshot.org" target="_blank">
                    <b>Flameshot</b>
                </a>,
                A Free & Open Source Screenshot Program <br />
            </span>
        ),
        startDate: "2021",
        endDate: "present",
        labels: ["Co-maintainer", "Developer", "Tester", "UI/UX Designer"],
        group: groups.otherExperience,
    },
    rotatingLedDisplay: {
        node: () => (
            <span>
                <a
                    href="https://github.com/veracioux/rotating-led-display"
                    target="_blank"
                >
                    <b>Rotating LED Display</b>
                </a>,
                High School Project Festival, Hadžići, Bosnia and Herzegovina
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
                <a
                    href="https://github.com/veracioux/wood-fall"
                    target="_blank"
                >
                    <b>Wood Fall</b>
                </a>,
                video game, solo project
            </span>
        ),
        startDate: "2016",
        endDate: "2017",
        // skills: ["C#", "Unity"],
        labels: ["Programmer", "Artist", "Sound Designer", "Publisher"],
        group: groups.otherExperience,
    },
    renovation: {
        node: () => <span><b>Renovation of sports grounds</b>, Kamberovića polje Zenica</span>,
        startDate: "2016-03",
        endDate: "2016-11",
        displayDate: "Mar - Nov 2016",
        labels: ["Participant", "Youth Leadership Program 2016"],
        group: groups.extraCurricular,
    },
    demosPMS: {
        node: () => (
            <span>
                <b>Undergraduate Teaching Assistant</b>,
                Faculty of Electrical Engineering,
                University of Sarajevo,
                Course: <i>Design of Microprocessor Systems</i>
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
        node: () => (
            <span>
                Internship, <a
                href="https://search.bisnode.ba/ba/367191/elektromatik-d-o-o-zenica/"
                target="_blank"
            >
                    Elektromatik d.o.o. Zenica
                </a>
            </span>
        ),
        startDate: "2019",
        endDate: "2020",
        displayDate: "Summer 2019, Summer 2020",
        skills: [skills.plc, skills.tiaPortal, skills.abbVFD],
        labels: ["PLC programming", "Industrial sensors", "Motor control", "Industrial schematic design"],
        group: groups.professionalExperience,
    },
    demosTP: {
        node: () => (
            <span>
                <b>Undergraduate Teaching Assistant</b>,
                Faculty of Electrical Engineering,
                University of Sarajevo,
                Course: <i>Programming Techniques</i>
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
                <b>Answering community questions</b>, <a
                href="https://math.stackexchange.com/users/450231"
                target="_blank"
            >
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
                    Various personal projects on <a
                    href="https://github.com/veracioux"
                    target="_blank"
                >
                        GitHub
                    </a>
                </b>
            </span>
        ),
        startDate: "2018",
        endDate: "present",
        group: groups.otherExperience,
    },
}

export const entries = _entries as Record<keyof typeof _entries, Entry>;
