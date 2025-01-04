import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://wp.tyronhayman.me/graphql',
})

export default apolloClient
