import opencodeVideo from "@/assets/opencode.mp4";

export interface Project {
  id: number;
  slug: string;
  title: string;
  show_title: boolean;
  desc: string;
  url: string;
  repo_url: string;
  image_url?: string;
  extra_image_url?: string;
  video_url?: string;
  start_date?: Date;
  organization?: string;
  organization_url?: string;
  my_contributions_url?: string;
  roles: string[];
  languages: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "flameshot",
    title: "Flameshot",
    show_title: true,
    desc: "Powerful yet simple to use screenshot software.",
    url: "https://github.com/flameshot-org/flameshot",
    repo_url: "https://github.com/flameshot-org/flameshot",
    image_url:
      "https://github.com/flameshot-org/flameshot/raw/master/data/img/app/org.flameshot.Flameshot.svg",
    extra_image_url:
      "https://raw.githubusercontent.com/flameshot-org/flameshot/master/data/img/preview/animatedUsage.gif",
    organization: "Flameshot org",
    organization_url: "https://github.com/flameshot-org",
    my_contributions_url:
      "https://github.com/search?q=repo%3Aflameshot-org%2Fflameshot+author%3Averacioux&type=pullrequests",
    roles: ["Developer", "Co-maintainer"],
    languages: ["C++", "Qt"],
  },
  {
    id: 2,
    slug: "opencode",
    title: "opencode",
    show_title: false,
    desc: " The AI coding agent built for the terminal.",
    url: "https://opencode.ai",
    repo_url: "https://github.com/sst/opencode",
    image_url:
      "data:image/svg+xml,%3csvg%20width='641'%20height='115'%20viewBox='0%200%20641%20115'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1401_86292)'%3e%3cmask%20id='mask0_1401_86292'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='641'%20height='115'%3e%3cpath%20d='M640.714%200H0V115H640.714V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_1401_86292)'%3e%3cpath%20d='M49.2868%2082.1433H16.4297V49.2861H49.2868V82.1433Z'%20fill='%234B4646'/%3e%3cpath%20d='M49.2857%2032.8573H16.4286V82.143H49.2857V32.8573ZM65.7143%2098.5716H0V16.4287H65.7143V98.5716Z'%20fill='%23B7B1B1'/%3e%3cpath%20d='M131.427%2082.1433H98.5703V49.2861H131.427V82.1433Z'%20fill='%234B4646'/%3e%3cpath%20d='M98.5692%2082.143H131.426V32.8573H98.5692V82.143ZM147.855%2098.5716H98.5692V115H82.1406V16.4287H147.855V98.5716Z'%20fill='%23B7B1B1'/%3e%3cpath%20d='M229.997%2065.7139V82.1424H180.711V65.7139H229.997Z'%20fill='%234B4646'/%3e%3cpath%20d='M230.003%2065.7144H180.718V82.143H230.003V98.5716H164.289V16.4287H230.003V65.7144ZM180.718%2049.2859H213.575V32.8573H180.718V49.2859Z'%20fill='%23B7B1B1'/%3e%3cpath%20d='M295.717%2098.5718H262.859V49.2861H295.717V98.5718Z'%20fill='%234B4646'/%3e%3cpath%20d='M295.715%2032.8573H262.858V98.5716H246.43V16.4287H295.715V32.8573ZM312.144%2098.5716H295.715V32.8573H312.144V98.5716Z'%20fill='%23B7B1B1'/%3e%3cpath%20d='M394.286%2082.1433H345V49.2861H394.286V82.1433Z'%20fill='%234B4646'/%3e%3cpath%20d='M394.285%2032.8573H344.999V82.143H394.285V98.5716H328.57V16.4287H394.285V32.8573Z'%20fill='%23F1ECEC'/%3e%3cpath%20d='M459.998%2082.1433H427.141V49.2861H459.998V82.1433Z'%20fill='%234B4646'/%3e%3cpath%20d='M459.997%2032.8573H427.14V82.143H459.997V32.8573ZM476.425%2098.5716H410.711V16.4287H476.425V98.5716Z'%20fill='%23F1ECEC'/%3e%3cpath%20d='M542.146%2082.1433H509.289V49.2861H542.146V82.1433Z'%20fill='%234B4646'/%3e%3cpath%20d='M542.145%2032.8571H509.288V82.1429H542.145V32.8571ZM558.574%2098.5714H492.859V16.4286H542.145V0H558.574V98.5714Z'%20fill='%23F1ECEC'/%3e%3cpath%20d='M640.715%2065.7139V82.1424H591.43V65.7139H640.715Z'%20fill='%234B4646'/%3e%3cpath%20d='M591.429%2032.8573V49.2859H624.286V32.8573H591.429ZM640.714%2065.7144H591.429V82.143H640.714V98.5716H575V16.4287H640.714V65.7144Z'%20fill='%23F1ECEC'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1401_86292'%3e%3crect%20width='640.714'%20height='115'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
    video_url: opencodeVideo,
    organization: "SST",
    organization_url: "https://",
    my_contributions_url:
      "https://github.com/search?q=repo%3Asst%2Fopencode+author%3Averacioux&type=pullrequests",
    roles: ["Contributor"],
    languages: ["TypeScript", "SolidJS"],
  },
  {
    id: 3,
    slug: "tuterm",
    title: "Tuterm",
    show_title: true,
    desc: "A better way to learn CLI programs.",
    url: "https://github.com/veracioux/tuterm",
    repo_url: "https://github.com/veracioux/tuterm",
    extra_image_url:
      "https://gist.github.com/veracioux/66336d488e8d87c7b3fb696c5dbd93d1/raw/4b8bc0b043faf166abc92e12fc0bfb5acea55345/tuterm-demo.svg",
    roles: ["Original creator", "Maintainer"],
    languages: ["Shell", "Python"],
  },
  {
    id: 4,
    slug: "shdocker",
    title: "Shdocker",
    show_title: true,
    desc: "Dockerfiles with shell superpowers",
    url: "https://github.com/veracioux/shdocker",
    repo_url: "https://github.com/veracioux/shdocker",
    roles: ["Original creator", "Maintainer"],
    languages: ["Shell"],
  },
];
