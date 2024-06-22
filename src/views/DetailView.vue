<template>
  <div class="movie-detail" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="overlay">
      <div class="header">
        <button class="back-button" @click="goBack">&#x2190;</button> <!-- 뒤로가기 버튼 추가 -->
        <img class="poster" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
        <div class="info">
          <h1>{{ movie.title }}</h1>
          <p class="release-date"><strong>개봉일:</strong> {{ movie.release_date }}</p>
          <p class="rating"><strong>평점:</strong> {{ movie.vote_average }} / 10</p>
          <p class="overview"><strong>개요:</strong> {{ movie.overview }}</p>
          <button class="trailer-button" @click="playTrailer">Play Trailer</button>
        </div>
      </div>
      <div class="cast-and-crew">
        <h2>주요 출연진</h2>
        <div class="cast-list">
          <div class="cast-member" v-for="actor in cast" :key="actor.cast_id" @click="goToPersonDetail(actor.id)">
            <img class="cast-photo" :src="'https://image.tmdb.org/t/p/w500' + actor.profile_path" :alt="actor.name" />
            <p class="cast-name">{{ actor.name }}</p>
            <p class="cast-character">{{ actor.character }}</p>
          </div>
        </div>
        <div class="crew">
          <h2>Director</h2>
          <p>{{ director.name }}</p>
        </div>
      </div>
      <div v-if="showModal" class="modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <span class="close" @click="closeModal">&times;</span>
          <iframe
            :src="trailerUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const movie = ref({})
const cast = ref([])
const director = ref({})
const trailerUrl = ref('')
const showModal = ref(false)
const apiKey = '84e04d04d1d383b99ab8e6457dc398c6'

const backgroundImage = ref('')

const fetchMovie = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${apiKey}&language=ko-KR`
    )
    movie.value = response.data
    backgroundImage.value = `https://image.tmdb.org/t/p/original${movie.value.poster_path}`
  } catch (error) {
    console.error(error)
  }
}

const fetchCredits = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}/credits?api_key=${apiKey}&language=ko-KR`
    )
    cast.value = response.data.cast
    director.value = response.data.crew.find(member => member.job === 'Director')
  } catch (error) {
    console.error(error)
  }
}

const fetchTrailer = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}/videos?api_key=${apiKey}&language=ko-KR`
    )
    const trailers = response.data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube')
    if (trailers.length > 0) {
      trailerUrl.value = `https://www.youtube.com/embed/${trailers[0].key}`
    }
  } catch (error) {
    console.error(error)
  }
}

const playTrailer = async () => {
  if (!trailerUrl.value) {
    await fetchTrailer()
  }
  if (!trailerUrl.value) {
    alert('트레일러 영상이 없습니다.')
    return
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  trailerUrl.value = ''
}

const goBack = () => {
  router.go(-1)
}

const goToPersonDetail = (id) => {
  router.push({ name: 'personDetail', params: { id } }) // 출연진 상세 페이지로 이동
}

onMounted(() => {
  fetchMovie()
  fetchCredits()
})
</script>

<style lang="scss" scoped>
.movie-detail {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .overlay {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    background-color: rgba(245, 245, 245, 0.9);
    border-radius: 10px;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: var(--fontG);

    .header {
      display: flex;
      align-items: flex-start;
      padding: 30px;

      .back-button {
        font-size: 1.5rem;
        margin-right: 20px;
        cursor: pointer;
        background: none;
        border: none;
        color: #007bff;
        &:hover {
          color: #0056b3;
        }
      }

      .poster {
        width: 300px;
        height: auto;
        border-radius: 10px;
        margin-right: 20px;
      }

      .info {
        flex: 1;

        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .release-date,
        .rating {
          font-size: 1.2rem;
          margin: 10px 0;
        }

        .overview {
          font-size: 1.1rem;
          margin: 20px 0;
        }

        .trailer-button {
          padding: 10px 20px;
          font-size: 1rem;
          color: #fff;
          background-color: #ff3700;
          border: none;
          border-radius: 50px;
          cursor: pointer;

          &:hover {
            background-color: #b33900;
          }
        }
      }
    }

    .cast-and-crew {
      margin-top: 30px;
      padding: 30px;
      background-color: #fff;

      h2 {
        font-size: 1.8rem;
        margin-bottom: 10px;
      }

      .cast-list {
        display: flex;
        overflow-x: auto;
        padding-bottom: 10px;
        margin-bottom: 20px;

        .cast-member {
          min-width: 150px;
          text-align: center;
          margin-right: 20px;
          cursor: pointer; // 출연진 카드 클릭 가능하도록 설정

          .cast-photo {
            width: 100%;
            height: auto;
            border-radius: 10px;
            // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .cast-name {
            font-size: 1rem;
            font-weight: bold;
            margin-top: 10px;
          }

          .cast-character {
            font-size: 0.9rem;
            color: #666;
          }
        }
      }
    }

    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 1000;

      .modal-content {
        position: relative;
        width: 80%;
        max-width: 900px;
        background-color: #000;
        padding: 20px;
        border-radius: 10px;
        // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 2rem;
          color: #fff;
          cursor: pointer;
        }

        iframe {
          width: 100%;
          height: 500px;
        }
      }
    }
  }
}
</style>
