import * as moment from 'moment';

import {Metric} from './metric';
import {MetricMeasurementPoint} from './metric_measurement_point';

/**
 * Contains functions for writing and retrieving content from logfiles,
 * pertaining to metrics.
 * Each file relates to a specific ProcessModel.
 */
export interface IMetricsRepository {

  /**
   * Retrieves the metrics for a specific ProcessModel.
   *
   * @async
   * @param processModelId The ID of ProcessModel for which to retrieve
   *                       the metrics.
   * @returns              A list of metrics.
   */
  readMetricsForProcessModel(processModelId: string): Promise<Array<Metric>>;

  /**
   * Writes a metric for a specific ProcessInstance of a Correlation.
   *
   * @async
   * @param correlationId     The ID of the Correlation to which the
   *                          ProcessInstance belongs.
   * @param processInstanceId The ID of ProcessInstance for which to record the
   *                          metric.
   * @param processModelId    The ID of ProcessModel associated with the
   *                          ProcessInstance.
   * @param metricType        The type of metric (OnEnter, OnExit, etc).
   * @param timestamp         The timestamp to use for the metric.
   * @param error             Optional: When recording an error, this stores the
   *                          error that was encountered.
   */
  writeMetricForProcessInstance(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    metricType: MetricMeasurementPoint,
    timestamp: moment.Moment,
    error?: Error,
  ): Promise<void>;

  /**
   * Writes a metric for a specific FlowNode of a ProcessInstance within a
   * Correlation.
   *
   * @async
   * @param correlationId      The ID of the Correlation to which the
   *                           ProcessInstance belongs.
   * @param processInstanceId  The ID of ProcessInstance for which to record the
   *                           metric.
   * @param processModelId     The ID of ProcessModel associated with the
   *                           ProcessInstance.
   * @param flowNodeInstanceId The instance ID of FlowNode for which to create
   *                           a metric.
   * @param flowNodeId         The ID of FlowNode for which to create a
   *                           metric.
   * @param metricType         The type of metric (OnEnter, OnExit, etc).
   * @param processToken       The process token that the FlowNodeInstance had
   *                           at the time the metric was recorded.
   * @param timestamp          The timestamp to use for the metric.
   * @param error              Optional: When recording an error, this stores
   *                           the error that was encountered.
   */
  writeMetricForFlowNodeInstance(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    metricType: MetricMeasurementPoint,
    tokenPayload: any,
    timestamp: moment.Moment,
    error?: Error,
  ): Promise<void>;

  /**
   * Places all metrics for the given ProcessModel into the "archive" folder.
   * Essentially, this is pretty much like "deleting" the metrics, as they will no longer be available.
   *
   * However, since metrics are somewhat sensitive, they will not be deleted, but archived.
   *
   * @param identity       The identity of the requesting user.
   * @param processModelId The ID of the ProcessModel whose metrics are to be archived.
   */
  archiveProcessModelMetrics(processModelId: string): Promise<void>;
}
