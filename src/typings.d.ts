/*
By default, Typescript doesn't know existence of files other than .ts or .tsx (https://stackoverflow.com/questions/40382842/cant-import-css-scss-modules-typescript-says-cannot-find-module), so this d.ts file (declaration/definition) allow for handling Javascript libraries/modules without existing Typescript support.

When a Typescript compiler encounters this file, it uses this to understand the types defined in corresponding Javascript code.
*/
declare module "*.module.css";
