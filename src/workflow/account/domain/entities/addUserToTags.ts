import * as TE from 'fp-ts/TaskEither'
import { AddUserToTags } from '../contracts/AddUserToTags'
import { clientError, fail } from '../../../../core/infra/HttpErrorResponse'
import { prisma } from '../../infra/prisma/client'
import { pipe } from 'fp-ts/lib/function'
import { findUserById } from './findUserById'

export const addUserToTags: AddUserToTags = ({ userId, tags }) => {
  const user = pipe(
    userId,
    findUserById,
    TE.chain(UserFound => {
      return TE.tryCatch(
        async () => {
          if (!UserFound) {
            throw new Error('Oops! Usuário não existe')
          }

          return UserFound
        },

        userNotFoundError => clientError(userNotFoundError as Error)
      )
    }),
    TE.chain((user) => {
      return TE.tryCatch(
        async () => {
          const users = tags.map(async tag => {
            await prisma.tag.update({
              where: {
                id: tag.id
              },
              data: {
                users: {
                  connect: {
                    id: userId
                  }
                }
              }
            })

            return user
          })

          return await users[0]
        },
        (err) => {
          console.log(err)
          return fail(new Error('Oops! Erro. Por favor contacte suporte'))
        }
      )
    })
  )

  return user
}
