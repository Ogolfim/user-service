import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { HttpErrorResponse } from '@core/infra/http_error_response'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { CreateEmployeeInfoProps } from '@account/domain/requiredFields/Users/create_Employee_info'
import { EmployeeSchema } from '@account/infra/prisma/schemas'
import { UUID } from 'io-ts-types'

export interface UnValidatedEmployee {
  userId: UUID
  companyId: string
}

export type CreateEmployeeInfoValidator = (data: UnValidatedEmployee) => E.Either<ValidationError, CreateEmployeeInfoProps>

export type CreateEmployeeInfoDB = (user: CreateEmployeeInfoProps) => Promise<EmployeeSchema>

export type CreateEmployeeInfoService = (createEmployeeInfoDB: CreateEmployeeInfoDB) => (user: CreateEmployeeInfoProps) => TE.TaskEither<HttpErrorResponse, EmployeeSchema>
