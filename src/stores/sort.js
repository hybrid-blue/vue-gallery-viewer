import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSortStore = defineStore('sort', () => {
    const sortOptions = ref();
  
    function setSort(options) {
        sortOptions.value = options;
    }

    function getSort() {
        return sortOptions.value;
    }
  
    return { getSort, setSort, sortOptions }
});
  