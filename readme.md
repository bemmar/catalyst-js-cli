# Catalyst CLI
A cli for catalyst entity generation.

## Quick Start

```bash
# install the package as a dev dependency
npm install --save-dev @emmar/catalyst-cli
```

Add npm script to package.json file
```json
...
scripts: {
    "catalyst": "catalyst"
}
...
```

```bash
# execute the init command
# this will create a catalyst folder at the root of your project
# the folder will contain a config file and boilerplate for entity additions
npm run catalyst init

# to add an entity - execute the add command
npm run catalyst add {{entityName}}
```

# Configuration

| Key                   | Description                                          |
| --------------------- | ---------------------------------------------------- |
| modelTemplateFileName | Template file name of the Model Class                |
| modelPathParts        | File path to model folder.                           |
| servicePathParts      | File path to service folder                          |
| fileNameCasing        | String [casing](#casing) to use for file names       |
| classNameCasing       | String [casing](#casing) to use for class names      |
| propertyCasing        | String [casing](#casing) to use for class properties |

## Casing

| Name   | Example           |
| ------ | ----------------- |
| snake  | string_snake_case |
| kebab  | string-kebab-case |
| camel  | stringCamelCase   |
| pascal | StringPascalCase  |
| upper  | STRINGUPPERCASE   |
| lower  | stringlowercase   |