// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {SequelizeDataSource} from '@loopback/sequelize';
import {AuditDbSourceName} from '@sourceloop/audit-log/sequelize';
const config = {
  name: AuditDbSourceName,
  connector: 'postgresql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: 'main',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PgDataSource
  extends SequelizeDataSource
  implements LifeCycleObserver
{
  static dataSourceName = AuditDbSourceName;
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.pg', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
