import {
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
    ],
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