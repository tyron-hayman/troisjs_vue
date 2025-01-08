<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { onMounted, onUpdated, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

const pageData = ref<any>(null)
const marquee = ref<any>(null)
const testimonialsWrap = ref<any>(null)
const testimonialsWrapTop = ref<number>(0)
const testNav = ref<any>(null)
const bgColours: Array<any> = ['bg-rose-600', 'bg-rose-700', 'bg-rose-800']

const { result } = useQuery(gql`
  query NewQuery {
    pages {
      nodes {
        homepage {
          testimonials {
            company
            content
            name
            image {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap
    .to(marquee.value.children, { xPercent: -100, repeat: -1, duration: 10, ease: 'linear' })
    .totalProgress(0.5)
})

onUpdated(() => {
  let targetS = testimonialsWrap.value.offsetTop
  testimonialsWrapTop.value = targetS
})

watch(result, (value) => {
  pageData.value = result.value.pages.nodes[0].homepage.testimonials
})

watch(testNav, () => {
  gsap.set(testNav.value.children, { opacity: 0, x: -200 })
  const navItems = gsap.utils.toArray(testNav.value.children)
  navItems.forEach((navItem: any, i: number) => {
    gsap.to(navItem, {
      scrollTrigger: {
        trigger: testimonialsWrap.value,
        start: 'top top+=100px',
        end: '+=200px',
        scrub: 1,
      },
      opacity: 1,
      x: 0,
    })
  })
})
</script>

<template>
  <div class="relative w-full z-[1] mt-[300px] mb-[300px]">
    <div ref="marquee" class="w-full flex flex-row flex-auto overflow-hidden">
      <h2 v-for="n in 8" class="text-white text-light text-9xl leading-none shrink-0">
        Client Feedback<font-awesome-icon class="px-5" :icon="faAsterisk" />
      </h2>
    </div>
  </div>
  <div ref="testimonialsWrap" class="relative w-full z-[3]">
    <div class="w-full relative" v-if="pageData">
      <div
        ref="testNav"
        class="fixed left-4 top-0 h-screen z-[4] flex flex-col justify-center w-[50px]"
      >
        <div
          v-for="(text, index) in pageData"
          class="aspect-square w-full rounded-full !bg-cover my-2"
          :style="{ background: `url(${text.image.mediaItemUrl}) center center no-repeat` }"
        ></div>
      </div>
      <div
        v-for="(text, index) in pageData"
        class="w-full h-screen sticky top-0 h-screen flex items-center justify-center"
        :class="bgColours[index]"
      >
        <div class="w-2/3 text-center">
          <div
            class="text-white text-3xl text-center leading-relaxed font-light mb-5"
            v-html="text.content"
          ></div>
          <h3 class="text-white font-normal text-1xl mb-5">{{ text.name }}</h3>
          <h4 class="text-white font-black text-2xl">{{ text.company }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
