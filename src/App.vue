<script setup lang="ts">
import NavComponent from './components/NavComponent.vue'
import HeroComponent from './components/HeroComponent.vue'
import ProjectsComponent from './components/ProjectsComponent.vue'
import AboutComponent from './components/AboutComponent.vue'
import LoaderComponent from './components/LoaderComponent.vue'
import TestimonialComponent from './components/TestimonialComponent.vue'
import MouseFollower from './components/MouseFollower.vue'
import { Camera, GltfModel, Mesh, Renderer, Scene, PointLight } from 'troisjs'
import { Raycaster, Vector2 } from 'three'
import { onMounted, ref } from 'vue'
import { useDark } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Lenis from 'lenis'
import { useMouse } from '@vueuse/core'

const { x, y, sourceType } = useMouse()

const isDark = useDark()

const { width, height } = useWindowSize()

const rendererRef = ref<any>()
const appContainer = ref<any>()
const progress = ref<any>(0)
const rotationY = ref<number>(0)
const posZ = ref<number>(3.5)
const lightZ = ref<number>(-3.5)
const isLoaded = ref<boolean>(false)
const loadProgress = ref<any>(0)
const hexBox = ref<any>(null)
const NUM_INSTANCES = 300
const raycaster = new Raycaster()
const pointer = new Vector2()
const mainCamera = ref<any>(null)
const lightPosX = ref<number>(0)
const lightPosY = ref<number>(0)
const lightPosZ = ref<number>(0)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    autoRaf: true,
  })

  if (hexBox.value?.mesh && rendererRef.value) {
    const box = hexBox.value.mesh
    rendererRef.value.onBeforeRender(() => {
      box.rotation.x += 0.005
      box.rotation.z += 0.005
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
        rotationY.value = self.progress / 2 / 1
        posZ.value = 3.5 - self.progress
        lightZ.value = -3.5 - self.progress * 4
      },
    })
  }

  rendererRef.value.onBeforeRender(() => {
    raycaster.setFromCamera(pointer, mainCamera.value.camera)
    lightPosX.value = raycaster.ray.direction.x * 2.5
    lightPosY.value = raycaster.ray.direction.y * 2.5
    lightPosZ.value = raycaster.ray.direction.z
  })

  window.addEventListener('mousemove', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  })
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
    <MouseFollower />
    <div class="fixed inset-y-0 inset-x-0 z-[2]">
      <Renderer ref="rendererRef" resize shadow :alpha="true">
        <Camera ref="mainCamera" :position="{ z: posZ, x: 0, y: 0 }" :fov="30" />
        <Scene>
          <SpotLight
            color="#ffffff"
            :intensity="0.5"
            :position="{ x: 4, y: 0, z: lightZ }"
            cast-shadow
            :shadow-map-size="{ width: 512, height: 512 }"
          />
          <PointLight
            color="#e74c3c"
            :intensity="0.8"
            :distance="2.5"
            :position="{ x: lightPosX, y: lightPosY, z: 2 }"
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
          <InstancedMesh ref="imesh" :count="NUM_INSTANCES">
            <DodecahedronGeometry :radius="1" />
            <SubSurfaceMaterial :props="{ vertexColors: true }" />
          </InstancedMesh>
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
    <TestimonialComponent />
  </div>
  <LoaderComponent :loading="isLoaded" :loadProgress="loadProgress" />
</template>

<style scoped></style>
