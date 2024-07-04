import {
    red,
    yellow,
    magenta,
    blue,
    cyan,
    green,
  } from "kolorist";
export const FRAMEWORKS = [
  {
    type: "react",
    color: cyan,
    templates: [
      {
        branch: "react-vite",
        desc: "react18 + antd + zustand",
        color: blue,
      },
      {
        branch: "react-vite-ts",
        desc: "react18 + antd + ts + zustand",
        color: magenta,
      },
    ],
  },
  {
    type: "vue",
    color: green,
    templates: [
      {
        branch: "vue-vite",
        desc: "vue3 + elementPlus + pinia",
        color: blue,
      },
      {
        branch: "vue-vite-ts",
        desc: "vue3 + elementPlus + ts + pinia",
        color: magenta,
      },
    ],
  },
  {
    type: "other",
    color: yellow,
    templates: [
      {
        branch: "tsup-lib",
        desc: "ts快速搭建工具库",
        color: blue,
      },
      {
        branch: "docs",
        desc: "vitepress快速搭建项目文档",
        color: magenta,
      },
      {
        branch: "monorepo-pnpm",
        desc: "pnpm workspaces",
        color: green,
      }
    ],
  },
];

export const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.templates && f.templates.map((v) => v.branch)) || [f.branch]
).reduce((a, b) => a.concat(b), []);
