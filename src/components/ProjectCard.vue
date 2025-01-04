<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger, TextPlugin } from 'gsap/all'

const props = defineProps<{
  item: any
}>()

const proCard = ref<any>(null)
const proCardImg = ref<any>(null)
const proCardTitle = ref<any>(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(TextPlugin)
  if (proCard) {
    gsap.set(proCard.value, { x: 100, opacity: 0 })
    gsap.to(proCard.value, {
      scrollTrigger: {
        trigger: proCard.value,
        start: 'top top+=1000px',
        end: 'bottom-=500px',
        scrub: 1,
      },
      x: 0,
      opacity: 1,
    })
    gsap.to(proCardImg.value, {
      scrollTrigger: {
        trigger: proCard.value,
        start: 'top top+=1000px',
        scrub: 1,
      },
      scale: 1.1,
    })
    gsap.to(proCardTitle.value, {
      scrollTrigger: {
        trigger: proCard.value,
        start: 'top top+=300px',
      },
      duration: 0.75,
      text: {
        value: props.item.title,
        delimiter: '',
      },
    })
  }
})

const animateText = () => {}
</script>

<template>
  <div ref="proCard" class="mb-20">
    <div class="w-[600px] aspect-video mb-2 bg-white relative overflow-hidden rounded-2xl">
      <div
        ref="proCardImg"
        class="absolute inset-x-0 inset-y-0 scale-[1.6] -rotate-6 !bg-cover"
        :style="{ background: `url(${item.image.mediaItemUrl}) center center no-repeat` }"
      ></div>
      <div class="absolute z-[2] right-5 top-5 w-2/3">
        <ul class="flex flex-wrap gap-2 justify-end">
          <li v-for="tech in item.techStack" class="text-white bg-rose-600 p-2 text-xs rounded-2xl">
            {{ tech.tech }}
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full flex justify-between">
      <div class="w-full">
        <h4 class="text-white text-lg font-black">{{ item.role }}</h4>
        <h3 ref="proCardTitle" class="text-white text-2xl font-normal"></h3>
      </div>
    </div>
  </div>
</template>
