<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { onMounted, onUpdated, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger, TextPlugin } from 'gsap/all'

const props = defineProps<{
  loading?: any
  loadProgress?: any
}>()

const LoaderComponent = ref<any>(null)
const loaderText = ref<any>(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
})

onUpdated(() => {
  if (props.loading) {
    const loaderBlocks = document.querySelectorAll('.loaderBlocks')
    loaderBlocks.forEach((block: any, i: number) => {
      let tl = gsap.to(block, {
        delay: i * 0.15,
        duration: 0.5,
        bottom: '100%',
        onComplete: removeLoader,
      })
    })
  }
})

const removeLoader = () => {
  gsap.to(loaderText.value, {
    duration: 0.35,
    opacity: 0,
    onComplete: removeLoader,
  })
  gsap.to(LoaderComponent.value, {
    duration: 0.35,
    bottom: '100%',
    delay: 2,
  })
}
</script>

<template>
  <div ref="LoaderComponent" class="fixed inset-x-0 inset-y-0 z-[1000] overflow-hidden">
    <div
      class="absolute inset-x-0 inset-y-0 z-[3] flex items-center justify-center mix-blend-difference"
    >
      <p ref="loaderText" class="text-white font-normal text-6xl">{{ loadProgress }}%</p>
    </div>
    <div
      class="loaderBlocks absolute bg-black top-0 bottom-0 w-1/4 z-[1]"
      v-for="n in 4"
      :style="{ left: (n - 1) * 25 + `%` }"
    ></div>
  </div>
</template>
