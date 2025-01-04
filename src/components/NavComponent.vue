<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
const navitems: Array<any> = [
  { title: 'Work', url: '#' },
  { title: 'About', url: '#' },
  { title: 'Contact', url: '#' },
]
</script>

<template>
  <div class="w-full fixed top-0 inset-x-0 py-10 z-10 mix-blend-difference">
    <div class="container flex justify-between items-center mx-auto">
      <div>
        <a href="" class="font-bold text-5xl text-white">T.</a>
      </div>
      <div>
        <ul class="flex items-center">
          <li v-for="(item, index) in navitems" class="pl-10">
            <a class="uppercase font-normal text-xl text-white" href="{{item.title}}">{{
              item.title
            }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
