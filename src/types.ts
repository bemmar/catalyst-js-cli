// export types

export type StringCasing = "snake" | "kebab" | "camel" | "pascal" | "upper" | "lower";

export enum TemplateElement {
    EntityName = "entityname"
}

export type CatalystConfig = {
    /**
     * Template string for service file names.
     */
    serviceNameTemplate?: string;
    /**
     * Template string for model file names.
     */
    modelNameTemplate?: string;
    /**
     * File path to model folder.
     */
    modelPathParts?: string[];
    /**
     * File path to service folder.
     */
    servicePathParts?: string[];
    /**
     * String casing to use for file names.
     */
    fileNameCasing?: StringCasing;
    /**
     * String casing to use for class names.
     */
    classNameCasing?: StringCasing;
    /**
     * String casing to use for class properties.
     */
    propertyCasing?: StringCasing;
}