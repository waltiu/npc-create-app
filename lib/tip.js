import { green } from "kolorist";
import figlet from 'figlet'
export const startTip = () => {
    console.log('\n')
    figlet("Welcome  Npc   !!!", function (err, data) {
        if (err) {
          return;
        }
        console.log(data);
        console.log('\n')
      });
};

export const endTip = ({ projectName, targetRot }) => {
  const cwd = process.cwd();
  console.log(green(`\nDone. Now run:\n`))
  if (targetRot !== cwd) {
    console.log(`cd ${projectName}`)
  }
  console.log(
    `npm run instal\nnpm run start\n`
  );
};
