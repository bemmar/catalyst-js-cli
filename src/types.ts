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
   * Key = source folder name (catalyst/{folder name}) and array of path parts points to destination folder.
   */
  pathParts: Record<string, string[]>;
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
  /**
   * Suffix for a Model name.
   */
  modelNameSuffix: string;
  /**
   * Suffix for an ID property.
   */
  IdNameSuffix: string;
};
