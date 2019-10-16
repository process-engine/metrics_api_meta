import * as moment from 'moment';

import {MetricMeasurementPoint} from './metric_measurement_point';

/**
 * Describes a single metric.
 * Contains information about the Correlation, ProcessModel and
 * FlowNodeInstance to which the metric belongs,
 * and the timestamp at which it was recorded.
 *
 * The properties here are ordered in the same manner as they are in the
 * actual log file.
 */
export class Metric {

  public timeStamp: moment.Moment;
  public correlationId: string;
  public processInstanceId: string;
  public processModelId: string;
  public flowNodeInstanceId?: string;
  public flowNodeId?: string;
  public metricType: MetricMeasurementPoint;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tokenPayload: any;
  public error?: Error;

}
