import fs from "fs";
import path from "path";
import minimist from "minimist";
import {
  deleteDir,
  emptyDir,
  formatTargetDir,
  getRoot,
  getTemporaryPath,
  mkDir,
} from "./lib/util.js";
import { FRAMEWORKS, TEMPLATES, overwriteMap } from "./lib/constant.js";
import { isValidPackageName, isEmpty } from "./lib/check.js";
import { cloneCode } from "./lib/clone.js";
import prompts from "prompts";
import { red, reset } from "kolorist";
import { addPackageJson, copyTempToTarget, transferFiles } from "./lib/file.js";

const argv = minimist(process.argv.slice(2), { string: ["_"] });

const defaultTargetDir = "new-project";

async function init() {
  let result = {
    projectName: formatTargetDir(argv._[0]),
    variant: argv.template || argv.t,
  };
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
            return !fs.existsSync(result.projectName) || isEmpty(result.projectName)
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
            return result.argTemplate && TEMPLATES.includes(result.argTemplate)
              ? null
              : "select";
          },
          name: "framework",
          message:
            typeof result.argTemplate === "string" &&
            !TEMPLATES.includes(result.argTemplate)
              ? reset(
                  `"${result.argTemplate}" isn't a valid template. Please choose from below: `
                )
              : reset("Select a framework:"),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color;
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework,
            };
          }),
        },
        {
          type: (framework) =>
            framework && framework.variants ? "select" : null,
          name: "variant",
          message: reset("Select a variant:"),
          choices: (framework) =>
            framework.variants.map((variant) => {
              const variantColor = variant.color;
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name,
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
      ...promptResult,
      ...result,
    };
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }
  const { projectName,overwrite, packageName, variant } = result;
  const tempDir = getTemporaryPath(projectName);
  const targetRot = getRoot(projectName);
  const tempRoot = getRoot(tempDir);
  if (overwrite === overwriteMap.remove) {
    emptyDir(targetRot);
  } else {
    mkDir(targetRot);
  }
  await cloneCode(tempDir, variant);
  transferFiles(tempRoot, true);
  copyTempToTarget(tempRoot, targetRot);
  transferFiles(targetRot, false);
  addPackageJson(tempRoot, targetRot, {
    packageName: packageName || projectName,
  });
  setTimeout(() => {
    deleteDir(tempRoot);
  }, 3000);
}

init().catch((e) => {
  console.error(e);
});
