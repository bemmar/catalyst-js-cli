import { cosmiconfig } from 'cosmiconfig';
import { CatalystConfig, TemplateElement } from '../types';

const defaultConfig: CatalystConfig = {
    classNameCasing: "pascal",
    fileNameCasing: "kebab",
    propertyCasing: "camel",
    modelNameTemplate: `${TemplateElement.EntityName}.model`,
    serviceNameTemplate: `${TemplateElement.EntityName}.service`,
    modelPathParts: ["src", "models", "entities"],
    servicePathParts: ["src", "services"]
};

export default async function config(): Promise<Required<CatalystConfig>> {
    const explorer = cosmiconfig("ignored...", {
        searchPlaces: [
            "catalyst/catalyst-cli.config.json"
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