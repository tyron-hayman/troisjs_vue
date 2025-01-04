import './assets/main.css'
import './assets/styles/global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { TroisJSVuePlugin } from 'troisjs'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons'
import lenis from 'lenis/vue'
import { provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://wp.tyronhayman.me/graphql',
})

/* add icons to the library */
library.add([faArrowDownLong])

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(TroisJSVuePlugin)
app.use(lenis)

app.mount('#app')
