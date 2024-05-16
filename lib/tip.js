import { green } from "kolorist";

export const startTip = () => {};

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
