# Metrics API

Contains all the layers that make up the Metrics API.

- [metrics.contracts](./metrics.contracts)
- [metrics.services](./metrics.services)
- [metrics.repositories.sequelize](./metrics.repositories.sequelize)

## Motivation

The goal of this package is to reduce the effort required for maintaining the ProcessEngine, particularly the runtime layer.

It combines what was previously known as the "Metrics Layer APIs" into a single API, located in a single GitHub repository.

The functions from the following packages are included:

- [metrics_api_contracts](https://github.com/process-engine/metrics_api_contracts)
- [metrics_api_core](https://github.com/process-engine/metrics_api_core)
- [metrics.repository.sequelize](https://github.com/process-engine/metrics.repository.sequelize)

## How to use

The structure of the services, repos, etc. remains as it was before, as do the corresponding IoC registrations.
So with regards to your npm dependencies, you don't have to do anything.
