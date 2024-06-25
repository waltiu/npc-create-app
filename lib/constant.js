import {
  red,
  yellow,
  magenta,
  blue,
  cyan,
  green,
} from "kolorist";

export const codingUrl = "https://github.com/waltiu/code-templates.git";

export const FRAMEWORKS = [
  {
    name: "react",
    display: "React",
    color: cyan,
    templates: [
      {
        name: "react-vite",
        display: "vite",
        color: blue,
      },
      {
        name: "react-vite-ts",
        display: "vite-ts",
        color: magenta
      },
    ],
  },
  {
    name: "vue",
    display: "Vue",
    color: green,
    templates: [
      {
        name: "vue-vite",
        display: "vite",
        color: blue,
      },
      {
        name: "vue-vite-ts",
        display: "vite-ts",
        color: magenta
      },
    ],
  },
];

export const packageManagerList = [
  {
    name: "npm",
    display: "npm",
    color: red,
    script:"npm install"
  },
  {
    name: "yarn",
    display: "yarn",
    color: yellow,
    script:"yarn"
  },
  {
    name: "pnpm",
    display: "pnpm",
    color: magenta,
    script:"pnpm install"
  },
];

export const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.templates && f.templates.map((v) => v.name)) || [f.name]
).reduce((a, b) => a.concat(b), []);


export const overwriteMap={
  "remove":"删除",
  "cancel":"取消", 
  "ignore":"忽略"
}