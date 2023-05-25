// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {Constructor, Getter, inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {SequelizeCrudRepository} from '@loopback/sequelize';
import {
  AuditDbSourceName,
  AuditLogRepository,
  AuditRepositoryMixin,
  IAuditMixinOptions,
} from '@sourceloop/audit-log/sequelize';
import {AuthenticationBindings, IAuthUser} from 'loopback4-authentication';
import {PgDataSource} from '../datasources';
import {ToDo, ToDoWithRelations} from '../models';

const todoAuditOpts: IAuditMixinOptions = {
  actionKey: 'Todo_Logs',
};

export class ToDoRepository extends AuditRepositoryMixin<
  ToDo,
  typeof ToDo.prototype.id,
  ToDoWithRelations,
  string | number,
  Constructor<
    SequelizeCrudRepository<ToDo, typeof ToDo.prototype.id, ToDoWithRelations>
  >
>(SequelizeCrudRepository, todoAuditOpts) {
  constructor(
    @inject(`datasources.${AuditDbSourceName}`) dataSource: PgDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<IAuthUser>,
    @repository.getter('AuditLogRepository')
    public getAuditLogRepository: Getter<AuditLogRepository>,
  ) {
    super(ToDo, dataSource, getCurrentUser);
  }
}
