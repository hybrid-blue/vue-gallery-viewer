<script setup>
  import { watch, ref } from 'vue';
  import GalleryHeader from '../components/GalleryHeader.vue';
  import GalleryFooter from '../components/GalleryFooter.vue';
  import { useImageStore } from '@/stores/images';
  import { useSortStore } from '@/stores/sort';
  import { useFilterStore } from '@/stores/filter';

  const filteredImages = ref();

  const store = useImageStore();
  const { images } = store;

  const sortStore = useSortStore();
  const { getSort } = sortStore;

  const filterStore = useFilterStore();
  const { getFilter } = filterStore;



  function filterImages(options) {
    const { sort, order } = options;

    images.sort((a, b) => {
      console.log(order.val, sort.val)
      if (sort.val === 'date') {
        if (order.val === 'desc') {
          if (Date.parse(a.date) > Date.parse(b.date)) {
            return -1;
          } else if (Date.parse(a.date) < Date.parse(b.date)) {
            return 1
          }
          return 0
        } else {
          if (Date.parse(a.date) > Date.parse(b.date)) {
            return 1;
          } else if (Date.parse(a.date) < Date.parse(b.date)) {
            return -1
          }
          return 0
        }
      } else if (sort.val === 'title') {
        if (order.val === 'desc') {
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return -1;
          } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return 1
          }
          return 0;
        } else {
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1
          }
          return 0;
        }
      }
    });

    const filtersOptions = getFilter();

    const toggledFilters = filtersOptions.map((cat) => {
      if (cat.isToggled) {
        return cat.label;
      }
    });

    filteredImages.value = images.filter((image) => toggledFilters.includes(image.cat));
  }


  watch([sortStore, filterStore], () => {
    filterImages(getSort())
  }, {deep: true});
</script>

<template>
  <GalleryHeader />
  <main>
    <div class="gallery">
      <div class="gallery__item" v-for="(image, i) in filteredImages" :key="i" @mouseenter="image.isHovered = true" @mouseleave="image.isHovered = false">
        <router-link :to="{name: 'image', params: {id: image.id}}">
          <img class="gallery__image" :src="image.url" />
          <div class="gallery__desc-background"></div>
          <Transition name="slide-fade">
            <div class="gallery__desc" v-if="image.isHovered">
              <div class="gallery__name">{{ image.name }}</div>
              <div class="gallery__date">{{ image.date.toLocaleDateString() }}</div>
              <div class="gallery__cat">{{ image.cat }}</div>
            </div>
          </Transition>
        </router-link>

      </div>
    </div>
  </main>
  <GalleryFooter />
</template>
