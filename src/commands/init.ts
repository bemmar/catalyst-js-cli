import { GluegunCommand } from 'gluegun'
import { defaultConfig } from '../utils/config';


const command: GluegunCommand = {
    name: 'init',
    run: async toolbox => {
        const { print, filesystem, parameters, meta } = toolbox;
        const { isDirectory, path, cwd, copyAsync, writeAsync, removeAsync } = filesystem;

        print.info('This is init');

        const force = (parameters.options.f || parameters.options.force) ?? false;

        /**
         * TODO:
         * add init
         *      create catalyst folder
         *      create config.json with default config
         *      create boilerplate folder
         *      copy models to boilerplate/models (if force or not exists)
         * 
         * future:
         *      add params for config, model, service to selectively overwrite stuff
         */

        const customCatalystPath = path(cwd(), "catalyst");
        const catalystBoilerplatePath = path(`${meta.src}`, "..", "boilerplate");

        if (isDirectory(customCatalystPath) && !force) {
            print.info("catalyst directory already exists. Doing nothing..");
            print.info("if you wish to overwrite your existing catalyst folder, pass the --force option");
            return;
        }

        await removeAsync(customCatalystPath);

        await copyAsync(catalystBoilerplatePath, path(customCatalystPath, "boilerplate"), { overwrite: force });

        const defaultConfigJson = JSON.stringify(defaultConfig, null, 4);
        const customConfigPath = path(customCatalystPath, "catalyst-js-cli.config.json");

        await writeAsync(customConfigPath, defaultConfigJson);
    },
}

module.exports = command
