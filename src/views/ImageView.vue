<script setup>
  import { watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useImageStore } from '@/stores/images';


  const route = useRoute();
  const router = useRouter();

  const imageStore = useImageStore();
  const { findImage } = imageStore;

  function getImage() {
   return  findImage(route.params.id)
  }

  let image = getImage();

  watch(route, () => {
    image = getImage();
  }, {flush: 'pre', immediate: true, deep: true});

  function goToImage(imageId) {
    router.push({name: 'image', params: { id: imageId }})
  }
</script>

<template>
  <main>
    <div class="image">
      <div class="image__viewer">
        <div class="image__control image__control-left" :class="!image.prev ? 'image__control--disable' : null"  @click="goToImage(image.prev.id)">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </div>
        <div class="image__wrapper">
          <img :src="image.url" />
          <div class="image__description">
            <div class="image__description-title">
              <h1>{{ image.name }}</h1>
              <div>{{ image.cat }}</div>
            </div>
            <div class="image__description-details">
              <div>{{ image.date.toLocaleDateString() }}</div>
            </div>
          </div>
        </div>
        <div class="image__control image__control-right" :class="!image.next ? 'image__control--disable' : null" @click="goToImage(image.next.id)">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
        </div>
      </div>
    </div>
  </main>
</template>