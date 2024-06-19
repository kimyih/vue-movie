<template>
    <AsideSection />
    <div class="genre-movies">
      <h1>{{ genre }} Movies</h1>
      <div class="movies">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
            <div class="rating">{{ movie.vote_average }} / 10</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
import AsideSection from '@/components/AsideSection.vue';
  
  const route = useRoute()
  const genre = route.params.genre
  const movies = ref([])
  
  const apiKey = import.meta.env.VITE_APP_API_KEY // 환경 변수 사용
  
  const genreMap = {
    "SF": 878,
    "TV 영화": 10770,
    "가족": 10751,
    "공포": 27,
    "다큐멘터리": 99,
    "드라마": 18,
    "로맨스": 10749,
    "모험": 12,
    "미스터리": 9648,
    "범죄": 80,
    "서부": 37,
    "스릴러": 53,
    "애니메이션": 16,
    "액션": 28,
    "역사": 36,
    "음악": 10402,
    "전쟁": 10752,
    "코미디": 35,
    "판타지": 14
  }
  
  const fetchMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: apiKey,
          with_genres: genreMap[genre],
          language: 'ko-KR'
        }
      })
      movies.value = response.data.results
    } catch (error) {
      console.error(error)
    }
  }
  
  onMounted(fetchMovies)
  </script>
  
  <style lang="scss">
  .genre-movies {
    padding: 20px;
    color: #000;
    background-color: #f5f5f5;
    
    h1 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
  
    .movies {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
  
    .movie-card {
      width: 200px;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
      img {
        width: 100%;
        height: auto;
      }
  
      .movie-info {
        padding: 10px;
        
        h3 {
          font-size: 1.2rem;
          margin: 10px 0;
          color: #333;
        }
        
        p {
          font-size: 1rem;
          color: #666;
        }
        
        .rating {
          margin-top: 10px;
          font-size: 1rem;
          color: #ff5656;
        }
      }
    }
  }
  </style>
  