<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { gsap } from 'gsap/gsap-core'
import { ref, onMounted } from 'vue'
const { x, y, sourceType } = useMouse()
const mouseFriend = ref<any>(null)

onMounted(() => {
  window.addEventListener('mousemove', (event) => {
    gsap.to(mouseFriend.value, {
      duration: 0.5,
      overwrite: 'auto',
      x: event.clientX - 15,
      y: event.clientY - 15,
      stagger: 0.15,
      ease: 'power4.out',
    })
  })
})
</script>

<template>
  <div
    ref="mouseFriend"
    class="fixed z-[500] pointer-events-none w-[30px] h-[30px] rounded-full bg-white mix-blend-difference"
  ></div>
</template>
