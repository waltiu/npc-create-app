# npc-create-app <a href="https://npmjs.com/package/npc-create-app"><img src="https://img.shields.io/npm/v/npc-create-app" alt="npm package"></a>

## install  npc-create-app

With NPM:

```bash
$ npm install -g  npc-create-app
```

With Yarn:

```bash
$ yarn global add  npc-create-app
```

With PNPM:

```bash
$ pnpm install -g npc-create-app
```

## create app

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + React + ts project, run:

```Then
  npc-create-app new-project -t react-vite
```

Currently supported template presets include:

- `react`
  - `react-vite`
  - `react-vite-ts`
- `vue`
  - `vue-vite`
  - `vue-vite-ts`

You can use `.` for the project name to scaffold in the current directory.

more templates： https://github.com/waltiu/code-templates

## version

```
npc-create-app -v
```

## help

```
npc-create-app -h
```

```
    command: npc-create-app
    options:
            创建项目  npm-create-app [name]
            查看版本  --version | -v
            查看帮助  --help | -h
            选择模板  --template | --t  [react-vite]
            选择包管理工具 --package | --p [npm | yarn | pnpm]
```
