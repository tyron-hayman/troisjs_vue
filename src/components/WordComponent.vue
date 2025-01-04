<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const props = defineProps<{
  word: any
}>()

const wordParent = ref<any>(null)
const wordRef = ref<any>(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.from(wordRef.value, {
    y: 200,
    opacity: 0,
    scrollTrigger: {
      trigger: wordRef.value,
      start: 'top bottom+=300px',
      end: '+=300px',
      scrub: 1,
    },
  })
})
</script>

<template>
  <span ref="wordParent" class="inline-block mr-4">
    <span ref="wordRef" class="aboutParaSpan block">
      {{ word }}
    </span>
  </span>
</template>
