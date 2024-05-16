import { green } from "kolorist";
import figlet from "figlet";
import clear from "clear";
export const startTip = () => {
  clear();
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
