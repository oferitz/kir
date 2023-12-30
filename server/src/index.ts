import { createHTTPServer } from '@trpc/server/adapters/standalone'
import cors from 'cors'
import { z } from 'zod'
import { db } from './db'
import { publicProcedure, router } from './trpc'

const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await db.user.findMany()
    return users
  }),
  userById: publicProcedure.input(z.string()).query(async opts => {
    const { input } = opts
    const user = await db.user.findById(input)
    return user
  }),
  userCreate: publicProcedure.input(z.object({ name: z.string() })).mutation(async opts => {
    const { input } = opts
    const user = await db.user.create(input)
    return user
  })
})

export type AppRouter = typeof appRouter

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log('context 3')
    return {}
  }
}).listen(9000)

console.log('🚀 Server ready at http://localhost:9000')
