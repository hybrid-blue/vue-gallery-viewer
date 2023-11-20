import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', () => {
    const filter = ref();
  
    function setFilter(options) {
        filter.value = options;
    }

    function getFilter() {
        return filter.value;
    }
  
    return { getFilter, setFilter, filter }
});
  