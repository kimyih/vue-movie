<template>
    <div class="movie-detail">
      <h1>{{ movie.title }}</h1>
      <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
      <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
      <p><strong>Rating:</strong> {{ movie.vote_average }} / 10</p>
      <p><strong>Overview:</strong> {{ movie.overview }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const movie = ref({})
  
  const apiKey = '84e04d04d1d383b99ab8e6457dc398c6'
  
  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${apiKey}&language=ko-KR`
      )
      movie.value = response.data
    } catch (error) {
      console.error(error)
    }
  }
  
  onMounted(fetchMovie)
  </script>
  
  <style scoped>
  .movie-detail {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .movie-detail img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .movie-detail p {
    font-size: 1.2rem;
    margin: 1rem 0;
  }
  </style>
  