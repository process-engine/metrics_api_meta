/* eslint-disable @typescript-eslint/camelcase */
export interface IMetricsRepositoryConfig {
  output_path: string;
  archive_path?: string; // If not provided "<output_path>/archive" will be used
}
