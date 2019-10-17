import * as moment from 'moment';

import {IIdentity} from '@essential-projects/iam_contracts';

import {Metric} from './metric';

/**
 * Contains functions for recording metrics relating to
 * ProcessInstances and FlowNodeInstances.
 */
export interface IMetricsApi {

  /**
   * Retrieves the metrics for a specific ProcessModel.
   *
   * @async
   * @param identity       The requesting users identity.
   * @param processModelId The ID of ProcessModel for which to retrieve
   *                       the metrics.
   * @returns              A list of metrics.
   */
  readMetricsForProcessModel(identity: IIdentity, processModelId: string): Promise<Array<Metric>>;

  /**
   * Records a metric for a ProcessInstance at the moment it was started.
   *
   * @async
   * @param correlationId  The CorrelationId for which to record the metric.
   * @param processInstanceId The ProcessInstanceId for which to record the metric.
   * @param processModelId The ProcessModelId for which to record the metric.
   * @param timestamp      The timestamp at which the event to measure occured.
   */
  writeOnProcessStarted(correlationId: string, processInstanceId: string, processModelId: string, timestamp: moment.Moment): Promise<void>;

  /**
   * Records a metric for a ProcessInstance at the moment it was finished.
   *
   * @async
   * @param correlationId  The CorrelationId for which to record the metric.
   * @param processInstanceId The ProcessInstanceId for which to record the metric.
   * @param processModelId The ProcessModelId for which to record the metric.
   * @param timestamp      The timestamp at which the event to measure occured.
   */
  writeOnProcessFinished(correlationId: string, processInstanceId: string, processModelId: string, timestamp: moment.Moment): Promise<void>;

  /**
   * Records a metric for a ProcessInstance at the moment it was aborted
   * with an error.
   *
   * @async
   * @param correlationId  The CorrelationId for which to record the metric.
   * @param processInstanceId The ProcessInstanceId for which to record the metric.
   * @param processModelId The ProcessModelId for which to record the metric.
   * @param error          The error that occured.
   * @param timestamp      The timestamp at which the event to measure occured.
   */
  writeOnProcessError(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    error: Error,
    timestamp: moment.Moment,
  ): Promise<void>;

  /**
   * Records a metric for a FlowNodeInstance at the moment it was started.
   *
   * @async
   * @param correlationId      The CorrelationId for which to record the metric.
   * @param processInstanceId The ProcessInstanceId for which to record the metric.
   * @param processModelId     The ProcessModelId for which to record the metric.
   * @param flowNodeInstanceId The FlowNodeInstance for which to record the metric.
   * @param tokenPayload       The process token that the FlowNodeInstance had
   *                           at the time the metric was recorded.
   * @param timestamp          The timestamp at which the event to measure occured.
   */
  writeOnFlowNodeInstanceEnter(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    timestamp: moment.Moment,
  ): Promise<void>;

  /**
   * Records a metric for a FlowNodeInstance at the moment it was finished.
   *
   * @async
   * @param correlationId      The CorrelationId for which to record the metric.
   * @param processInstanceId The ProcessInstanceId for which to record the metric.
   * @param processModelId     The ProcessModelId for which to record the metric.
   * @param flowNodeInstanceId The FlowNodeInstance for which to record the metric.
   * @param tokenPayload       The process token that the FlowNodeInstance had
   *                           at the time the metric was recorded.
   * @param timestamp          The timestamp at which the event to measure occured.
   */
  writeOnFlowNodeInstanceExit(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    timestamp: moment.Moment,
  ): Promise<void>;

  /**
   * Records a metric for a FlowNodeInstance at the moment it was aborted with
   * an error.
   *
   * @async
   * @param correlationId      The CorrelationId for which to record the metric.
   * @param processInstanceId The ProcessInstanceId for which to record the metric.
   * @param processModelId     The ProcessModelId for which to record the metric.
   * @param flowNodeInstanceId The FlowNodeInstance for which to record the metric.
   * @param tokenPayload       The process token that the FlowNodeInstance had
   *                           at the time the metric was recorded.
   * @param error              The error that occured.
   * @param timestamp          The timestamp at which the event to measure occured.
   */
  writeOnFlowNodeInstanceError(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    error: Error,
    timestamp: moment.Moment,
  ): Promise<void>;

  /**
   * Records a metric for a FlowNodeInstance at the moment it was suspended.
   *
   * @async
   * @param correlationId      The CorrelationId for which to record the metric.
   * @param processInstanceId The ProcessInstanceId for which to record the metric.
   * @param processModelId     The ProcessModelId for which to record the metric.
   * @param flowNodeInstanceId The FlowNodeInstance for which to record the metric.
   * @param tokenPayload       The process token that the FlowNodeInstance had
   *                           at the time the metric was recorded.
   * @param timestamp          The timestamp at which the event to measure occured.
   */
  writeOnFlowNodeInstanceSuspend(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    timestamp: moment.Moment,
  ): Promise<void>;

  /**
   * Records a metric for a FlowNodeInstance at the moment it was resumed.
   *
   * @async
   * @param correlationId      The CorrelationId for which to record the metric.
   * @param processInstanceId The ProcessInstanceId for which to record the metric.
   * @param processModelId     The ProcessModelId for which to record the metric.
   * @param flowNodeInstanceId The FlowNodeInstance for which to record the metric.
   * @param tokenPayload       The process token that the FlowNodeInstance had
   *                           at the time the metric was recorded.
   * @param timestamp          The timestamp at which the event to measure occured.
   */
  writeOnFlowNodeInstanceResume(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    timestamp: moment.Moment,
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
  archiveProcessModelMetrics(identity: IIdentity, processModelId: string): Promise<void>;
}
