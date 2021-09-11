import { GluegunCommand, GluegunStrings } from 'gluegun'
import { StringCasing } from '../types'
import config from '../utils/config'
import { parse as pathParse } from "path";

function stringCasingFunction(casing: StringCasing, strings: GluegunStrings) {
    switch (casing) {
        case "camel":
            return strings.camelCase;
        case "kebab":
            return strings.kebabCase;
        case "snake":
            return strings.snakeCase;
        case "pascal":
            return strings.pascalCase;
        case "upper":
            return strings.upperCase;
        case "lower":
            return strings.lowerCase;
    }
}

const command: GluegunCommand = {
    name: 'add',
    run: async toolbox => {
        const { print, filesystem, meta, parameters, strings } = toolbox
        const { path, writeAsync, readAsync, cwd, listAsync, isNotFile } = filesystem;

        const catConfig = await config();

        console.log(catConfig);
        const classNameCaseFn = stringCasingFunction(catConfig.classNameCasing, strings);
        const propertyNameCaseFn = stringCasingFunction(catConfig.propertyCasing, strings);
        const fileNameCaseFn = stringCasingFunction(catConfig.fileNameCasing, strings);

        print.info('This is add!');

        print.info(parameters.first);
        print.info(parameters.options);

        const entityName = strings.camelCase(parameters.first);

        const catalystPath = path(`${meta.src}`, "..");
        const boilerplatePath = path(catalystPath, "boilerplate");
        const writeTo = cwd();
        const modelPath = path(boilerplatePath, "model");
        var modelFileNames = await listAsync(modelPath);
        const fileWriteBasePath = path(writeTo, "_models", "entities", entityName);
        let modelFileName = "";

        for (const fileName of modelFileNames) {
            const filePath = path(boilerplatePath, "model", fileName);

            if (isNotFile(filePath)) {
                continue;
            }

            const parsedFileName = pathParse(fileName);

            let replacedFileName = `${fileNameCaseFn(parsedFileName.name.replace(/__file_name__/g, entityName))}${parsedFileName.ext}`;

            if (fileName === "__model_file_name__.ts") {
                replacedFileName = `${fileNameCaseFn(`${parsedFileName.name.replace(/__model_file_name__/g, entityName)}Model`)}${parsedFileName.ext}`;
                modelFileName = fileNameCaseFn(`${parsedFileName.name.replace(/__model_file_name__/g, entityName)}Model`);
            }

            const fileWritePath = path(fileWriteBasePath, replacedFileName);
            let fileContents = await readAsync(filePath);

            /**
             * TODO
             * find the replacers
             * merge the text
             * apply casing to entire text
             * replace original text
             */

            fileContents
                .match(new RegExp(/\b(\w*__property_name__\w*)\b/, "g"))
                ?.forEach((match) => {
                    const replacedMatch = match.replace(new RegExp(/__property_name__/, "g"), entityName);

                    fileContents = fileContents.replace(match, propertyNameCaseFn(replacedMatch));
                });

            fileContents
                .match(new RegExp(/__model_name__/, "g"))
                ?.forEach((match) => {
                    fileContents = fileContents.replace(match, classNameCaseFn(`${entityName}Model`));
                });

            fileContents
                .match(new RegExp(/__id_name__/, "g"))
                ?.forEach((match) => {
                    fileContents = fileContents.replace(match, propertyNameCaseFn(`${entityName}Id`));
                });

            fileContents
                .match(new RegExp(/\b(\w*__class_name__\w*)\b/, "g"))
                ?.forEach((match) => {
                    const replacedMatch = match.replace(new RegExp(/__class_name__/, "g"), entityName);

                    fileContents = fileContents.replace(match, classNameCaseFn(replacedMatch));
                });

            fileContents
                .match(new RegExp(/__list_name__/, "g"))
                ?.forEach((match) => {
                    fileContents = fileContents.replace(match, strings.plural(propertyNameCaseFn(entityName)));
                });

            fileContents
                .match(new RegExp(/__file_name__/, "g"))
                ?.forEach((match) => {
                    fileContents = fileContents.replace(match, strings.plural(propertyNameCaseFn(entityName)));
                });

            await writeAsync(fileWritePath, fileContents);
        }

        const writtenFileNames = await listAsync(fileWriteBasePath);

        for (const fileName of writtenFileNames) {
            const filePath = path(fileWriteBasePath, fileName);

            if (isNotFile(filePath)) {
                continue;
            }

            let fileContents = await readAsync(filePath);

            fileContents
                .match(new RegExp(/__model_file_name__/, "g"))
                ?.forEach((match) => {
                    fileContents = fileContents.replace(match, modelFileName);
                });

            await writeAsync(filePath, fileContents);
        }
    },
}

module.exports = command
