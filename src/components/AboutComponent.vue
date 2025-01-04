<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { onMounted, onUpdated, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger, TextPlugin } from 'gsap/all'

const props = defineProps<{
  title?: any
}>()

const aboutHeading = ref<any>(null)
const aboutContent = ref<Array<any>>([])
const expContent = ref<Array<any>>([])
const aboutPara = ref<any>(null)
const loaded = ref<boolean>(false)

const { result } = useQuery(gql`
  query NewQuery {
    pages {
      nodes {
        homepage {
          about {
            content
          }
          testimonials {
            company
            content
            name
          }
          workExperience {
            company
            desc
            role
            yearFrom
            yearTo
          }
        }
      }
    }
  }
`)

onMounted(() => {})

watch(result, (value) => {
  const aboutString = result.value.pages.nodes[0].homepage.about.content
    .replace('<p>', '')
    .replace('</p>', '')
  aboutContent.value = aboutString
  expContent.value = result.value.pages.nodes[0].homepage.workExperience
  loaded.value = true

  console.log(result.value.pages.nodes[0].homepage.workExperience)

  gsap.registerPlugin(ScrollTrigger)

  gsap.from(aboutHeading.value, {
    scrollTrigger: {
      trigger: aboutHeading.value,
      start: 'top bottom-=30%',
      end: '+=400px',
      scrub: 1,
      pinSpacing: false,
    },
    y: 200,
    opacity: 0,
  })

  gsap.from(aboutPara.value, {
    scrollTrigger: {
      trigger: aboutPara.value,
      start: 'top bottom-=30%',
      end: '+=400px',
      scrub: 1,
      pinSpacing: false,
    },
    y: 200,
    opacity: 0,
  })
})
</script>

<template>
  <div ref="aboutHeading" class="relative container z-[1] mx-auto my-40">
    <h2 class="text-[12rem] leading-[12rem] text-white font-bold">About<br />Me</h2>
  </div>
  <div class="container mx-auto">
    <div class="w-full flex justify-end mb-60">
      <div ref="aboutPara" class="w-2/3 relative z-[3]">
        <h2 v-if="loaded" class="text-white text-4xl leading-relaxed font-light text-pretty mb-20">
          {{ aboutContent }}
        </h2>
        <div
          v-for="(exp, index) in expContent"
          class="w-full flex justify-between items-center py-10 border-t border-white/10 border-solid"
        >
          <h3 class="text-white text-4xl font-normal">
            <span class="text-sm font-bold text-rose-600 block"
              >0{{ index + 1 }} - {{ exp.role }}</span
            >{{ exp.company }}
          </h3>
          <p class="text-white text-lg font-normal" v-if="exp.yearTo">
            {{ exp.yearFrom }} - {{ exp.yearTo }}
          </p>
          <p class="text-white text-lg font-normal" v-else>2020 - 2021, 2023 - Current</p>
        </div>
      </div>
    </div>
  </div>
</template>
