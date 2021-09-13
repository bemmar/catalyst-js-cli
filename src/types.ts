// export types

export type StringCasing =
  | 'snake'
  | 'kebab'
  | 'camel'
  | 'pascal'
  | 'upper'
  | 'lower';

export enum ReplacerString {
  modelName = '__model_name__',
  modelFileName = '__model_file_name__',
  fileName = '__file_name__'
  // tODO: finish - why is this needed??
}

export type CatalystConfig = {
  /**
   * Template file name of the Model class.
   */
  modelTemplateFileName?: string;
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
};
