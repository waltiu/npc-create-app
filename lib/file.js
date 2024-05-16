import fs from "fs";
import path from "node:path";
import { copy } from "./util.js";
import { packageManagerList } from "./constant.js";

export const transferFiles = (dirPath, isTemplate) => {
  const files = fs.readdirSync(dirPath);
  for (const file of files.filter((f) => f !== ".git")) {
    if (isTemplate) {
      fs.renameSync(
        path.join(dirPath, file),
        path.join(
          dirPath,
          file.startsWith(".") ? file.replace(".", "_-_") : file
        )
      );
    } else {
      fs.renameSync(
        path.join(dirPath, file),
        path.join(
          dirPath,
          file.startsWith("_-_") ? file.replace("_-_", ".") : file
        )
      );
    }
  }
};

export const copyTempToTarget = (templateDirPath, targetDirPath) => {
  const files = fs.readdirSync(templateDirPath);
  for (const file of files.filter(
    (f) => f !== "package.json" && f !== ".git"
  )) {
    copy(path.join(templateDirPath, file), path.join(targetDirPath, file));
  }
};

export const addPackageJson = (
  templateDirPath,
  targetDirPath,
  { packageName, packageManager }
) => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDirPath, `package.json`), "utf-8")
  );
  pkg.name = packageName;
  pkg.scripts.instal =
    packageManagerList.find((item) => item.name === packageManager).script ||
    packageManagerList[0].script;
  write(targetDirPath, "package.json", JSON.stringify(pkg, null, 2) + "\n");
};

export const write = (root, file, content) => {
  const targetPath = path.join(root, file);
  fs.writeFileSync(targetPath, content);
};
