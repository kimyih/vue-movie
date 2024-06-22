<template>
  <HeaderSection />
  <AsideSection @genre-selected="goToGenre" />
  <div class="genre-movies">
    <div class="movies">
      <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="goToMovieDetail(movie.id)">
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
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import AsideSection from '@/components/AsideSection.vue'
import HeaderSection from '@/components/HeaderSection.vue'

const route = useRoute()
const router = useRouter()
const genre = ref(route.params.genre)
const movies = ref([])

const apiKey = import.meta.env.VITE_APP_API_KEY

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
        with_genres: genreMap[genre.value],
        language: 'ko-KR',
        include_adult: false // 성인 콘텐츠 제외
      }
    })
    movies.value = response.data.results
  } catch (error) {
    console.error(error)
  }
}

const goToGenre = (selectedGenre) => {
  router.push({ name: 'genreMovies', params: { genre: selectedGenre } })
}

const goToMovieDetail = (id) => {
  router.push({ name: 'movieDetail', params: { id } })
}

onMounted(fetchMovies)

watch(() => route.params.genre, (newGenre) => {
  genre.value = newGenre
  fetchMovies()
})
</script>

<style lang="scss">
body {
  background-color: var(--mainBg);
  color: var(--white);
  margin: 0;
  padding: 0;
}

.genre-movies {
  width: calc(100% - 300px);
  position: relative;
  left: 300px; /* Aside와 맞추기 위해 left 위치 조정 */
  color: #ffffff;
  background-color: #181818;
  min-height: 100vh;

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: var(--white);
  }

  .movies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 30px;
    box-sizing: border-box;
    margin-top: 60px;
  }

  .movie-card {
    position: relative;
    // border-radius: 10px;
    overflow: hidden;
    text-align: center;
    cursor: pointer; /* 클릭 가능하도록 설정 */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* 애니메이션 추가 */

    &:hover {
      transform: scale(1.05); /* hover 시 커짐 효과 */
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* hover 시 그림자 효과 */

      .movie-info {
        opacity: 1;
      }
    }

    img {
      // width: 100%;
      height: 300px; /* 이미지 높이 고정 */
      object-fit: cover;
      border-radius: 5px;
    }

    .movie-info {
      width: 100%; /* movie-card와 동일한 너비 */
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(to top, rgba(0.9, 0.9, 1, 1), rgba(0, 0, 0, 0));
      color: #fff;
      // padding: 10px;
      opacity: 0;
      transition: opacity 0.3s ease;
      height: 130px;

      h3 {
        font-size: 1.2rem;
        margin: 10px 0;
      }

      p {
        font-size: 1rem;
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