<script setup lang="ts">
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { onMounted, onUpdated, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

const props = defineProps<{
  title?: string
  dark?: boolean
}>()

const heroContainer = ref<any>()
const availBox = ref<any>()
const locBox = ref<any>()
const mainText = ref<any>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  if (availBox.value) {
    gsap.to(availBox.value, {
      scrollTrigger: {
        trigger: heroContainer.value,
        start: 'top top',
        scrub: 1,
      },
      x: -100,
      opacity: 0,
    })
    gsap.to(locBox.value, {
      scrollTrigger: {
        trigger: heroContainer.value,
        start: 'top top',
        scrub: 1,
      },
      x: 100,
      opacity: 0,
    })
    gsap.to(mainText.value, {
      scrollTrigger: {
        trigger: heroContainer.value,
        start: 'top top',
        scrub: 1,
      },
      opacity: 0,
      y: 50,
    })
  }
})
</script>

<template>
  <div ref="heroContainer" class="w-full relative h-screen">
    <div class="absolute inset-x-0 inset-y-0 z-[2] flex items-center">
      <div class="container">
        <h1 ref="mainText" class="text-[8vw] leading-[10vw] font-normal text-white">
          {{ title }}
        </h1>
      </div>
    </div>
    <div class="absolute bottom-10 inset-x-0">
      <div class="container mx-auto flex items-center justify-between">
        <p
          ref="availBox"
          class="text-sm text-white uppercase flex items-center border-white border border-solid rounded-full px-4 py-1"
        >
          Available for work
          <span class="relative flex h-3 w-3 ml-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
            ></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </p>
        <p class="text-white text-2xl animate-bounce">
          <font-awesome-icon :icon="faArrowDownLong" />
        </p>
        <p ref="locBox" class="text-sm text-white uppercase">Based In Vancouver, BC.</p>
      </div>
    </div>
  </div>
</template>
