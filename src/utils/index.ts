import { env } from '@/constants/env'
import faunadb from 'faunadb'

export function getFaunaClient(): faunadb.Client {
  const useFaunaDocker = env.USE_FAUNA_DOCKER === 'true'
  return new faunadb.Client({
    secret: useFaunaDocker ? 'secret' : env.FAUNADB_SECRET,
    scheme: useFaunaDocker ? 'http' : 'https',
    domain: useFaunaDocker ? 'localhost' : 'db.fauna.com',
    ...(useFaunaDocker ? { port: 8443 } : {}),
  })
}


export const getToday = (): string => new Date().toISOString().split('T')[0].split('-').reverse().join('-')