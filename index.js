#! /usr/bin/env node
import fs from "fs";
import minimist from "minimist";
import {
  deleteDir,
  emptyDir,
  formatTargetDir,
  getRoot,
  getTemporaryPath,
  mkDir,
  deleteObjectEmptyKey
} from "./lib/util.js";
import {
  overwriteMap,
  packageManagerList,
} from "./lib/constant.js";
import {
  FRAMEWORKS,
  TEMPLATES
} from './lib/templates.js'
import {
  isValidPackageName,
  isEmpty,
  toValidPackageName,
} from "./lib/check.js";
import { cloneCode } from "./lib/clone.js";
import prompts from "prompts";
import { red, reset } from "kolorist";
import { addPackageJson, copyTempToTarget, transferFiles } from "./lib/file.js";
import { endTip, startTip } from "./lib/tip.js";

const argv = minimist(process.argv.slice(2), { string: ["_"] });

const defaultTargetDir = "new-project";

async function init() {
  let result = {
    projectName: formatTargetDir(argv._[0]),
    template: argv.template || argv.t,
    packageManager: argv.package || argv.p,
    version: argv.version || argv.v,
    help: argv.help || argv.h
  };
 const isEnd= startTip(result)
 if(isEnd){
  return 
 }
  try {
    const promptResult = await prompts(
      [
        {
          type: result.projectName ? null : "text",
          name: "projectName",
          message: reset("Project name:"),
          initial: defaultTargetDir,
          onState: (state) => {
            result.projectName =
              formatTargetDir(state.value) || defaultTargetDir;
          },
        },
        {
          type: () => {
            return !fs.existsSync(result.projectName) ||
              isEmpty(result.projectName)
              ? null
              : "select";
          },
          name: "overwrite",
          message: () =>
            (result.projectName === "."
              ? "Current directory"
              : `Target directory "${result.projectName}"`) +
            ` is not empty. Please choose how to proceed:`,
          initial: 0,
          choices: [
            {
              title: "Remove existing files and continue",
              value: overwriteMap.remove,
            },
            {
              title: "Cancel operation",
              value: overwriteMap.cancel,
            },
            {
              title: "Ignore files and continue",
              value: overwriteMap.ignore,
            },
          ],
        },
        {
          type: (_, { overwrite }) => {
            if (overwrite === "no") {
              throw new Error(red("✖") + " Operation cancelled");
            }
            return null;
          },
          name: "overwriteChecker",
        },
        {
          type: () => (isValidPackageName(result.projectName) ? null : "text"),
          name: "packageName",
          message: reset("Package name:"),
          initial: () => toValidPackageName(result.projectName),
          validate: (dir) =>
            isValidPackageName(dir) || "Invalid package.json name",
        },
        {
          type: () => {
            return result.template && TEMPLATES.includes(result.template)
              ? null
              : "select";
          },
          name: "framework",
          message:
            typeof result.template === "string" &&
            !TEMPLATES.includes(result.template)
              ? reset(
                  `"${result.template}" isn't a valid template. Please choose from below: `
                )
              : reset("Select a framework:"),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color;
            return {
              title: frameworkColor(framework.type),
              value: framework,
            };
          }),
        },
        {
          type: (framework) =>
            framework && framework.templates ? "select" : null,
          name: "template",
          message: reset("Select a template:"),
          choices: (framework) =>
            framework.templates.map((template) => {
              const variantColor = template.color;
              return {
                title: variantColor(`${template.branch}${template.desc&&` (${template.desc})`}`),
                value: template.name,
              };
            }),
        },
        {
          type: () => {
            return packageManagerList.find(
              (item) => item.name === result.packageManager
            ) && result.packageManager
              ? null
              : "select";
          },
          name: "packageManager",
          message: reset("Select a package manager:"),
          choices: () =>
            packageManagerList.map((packageManager) => {
              const variantColor = packageManager.color;
              return {
                title: variantColor(packageManager.display),
                value: packageManager.name,
              };
            }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        },
      }
    );
    result = {
      ...result,
      ...deleteObjectEmptyKey(promptResult)
    };
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }
  const { projectName, overwrite, packageName, template, packageManager } =
    result;

  const tempDir = getTemporaryPath(projectName);  
  const targetRot = getRoot(projectName); 
  const tempRoot = getRoot(tempDir);
  if (overwrite === overwriteMap.remove) {
    emptyDir(targetRot);
  } else {
    mkDir(targetRot);
  }
  await cloneCode(tempDir, template);
  transferFiles(tempRoot, true);
  copyTempToTarget(tempRoot, targetRot);
  transferFiles(targetRot, false);
  addPackageJson(tempRoot, targetRot, {
    packageName: packageName || projectName,
    packageManager
  });
  setTimeout(() => {
    deleteDir(tempRoot);
  }, 3000);

  endTip({
    projectName,
    targetRot,
  })
}

init().catch((e) => {
  console.error(e);
});
