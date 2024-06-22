<template>
  <AsideSection @genre-selected="goToGenre" />
  <HeaderSection />
  <main id="main" role="main">
    <div class="container">
      <section class="now-showing">
        <h2>Now Showing</h2>
        <Swiper
          :modules="[Autoplay, Pagination, Navigation]"
          :autoplay="{ delay: 3000 }"
          :loop="true"
          :pagination="{ clickable: true }"
          :navigation="true"
          class="swiper-container"
        >
          <SwiperSlide v-for="movie in latestMovies" :key="movie.id" @click="goToMovieDetail(movie.id)">
            <div class="banner-card">
              <img
                :src="'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path"
                :alt="movie.title"
              />
              <div class="banner-info">
                <h3>{{ movie.title }}</h3>
                <p>{{ movie.release_date }}</p>
                <p>{{ movie.vote_average }} / 10</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section class="category-section">
        <h2>Browse by category</h2>
        <div class="category-buttons">
          <button @click="changeCategory('popular')" :class="{ active: activeCategory === 'popular' }">Popular</button>
          <button @click="changeCategory('topRated')" :class="{ active: activeCategory === 'topRated' }">Top Rated</button>
          <button @click="changeCategory('latest')" :class="{ active: activeCategory === 'latest' }">Latest</button>
        </div>
        <div class="category">
          <div class="movie-list">
            <div class="movie-card" v-for="movie in currentCategoryMovies" :key="movie.id" @click="goToMovieDetail(movie.id)">
              <img
                :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                :alt="movie.title"
              />
              <div class="movie-info">
                <h3>{{ movie.title }}</h3>
                <p>{{ movie.release_date }}</p>
                <p>{{ movie.vote_average }} / 10</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import HeaderSection from '@/components/HeaderSection.vue'
import AsideSection from '@/components/AsideSection.vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper'

const latestMovies = ref([])
const popularMovies = ref([])
const topRatedMovies = ref([])
const currentCategoryMovies = ref([])
const activeCategory = ref('popular')
const apiKey = '84e04d04d1d383b99ab8e6457dc398c6'

const fetchMovies = async () => {
  try {
    const latestResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=1`
    )
    latestMovies.value = latestResponse.data.results.slice(0, 10)

    const popularResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`
    )
    popularMovies.value = popularResponse.data.results.slice(0, 10)

    const topRatedResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=1`
    )
    topRatedMovies.value = topRatedResponse.data.results.slice(0, 10)

    currentCategoryMovies.value = popularMovies.value
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchMovies)

const changeCategory = (category) => {
  activeCategory.value = category
  if (category === 'popular') {
    currentCategoryMovies.value = popularMovies.value
  } else if (category === 'topRated') {
    currentCategoryMovies.value = topRatedMovies.value
  } else if (category === 'latest') {
    currentCategoryMovies.value = latestMovies.value
  }
}

const router = useRouter()

const goToMovieDetail = (id) => {
  router.push({ name: 'movieDetail', params: { id } })
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

body {
  font-family: 'Noto Sans', sans-serif;
  background-color: var(--mainBg);
  color: var(--white);
  margin: 0;
  padding: 0;
}

#main {
  min-height: 90vh;
  margin-left: 300px;
  position: relative;
  padding: 20px;
  background-color: #181818;
  color: #fff;

  .container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .now-showing {
      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #fff;
      }
      .swiper-container {
        width: 100%;
        height: 450px;
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .banner-card {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .banner-info {
            position: absolute;
            bottom: 0px;
            width: 100%;
            padding: 1rem;
            background: linear-gradient(to top, rgba(0.7, 0.7, 0.9, 0.9), rgba(0, 0, 0, 0));
            color: #fff;
            height: 100px;
            h3 {
              margin: 0;
              font-size: 1.5rem;
            }
            p {
              margin: 0.5rem 0 0;
              color: #fff;
            }
          }
        }
      }
    }

    .category-section {
      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #fff;
      }
      .category-buttons {
        margin-bottom: 1.5rem;
        display: flex;
        button {
          font-family: 'Noto Sans', sans-serif;
          margin-right: 1rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          border-radius: 50px;
          background-color: #333;
          color: #ff5656;
          transition: background-color 0.3s ease, color 0.3s ease;

          &.active {
            background-color: #ff5656;
            color: #fff;
          }

          &:hover {
            background-color: #ff5656;
            color: #fff;
          }
        }
      }
      .category {
        .movie-list {
          display: flex;
          gap: 1rem;
          overflow-x: scroll;
          scrollbar-width: none;
          -ms-overflow-style: none;
          &::-webkit-scrollbar {
            display: none;
          }
          .movie-card {
            position: relative;
            min-width: 200px;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            background-color: #333;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            
            img {
              width: 100%;
              height: 300px;
              transition: transform 0.3s ease;
            }
            .movie-info {
              padding: 1rem;
              height: 90px;
              background: linear-gradient(to top, rgba(0.7, 0.7, 0.9, 0.9), rgba(0, 0, 0, 0));
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              transition: transform 0.3s ease, opacity 0.3s ease;
              transform: translateY(100%);
              opacity: 0;
              h3 {
                margin: 0;
                font-size: 1.2rem;
                color: #fff;
              }
              p {
                margin: 0.5rem 0 0;
                color: #bbb;
              }
            }
            
            &:hover {
              transform: scale(1.05);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);

              img {
                transform: scale(1.1);
              }

              .movie-info {
                transform: translateY(0);
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
