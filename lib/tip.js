import { green } from "kolorist";
import figlet from "figlet";
import clear from "clear";
import { createRequire } from "module";

export const startTip = (result) => {
  let isEnd = false;
  if (result.version) {
    const packageJson = createRequire(import.meta.url)("../package.json");
    console.log("    version:", packageJson.version);
    isEnd = true;
  }
  if (result.help) {
    console.log(`
    command: npc-create-app 
    options:
            创建项目  npm-create-app [name]
            查看版本  --version | -v
            查看帮助  --help | -h    
            选择模板  --template | --t  [react-vite]
            选择包管理工具 --package | --p [npm | yarn | pnpm]
    `);
    isEnd = true;
  }
  if (!isEnd) {
    clear();
  }
  return isEnd;
};

export const endTip = ({ projectName, targetRot }) => {
  clear();
  figlet("Hello  Npc   !!!", function (err, data) {
    if (err) {
      return;
    }
    console.log(data);
    const cwd = process.cwd();
    console.log(green(`\nDone. Now run:\n`));
    if (targetRot !== cwd) {
      console.log(`cd ${projectName}`);
    }
    console.log(`npm run instal\nnpm run start\n`);
  });
};
