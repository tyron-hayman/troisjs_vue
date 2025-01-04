<script setup lang="ts">
import NavComponent from './components/NavComponent.vue'
import HeroComponent from './components/HeroComponent.vue'
import ProjectsComponent from './components/ProjectsComponent.vue'
import AboutComponent from './components/AboutComponent.vue'
import LoaderComponent from './components/LoaderComponent.vue'
import { Box, Camera, GltfModel, Mesh, StandardMaterial, Renderer, Scene } from 'troisjs'
import { onMounted, ref } from 'vue'
import { useDark } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Lenis from 'lenis'

const isDark = useDark()

const { width, height } = useWindowSize()

const rendererRef = ref<any>()
const appContainer = ref<any>()
const torRef = ref<any>()
const torRef2 = ref<any>()
const progress = ref<any>(0)
const rotationY = ref<number>(0)
const posZ = ref<number>(3.5)
const isLoaded = ref<boolean>(false)
const loadProgress = ref<any>(0)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    autoRaf: true,
  })

  if (torRef.value?.mesh && torRef.value?.mesh && rendererRef.value) {
    const box = torRef.value.mesh
    const box2 = torRef2.value.mesh
    rendererRef.value.onBeforeRender(() => {
      box.rotation.x += 0.0005
      box.rotation.y += 0.0005

      box2.rotation.x += 0.0005
      box2.rotation.z += 0.0005
    })
  }
  if (rendererRef.value) {
    ScrollTrigger.create({
      trigger: appContainer.value,
      start: 'top top',
      end: 'bottom+=6000px',
      scrub: 1,
      onUpdate: (self) => {
        progress.value = self.progress
        rotationY.value = self.progress / 1
        posZ.value = 3.5 - self.progress * 1.5
      },
    })
  }
})

const loadingModel = (progress: ProgressEvent) => {
  loadProgress.value = Math.round((progress.loaded / progress.total) * 100)
  if (loadProgress.value == 100) {
    isLoaded.value = true
  }
}
</script>

<template>
  <div ref="appContainer" class="w-full">
    <NavComponent />
    <div class="fixed inset-y-0 inset-x-0 z-[2]">
      <Renderer ref="rendererRef" resize shadow :alpha="true">
        <Camera :position="{ z: posZ, x: 0, y: 0 }" :fov="30" />
        <Scene>
          <SpotLight
            color="#ffffff"
            :intensity="0.8"
            :position="{ x: 4, y: 0, z: -4.5 }"
            cast-shadow
            :shadow-map-size="{ width: 512, height: 512 }"
          />
          <PointLight
            color="#e11d48"
            :intensity="1"
            :position="{ x: -2.5, y: 0, z: -2 }"
            cast-shadow
            :shadow-map-size="{ width: 512, height: 512 }"
          />
          <Mesh ref="boxRef" :rotation="{ x: 0, y: 0, z: 0 }">
            <GltfModel
              :position="{ z: 0, x: -0.5, y: -3.2 }"
              :rotation="{ x: 0, y: -rotationY, z: 0 }"
              src="/man2.glb"
              @progress="loadingModel"
            />
          </Mesh>
          <EffectComposer>
            <RenderPass />
            <FilmPass :noiseIntensity="0.4" :scanlinesIntensity="0.2" />
          </EffectComposer>
        </Scene>
      </Renderer>
    </div>
    <div class="pointer-events-none relative z-[3]">
      <HeroComponent title="Frontend Developer Passionate About Code." />
    </div>
    <ProjectsComponent :dark="isDark" />
    <AboutComponent />
  </div>
  <LoaderComponent :loading="isLoaded" :loadProgress="loadProgress" />
</template>

<style scoped></style>
