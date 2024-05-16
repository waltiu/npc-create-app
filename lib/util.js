import fs from "fs";
import path from "path";

const cwd = process.cwd();

export const formatTargetDir = (targetDir) => {
  return targetDir?.trim().replace(/\/+$/g, "");
};

export const emptyDir = (dir) => {
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
};

export const deleteDir = (dir) => {
  console.log(dir,'dir--')
  fs.rmSync(dir, { recursive: true, force: true });
};

export const mkDir = (dir) => {
  if (fs.existsSync(dir)) {
    return;
  }
  fs.mkdirSync(dir, { recursive: true });
};

export const getTemporaryPath = (path) => {
  return `${path}_${Date.now().toString()}`;
};

export const getRoot = (targetDir) => {
  return path.join(cwd, targetDir);
};

export const copy = (src, dest) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
};

export const copyDir = (srcDir, destDir) => {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
};


export const deleteObjectEmptyKey=(obj)=>{
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}