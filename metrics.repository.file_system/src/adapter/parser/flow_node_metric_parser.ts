import * as moment from 'moment';

import {Metric, MetricMeasurementPoint} from '@process-engine/metrics_api_contracts';

import * as ErrorSerializer from '../error_serializer';

export function parseFlowNodeInstanceMetric(metricData: Array<string>): Metric {

  const isV1 = metricData[0] === 'FlowNodeInstance';
  const isV2 = metricData[0] === 'FlowNodeInstance_V2';

  if (isV1) {
    return parseAsV1(metricData);
  }
  if (isV2) {
    return parseAsV2(metricData);
  }

  return undefined;
}

/**
 * Parses a metrics string into the v1 format employed by the ProcessEngine.
 * In this version, errors were only added to the log, if any occured.
 *
 * @param metricAsString The metrics to parse.
 */
function parseAsV1(metricData: Array<string>): Metric {

  const metric = new Metric();
  metric.timeStamp = moment(metricData[1]);
  metric.correlationId = metricData[2];
  metric.processModelId = metricData[3];
  metric.flowNodeInstanceId = metricData[4];
  metric.flowNodeId = metricData[5];
  metric.metricType = MetricMeasurementPoint[metricData[6]];
  metric.tokenPayload = JSON.parse(metricData[7]);
  metric.error = metricData.length === 9 ? ErrorSerializer.deserialize(metricData[8]) : undefined;

  return metric;
}

/**
 * Parses a metrics string into the v2 format employed by the ProcessEngine.
 * In this format, the processInstanceId was added.
 * Also, an entry for "error" is always made, even if none occured, to ensure a consistent csv format.
 *
 * @param metricAsString The metrics to parse.
 */
function parseAsV2(metricData: Array<string>): Metric {

  const metric = new Metric();
  metric.timeStamp = moment(metricData[1]);
  metric.correlationId = metricData[2];
  metric.processInstanceId = metricData[3];
  metric.processModelId = metricData[4];
  metric.flowNodeInstanceId = metricData[5];
  metric.flowNodeId = metricData[6];
  metric.metricType = MetricMeasurementPoint[metricData[7]];
  metric.tokenPayload = JSON.parse(metricData[8]);
  metric.error = ErrorSerializer.deserialize(metricData[9]);

  return metric;
}
