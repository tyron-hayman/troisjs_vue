<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { watch, ref, onMounted } from 'vue'
import ProjectCard from './ProjectCard.vue'
import { gsap } from 'gsap'
import { ScrollTrigger, TextPlugin } from 'gsap/all'

const props = defineProps<{
  dark?: boolean
}>()
const pageData = ref<Array<any>>([])
const proHeading = ref<any>(null)

const { result } = useQuery(gql`
  query NewQuery {
    pages {
      nodes {
        homepage {
          recentWork {
            content
            image {
              mediaItemUrl
            }
            role
            techStack {
              tech
            }
            title
            url
            year
          }
        }
      }
    }
  }
`)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.from(proHeading.value, {
    scrollTrigger: {
      trigger: proHeading.value,
      start: 'top bottom-=30%',
      end: '+=400px',
      scrub: 1,
    },
    y: 200,
    opacity: 0,
  })
})

watch(result, (value) => {
  pageData.value = result.value.pages.nodes[0].homepage.recentWork
})

onMounted(() => {})
</script>

<template>
  <div ref="proHeading" class="relative container z-[1] mx-auto my-40">
    <h2 class="text-[12rem] leading-[12rem] text-white font-bold">Recent<br />Projects</h2>
  </div>
  <div class="relative container mx-auto z-[3]">
    <div class="w-full flex justify-end">
      <div v-if="pageData.length > 0" class="w-[600px]">
        <ProjectCard class="mb-20" v-for="item in pageData" :item="item" />
      </div>
    </div>
  </div>
</template>
