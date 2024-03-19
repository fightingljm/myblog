## ReferenceError: primordials is not defined in Node.js

**The error "ReferenceError: primordials is not defined" occurs when you use Gulp.js version 3 with Node.js version 12 or greater.**

You can solve the error by:

1. Pinning the version of the dependency that causes the issue (`graceful-fs`).
2. Upgrading Gulp.js to version 4.
3. Downgrading your Node.js version to 11.x.

Here is the complete stack trace.

```bash
ReferenceError: primordials is not defined
    at fs.js:35:5
    at req_ (C:\Users\borislav\Desktop\project\node_modules\natives\index.js:143:24)
    at Object.req [as require] (C:\Users\borislav\Desktop\project\node_modules\natives\index.js:55:10)
    at Object.<anonymous> (C:\Users\borislav\Desktop\project\node_modules\graceful-fs\fs.js:1:37)
    at Module._compile (internal/modules/cjs/loader.js:1138:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)
    at Module.load (internal/modules/cjs/loader.js:986:32)
    at Function.Module._load (internal/modules/cjs/loader.js:879:14)
    at Module.require (internal/modules/cjs/loader.js:1026:19)
    at require (internal/modules/cjs/helpers.js:72:18)
```


You can use the `node -v` command to check your version of Node.js.

```bash
node -v
```

You can check your version of the Gulp.js package by issuing the following command.

Gulp.js version 3 doesn't support Node.js version 12 and greater.

This is because `gulp` has `graceful-fs@3.0.0` as a dependency and that version of `graceful-fs` doesn't support Node.js version 12 and greater.

## Pinning your version of `graceful-fs` to `4.2.11`

If you want to be able to use gulp version 3 with a Node.js version that is greater than 12, you can pin your version of the `graceful-fs` package to `4.2.11`.

1. Issue the `node -v` command to get your version of Node.js.

```bash
node -v
```

1. Pin your version of the `graceful-fs` package to `4.2.11`.

##  When using NPM with Node.js >= 16.14.0

If your version of Node.js is greater than or equal to `16.14.0`, set the [overrides](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides) property in your `package.json` file.

package.json

```json
{
  "overrides": {
    "graceful-fs": "^4.2.11"
  }
}
```

Rerun the `npm install` command after setting the property.

```bash
npm install
```

## When using NPM with Node.js < 16.14.0

If your Node.js version is less than `16.14.0`, you have to use the [npm-force-resolutions](https://www.npmjs.com/package/npm-force-resolutions) package.

package.json

```json
{
  "resolutions": {
    "graceful-fs": "^4.2.11"
  },
  "scripts": {
    "preinstall": "npx npm-force-resolutions"
  }
}
```

Rerun the `npm install` command after setting the properties.

```bash
npm install
```

Version `4.2.11` of the `graceful-fs` package supports more recent versions of Node.js.

##  When using YARN

If you use the `yarn` package manager, use the `resolutions` property in your `package.json` file to pin the version of the `graceful-fs` module.

package.json

```json
{
  "resolutions": {
    "graceful-fs": "^4.2.11"
  }
}
```

Rerun the `yarn install` command after setting the property.

```bash
yarn install
```

## When using `pnpm`

If you use the `pnpm` package manager, set the `pnpm.overrides` property in your `package.json` file.

package.json

```json
{
  "pnpm": {
    "overrides": {
      "graceful-fs": "^4.2.11"
    }
  }
}
```

Rerun the `pnpm install` command after setting the property.

```bash
pnpm install
```

## Upgrading Gulp to version 4

An alternative way to solve the error is to upgrade your version of [gulp](https://www.npmjs.com/package/gulp) to version 4 or the latest version.

```bash
# with NPM
npm install gulp@latest
```

If you use YARN, issue the following command instead.

```bash
# with YARN
yarn upgrade gulp@latest
```

You can read about what's new in Gulp version 4 in [this section](https://www.npmjs.com/package/gulp#whats-new-in-40) of the package's NPM page.

If you need to familiarize yourself with the new API, follow the [Quick Start guide](https://www.npmjs.com/package/gulp#installation).

Version 4 of gulp doesn't depend on version `3.0.0` of the `graceful-fs` module, so it can be used with Node.js version 12 and greater.

If the error persists, try to delete your `node_modules` and reinstall your dependencies.

```bash
# 👇️  (Windows) delete node_modules and package-lock.json
rd /s /q "node_modules"
del package-lock.json
del -f yarn.lock

# 👇️  (macOS/Linux) delete node_modules and package-lock.json
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# 👇️ clean npm cache
npm cache clean --force

npm install
```

Try to issue the `gulp` command after adapting your project to Gulp version 4.

## Downgrading Node.js to version 11.X

Another way to solve the error is to downgrade your version of Node.js to version 11.

Node.js version 11 can still be used with gulp version 3 without any issues.

However, it should be noted that version 11 is very out of date, so downgrading is not recommended.

There are 4 main packages you can use to downgrade your Node.js version.

- [nvm for windows](https://github.com/coreybutler/nvm-windows)
- [nvm for macOS and Linux](https://github.com/nvm-sh/nvm)
- [n](https://www.npmjs.com/package/n)
- [volta](https://github.com/volta-cli/volta)

Click on one of the links to view the installation instructions.

## With NVM for macOS and Linux

For example, if you install [nvm for macOS and Linux](https://github.com/nvm-sh/nvm) or [nvm for Windows](https://github.com/coreybutler/nvm-windows), you can use the following commands to downgrade your Node.js version.

```bash
nvm install 11

nvm use 11
```

**Want to learn more about installing and using NVM?** Check out these resources: [Install NVM on macOS and Linux,](https://bobbyhadz.com/blog/nvm-command-not-found)[Install NVM on Windows](https://bobbyhadz.com/blog/nvm-is-not-recognized-as-internal-or-external-command).

## With the `n` package

You can also use the [n](https://www.npmjs.com/package/n) package to downgrade your Node.js version.

```bash
npm install -g n

sudo n 11.15.0
```

## With the `volta` package

If you install the [volta](https://github.com/volta-cli/volta) package, use the following command to downgrade your Node.js version.

```bash
volta install node@11.15.0
```

However, note that downgrading to version 11 is not generally recommended.

Instead, it is much better to pin the version of `graceful-fs` or upgrade gulp to version 4.



[参考文章](https://bobbyhadz.com/blog/referenceerror-primordials-is-not-defined#referenceerror-primordials-is-not-defined-in-nodejs)