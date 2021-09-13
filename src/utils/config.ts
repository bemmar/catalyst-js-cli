import { cosmiconfig } from 'cosmiconfig';
import { CatalystConfig } from '../types';
import { Word } from './constants';

export const defaultConfig: CatalystConfig = {
    classNameCasing: "pascal",
    fileNameCasing: "kebab",
    propertyCasing: "camel",
    modelTemplateFileName: "__model_file_name__.ts",
    modelPathParts: ["src", "models", "entities"],
    servicePathParts: ["src", "services"]
};

export default async function config(): Promise<Required<CatalystConfig>> {
    const explorer = cosmiconfig("ignored...", {
        searchPlaces: [
            `catalyst/${Word.configFileName}`
        ]
    });

    // Search for a configuration by walking up directories.
    // See documentation for search, below.
    return explorer.search()
        .then((result) => {
            // result.config is the parsed configuration object.
            // result.filepath is the path to the config file that was found.
            // result.isEmpty is true if there was nothing to parse in the config file.

            console.log("found config...", result);

            if (result?.config == null || result.isEmpty) {
                return defaultConfig;
            }

            return {
                ...defaultConfig,
                ...result.config
            };
        })
        .catch((error) => {
            // Do something constructive.
            console.log("config error...", error);

            throw error;
        });
}