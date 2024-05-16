import ora from "ora";
import gitClone from "git-clone";
import { codingUrl } from "./constant.js";

export const cloneCode = async (projectName, branch) => {
  return new Promise((resolve, reject) => {
    const process = ora(`下载...${codingUrl}`);
    process.start();
    gitClone(
      codingUrl,
      projectName,
      {
        checkout: branch,
      },
      (error) => {
        if (error) {
          console.log(error, "error");
          reject(error)
        } else {
          process.succeed();
          resolve()
        }
      }
    );
  });
};
