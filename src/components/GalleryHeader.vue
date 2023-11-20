<script setup>
  import { ref } from 'vue';
  import { useSortStore } from '@/stores/sort';
  import { useImageStore } from '@/stores/images';
  import { useFilterStore } from '@/stores/filter';

  const store = useSortStore();
  const { setSort } = store;

  const imageStore = useImageStore();
  const { images } = imageStore;

  const filterStore = useFilterStore();
  const { setFilter } = filterStore;

  const filterList = ref([]);
  const filterOption = ref([]);

  images.forEach((image) => {
    filterList.value.push(image.cat);
  });

  filterList.value = [... new Set(filterList.value)];

  filterList.value.forEach((val) => {
    filterOption.value.push({
      label: val,
      val: val.toLowerCase(),
      isToggled: true
    });
  });

  filterOption.value.forEach(() => {

  })

  setFilter(filterOption.value);

  const sort = ref({
    label: 'Date',
    val: 'date',
    isOpen: false
  });

  const order = ref({
    label: 'Desending',
    val: 'desc',
    isOpen: false
  });

  const filter = ref({
    isOpen: false
  });

  setSort({ sort: sort.value, order: order.value });

  function setSortOption(e) {
    sort.value = {
      label: e.label,
      val: e.value,
      isOpen: false
    }

    order.value.isOpen = false;

    setSort({ sort: sort.value, order: order.value });
  }

  function setOrderOption(e) {
    order.value = {
      label: e.label,
      val: e.value,
      isOpen: false
    }

    sort.value.isOpen = false;

    setSort({ sort: sort.value, order: order.value });
  }

  function togglefilter(index) {
    filterOption.value[index].isToggled = !filterOption.value[index].isToggled;
    setFilter(filterOption.value);
  }

</script>

<template>
  <header class="header">
    <h1>My Portfolio</h1>

    <div class="header__options">
      <div class="header__option header__option-label">
        Sort by
      </div>
      <div class="header__option header__sort">
        <div class="header__option-wrapper">
          <div class="header__option-selected" @click="sort.isOpen = !sort.isOpen; order.isOpen = false; filter.isOpen = false;">
            <div class="header__option-selected-wrapper">
              {{ sort.label }}
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
            </div>
          </div>
          <div class="header__option-list" v-if="sort.isOpen">
            <ul>
              <li data-value="date" data-label="Date" @click="setSortOption({label: 'Date', value: 'date'})">Date</li>
              <li data-value="title" data-label="Title" @click="setSortOption({label: 'Title', value: 'title'})">Title</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="header__option header__order">
        <div class="header__option-wrapper">
          <div class="header__option-selected" @click="order.isOpen = !order.isOpen; sort.isOpen = false; filter.isOpen = false;">
            <div class="header__option-selected-wrapper">
              {{ order.label }}
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
            </div>
          </div>
          <div class="header__option-list header__option-list--options" v-if="order.isOpen">
            <ul>
              <li data-value="date" data-label="Date" @click="setOrderOption({label: 'Desending', value: 'desc'})">Desending</li>
              <li data-value="title" data-label="Title" @click="setOrderOption({label: 'Ascending', value: 'asc'})">Ascending</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="header__option header__filter">
        <div class="header__option-wrapper">
          <button class="header__button" @click="filter.isOpen = !filter.isOpen; sort.isOpen = false; order.isOpen = false;">
            <svg class="header__button--filter" v-if="!filter.isOpen" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>
            <svg class="header__button--close" v-if="filter.isOpen" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
          <div class="header__option-list header__option-list--checkbox" v-if="filter.isOpen">
            <ul>
              <li @click="togglefilter(i)" :class="filter.isToggled ? 'header__option--toggled' : null" v-for="(filter, i) in filterOption" :key="i">{{ filter.label }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>