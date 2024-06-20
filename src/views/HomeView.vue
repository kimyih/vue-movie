<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import HeaderSection from '@/components/HeaderSection.vue'
import AsideSection from '@/components/AsideSection.vue'
import { useRouter } from 'vue-router'

// Swiper.js와 필요한 모듈을 가져옵니다.
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper'

// 최신, 인기, 높은 평점 영화 데이터를 저장할 배열을 정의합니다.
const latestMovies = ref([])
const popularMovies = ref([])
const topRatedMovies = ref([])
const currentCategoryMovies = ref([])

// TMDb API 키를 설정합니다. 본인의 API 키를 사용하세요.
const apiKey = '84e04d04d1d383b99ab8e6457dc398c6'

// TMDb API에서 영화 데이터를 가져오는 비동기 함수를 정의합니다.
const fetchMovies = async () => {
  try {
    // 최신 영화 데이터를 가져옵니다.
    const latestResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=1`
    )
    latestMovies.value = latestResponse.data.results.slice(0, 10)

    // 인기 영화 데이터를 가져옵니다.
    const popularResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`
    )
    popularMovies.value = popularResponse.data.results.slice(0, 10)

    // 높은 평점을 받은 영화 데이터를 가져옵니다.
    const topRatedResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=1`
    )
    topRatedMovies.value = topRatedResponse.data.results.slice(0, 10)

    // 기본 카테고리를 'popular'로 설정합니다.
    currentCategoryMovies.value = popularMovies.value
  } catch (error) {
    console.error(error)
  }
}

// 컴포넌트가 마운트될 때 영화 데이터를 가져옵니다.
onMounted(fetchMovies)

// 카테고리 변경 함수
const changeCategory = (category) => {
  if (category === 'popular') {
    currentCategoryMovies.value = popularMovies.value
  } else if (category === 'topRated') {
    currentCategoryMovies.value = topRatedMovies.value
  } else if (category === 'latest') {
    currentCategoryMovies.value = latestMovies.value
  }
}

// Router 사용 설정
const router = useRouter()

// 영화 상세 정보 페이지로 이동하는 함수
const goToMovieDetail = (id) => {
  router.push({ name: 'movieDetail', params: { id } })
}
</script>

<template>
  <AsideSection />
  <HeaderSection />
  <main id="main" role="main">
    <div class="container">
      <!-- 최신 영화 섹션 -->
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
          <!-- 최신 영화 데이터를 반복하여 큰 배너 형식으로 표시합니다. -->
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
      <!-- 카테고리별 영화 섹션 -->
      <section class="category-section">
        <h2>Browse by category</h2>
        <div class="category-buttons">
          <button @click="changeCategory('popular')">Popular</button>
          <button @click="changeCategory('topRated')">Top Rated</button>
          <button @click="changeCategory('latest')">Latest</button>
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

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

#main {
  min-height: 90vh;
  margin-left: 260px;
  position: relative;
  padding: 20px;
  background-color: #181818; // 어두운 배경색 설정
  color: #fff; // 텍스트 색상 흰색으로 설정

  .container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .now-showing {
      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #fff; // 텍스트 색상 흰색으로 설정
      }
      .swiper-container {
        width: 100%;
        height: 450px;
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer; /* 클릭 가능한 영화 카드 */
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
        color: #fff; // 텍스트 색상 흰색으로 설정
      }
      .category-buttons {
        margin-bottom: 1.5rem;
        display: flex;
        button {
          margin-right: 1rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          border-radius: 50px;
          background-color: #333;
          color: #ff5656;
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
          scrollbar-width: none; /* Firefox에서 스크롤바를 숨깁니다. */
          -ms-overflow-style: none; /* Internet Explorer 10+에서 스크롤바를 숨깁니다. */
          &::-webkit-scrollbar {
            display: none; /* Webkit 기반 브라우저에서 스크롤바를 숨깁니다. */
          }
          .movie-card {
            position: relative;
            min-width: 200px;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer; /* 클릭 가능한 영화 카드 */
            background-color: #333; // 카드 배경색 어둡게 설정
            transition: transform 0.3s ease, box-shadow 0.3s ease; /* 트랜지션 추가 */
            
            img {
              width: 100%;
              height: 300px;
              transition: transform 0.3s ease; /* 트랜지션 추가 */
            }
            .movie-info {
              padding: 1rem;
              height: 130px;
              background: linear-gradient(to top, rgba(0.7, 0.7, 0.9, 0.9), rgba(0, 0, 0, 0));
              position: absolute; /* 절대 위치 설정 */
              bottom: 0;
              left: 0;
              right: 0;
              transition: transform 0.3s ease, opacity 0.3s ease; /* 트랜지션 추가 */
              transform: translateY(100%); /* 기본적으로 숨김 */
              opacity: 0; /* 기본적으로 투명 */
              h3 {
                margin: 0;
                font-size: 1.2rem;
                color: #fff; // 텍스트 색상 흰색으로 설정
              }
              p {
                margin: 0.5rem 0 0;
                color: #bbb; // 텍스트 색상 밝은 회색으로 설정
              }
            }
            
            &:hover {
              transform: scale(1.05); /* 호버 시 확대 */
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* 호버 시 그림자 효과 추가 */

              img {
                transform: scale(1.1); /* 호버 시 이미지 확대 */
              }

              .movie-info {
                transform: translateY(0); /* 호버 시 정보 표시 */
                opacity: 1; /* 호버 시 투명도 제거 */
              }
            }
          }
        }
      }
    }
  }
}

</style>