import * as moment from 'moment';

import {IIdentity} from '@essential-projects/iam_contracts';
import {
  IMetricsApi, IMetricsRepository, Metric, MetricMeasurementPoint,
} from '@process-engine/metrics_api_contracts';

export class MetricsApiService implements IMetricsApi {

  private metricsRepository: IMetricsRepository;

  constructor(metricsRepository: IMetricsRepository) {
    this.metricsRepository = metricsRepository;
  }

  public async readMetricsForProcessModel(identity: IIdentity, processModelId: string): Promise<Array<Metric>> {

    return this
      .metricsRepository
      .readMetricsForProcessModel(processModelId);
  }

  public async writeOnProcessStarted(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    timestamp: moment.Moment,
  ): Promise<void> {

    await this
      .metricsRepository
      .writeMetricForProcessInstance(correlationId, processInstanceId, processModelId, MetricMeasurementPoint.onProcessStart, timestamp);
  }

  public async writeOnProcessFinished(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    timestamp: moment.Moment,
  ): Promise<void> {

    await this
      .metricsRepository
      .writeMetricForProcessInstance(correlationId, processInstanceId, processModelId, MetricMeasurementPoint.onProcessFinish, timestamp);
  }

  public async writeOnProcessError(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    error: Error,
    timestamp: moment.Moment,
  ): Promise<void> {

    await this
      .metricsRepository
      .writeMetricForProcessInstance(correlationId, processInstanceId, processModelId, MetricMeasurementPoint.onProcessError, timestamp, error);
  }

  public async writeOnFlowNodeInstanceEnter(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    timestamp: moment.Moment,
  ): Promise<void> {

    await this.metricsRepository.writeMetricForFlowNodeInstance(
      correlationId,
      processInstanceId,
      processModelId,
      flowNodeInstanceId,
      flowNodeId,
      MetricMeasurementPoint.onFlowNodeEnter,
      tokenPayload,
      timestamp,
    );
  }

  public async writeOnFlowNodeInstanceExit(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    timestamp: moment.Moment,
  ): Promise<void> {

    await this.metricsRepository.writeMetricForFlowNodeInstance(
      correlationId,
      processInstanceId,
      processModelId,
      flowNodeInstanceId,
      flowNodeId,
      MetricMeasurementPoint.onFlowNodeExit,
      tokenPayload,
      timestamp,
    );
  }

  public async writeOnFlowNodeInstanceError(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    error: Error,
    timestamp: moment.Moment,
  ): Promise<void> {

    await this.metricsRepository.writeMetricForFlowNodeInstance(
      correlationId,
      processInstanceId,
      processModelId,
      flowNodeInstanceId,
      flowNodeId,
      MetricMeasurementPoint.onFlowNodeError,
      tokenPayload,
      timestamp,
      error,
    );
  }

  public async writeOnFlowNodeInstanceSuspend(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    timestamp: moment.Moment,
  ): Promise<void> {

    await this.metricsRepository.writeMetricForFlowNodeInstance(
      correlationId,
      processInstanceId,
      processModelId,
      flowNodeInstanceId,
      flowNodeId,
      MetricMeasurementPoint.onFlowNodeSuspend,
      tokenPayload,
      timestamp,
    );
  }

  public async writeOnFlowNodeInstanceResume(
    correlationId: string,
    processInstanceId: string,
    processModelId: string,
    flowNodeInstanceId: string,
    flowNodeId: string,
    tokenPayload: any,
    timestamp: moment.Moment,
  ): Promise<void> {

    await this.metricsRepository.writeMetricForFlowNodeInstance(
      correlationId,
      processInstanceId,
      processModelId,
      flowNodeInstanceId,
      flowNodeId,
      MetricMeasurementPoint.onFlowNodeResume,
      tokenPayload,
      timestamp,
    );
  }

  public async archiveProcessModelMetrics(identity: IIdentity, processModelId: string): Promise<void> {
    await this
      .metricsRepository
      .archiveProcessModelMetrics(processModelId);
  }

}
