import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const images = ref();

  images.value = [
    {
      id: 1,
      url: 'https://picsum.photos/id/1/300/300',
      name: 'Lorem',
      date: new Date(2023, 10, 13),
      cat: 'Illustration'
    },
    {
      id: 2,
      url: 'https://picsum.photos/id/2/300/300',
      name: 'Ipsum',
      date: new Date(2023, 10, 12),
      cat: 'Design'
    },
    {
      id: 3,
      url: 'https://picsum.photos/id/3/300/300',
      name: 'Trees',
      date: new Date(2023, 10, 11),
      cat: 'Illustration'
    },
    {
      id: 4,
      url: 'https://picsum.photos/id/4/300/300',
      name: 'Anime',
      date: new Date(2023, 10, 14),
      cat: 'Design'
    },
    {
      id: 5,
      url: 'https://picsum.photos/id/5/300/300',
      name: 'Manga',
      date: new Date(2023, 10, 16),
      cat: 'Illustration'
    },
    {
      id: 6,
      url: 'https://picsum.photos/id/6/300/300',
      name: 'Comic',
      date: new Date(2023, 10, 15),
      cat: 'Comic'
    },
    {
      id: 7,
      url: 'https://picsum.photos/id/7/300/300',
      name: 'Artwork',
      date: new Date(2023, 10, 19),
      cat: 'Comic'
    },
    {
      id: 8,
      url: 'https://picsum.photos/id/8/300/300',
      name: 'Painting',
      date: new Date(2023, 10, 17),
      cat: 'Illustration'
    },
    {
      id: 9,
      url: 'https://picsum.photos/id/9/300/300',
      name: 'Moon over the Bridge',
      date: new Date(2023, 10, 20),
      cat: 'Comic'
    },
    {
      id: 10,
      url: 'https://picsum.photos/id/10/300/300',
      name: 'There and back again',
      date: new Date(2023, 10, 22),
      cat: 'Comic'
    },
    {
      id: 11,
      url: 'https://picsum.photos/id/11/300/300',
      name: 'Hololive fanart',
      date: new Date(2023, 10, 21),
      cat: 'Design'
    },
    {
      id: 12,
      url: 'https://picsum.photos/id/12/300/300',
      name: 'Cardboard man',
      date: new Date(2023, 10, 23),
      cat: 'Illustration'
    }
  ];

  images.value.forEach((image, index) => {
    if (index === 0) {
      images.value[index].next = {
        id: images.value[index + 1].id
      }
    } else if ((images.value.length - 1) === index) {
      images.value[index].prev = {
        id: images.value[index - 1].id
      }
    } else {
      images.value[index].next = {
        id: images.value[index + 1].id
      }
      images.value[index].prev = {
        id: images.value[index - 1].id
      }
    }
  });

  function findImage(id) {
    console.log(images.value, id);
    return images.value.filter((image) => image.id === parseInt(id))[0];
  }

  return { images, findImage }
})
