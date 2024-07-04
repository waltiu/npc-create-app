import {
  red,
  yellow,
  magenta,
} from "kolorist";

export const codingUrl = "https://github.com/waltiu/code-templates.git";



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


export const overwriteMap={
  "remove":"删除",
  "cancel":"取消", 
  "ignore":"忽略"
}