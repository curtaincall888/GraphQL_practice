import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'

import { createContext } from '@/graphql/context'
import { resolvers } from '@/graphql/resolvers'
import path from 'path'

const cors = Cors()

const schemaPath = path.join(process.cwd(), './generated/schema.graphql')
const schema = loadSchemaSync(schemaPath, {
  loaders: [new GraphQLFileLoader()],
})
const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
})
const apolloServer = new ApolloServer({
  schema: schemaWithResolvers,
  context: createContext,
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}