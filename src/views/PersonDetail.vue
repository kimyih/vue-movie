<template>
  <HeaderSection />
  <div class="person_wrap">
    <div class="person-detail">
      <button class="back-button" @click="goBack">&#x2190;</button>
      <div v-if="person">
        <div class="header">
          <img class="profile" :src="'https://image.tmdb.org/t/p/w500' + person.profile_path" :alt="person.name" />
          <div class="info">
            <h1>{{ person.name }}</h1>
            <p><strong>생년월일:</strong> {{ person.birthday }}</p>
            <p><strong>출생지:</strong> {{ person.place_of_birth }}</p>
            <p><strong>직업:</strong> {{ person.known_for_department }}</p>
            <p><strong>약력:</strong> {{ person.biography }}</p>
            <div v-if="socialLinks.length" class="social-links">
              <h3>Follow on:</h3>
              <div class="links">
                <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank">
                  <i :class="link.iconClass"></i> {{ link.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="known-for">
          <h2>작품</h2>
          <div class="known-for-list">
            <div v-for="movie in knownFor" :key="movie.id" class="known-for-item" @click="goToMovieDetail(movie.id)">
              <img :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '/path/to/default.jpg'" :alt="movie.title" />
              <p>{{ movie.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
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
const person = ref(null)
const knownFor = ref([])
const socialLinks = ref([])
const apiKey = import.meta.env.VITE_APP_API_KEY

const fetchPerson = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${route.params.id}?api_key=${apiKey}&language=ko-KR`
    )
    person.value = response.data

    const knownForResponse = await axios.get(
      `https://api.themoviedb.org/3/person/${route.params.id}/combined_credits?api_key=${apiKey}&language=ko-KR`
    )
    knownFor.value = knownForResponse.data.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 10)

    const externalIdsResponse = await axios.get(
      `https://api.themoviedb.org/3/person/${route.params.id}/external_ids?api_key=${apiKey}`
    )
    const externalIds = externalIdsResponse.data
    socialLinks.value = [
      { name: 'Twitter', url: `https://twitter.com/${externalIds.twitter_id}`, iconClass: 'fab fa-twitter' },
      { name: 'Instagram', url: `https://instagram.com/${externalIds.instagram_id}`, iconClass: 'fab fa-instagram' },
      { name: 'Facebook', url: `https://facebook.com/${externalIds.facebook_id}`, iconClass: 'fab fa-facebook' }
    ].filter(link => link.url)
  } catch (error) {
    console.error(error)
  }
}

const goBack = () => {
  router.go(-1)
}

const goToMovieDetail = (id) => {
  router.push({ name: 'movieDetail', params: { id } })
}

onMounted(fetchPerson)
</script>

<style lang="scss" scoped>

.person_wrap {
  width: 100%;
  height: 100vh;
  background-color: #000; /* 배경색 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.person-detail {
  max-width: 1200px;
  width: 100%;
  background-color: #1f1f1f; /* 어두운 배경 */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #fff; /* 흰색 텍스트 */
  padding: 40px;
  box-sizing: border-box;

  .back-button {
    font-size: 1.5rem;
    cursor: pointer;
    background: none;
    border: none;
    color: #007bff;
    margin-bottom: 20px;
    &:hover {
      color: #0056b3;
    }
  }

  .header {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    margin-bottom: 30px;

    .profile {
      width: 200px;
      height: auto;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .info {
      flex: 1;

      h1 {
        font-size: 2.5rem;
        margin-bottom: 10px;
      }

      p {
        font-size: 1.2rem;
        margin: 10px 0;
      }

      strong {
        font-weight: bold;
      }

      .social-links {
        margin-top: 20px;

        h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .links {
          display: flex;
          gap: 15px;

          a {
            color: #007bff;
            text-decoration: none;
            font-size: 1.2rem;
            display: flex;
            align-items: center;

            &:hover {
              color: #0056b3;
            }

            i {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }

  .known-for {
    margin-top: 30px;

    h2 {
      font-size: 2rem;
      margin-bottom: 20px;
    }

    .known-for-list {
      display: flex;
      gap: 20px;
      overflow-x: auto;
      padding-bottom: 10px;

      .known-for-item {
        min-width: 150px;
        text-align: center;
        cursor: pointer; // 클릭 가능하도록 설정

        img {
          width: 150px; // 고정 크기 설정
          height: 225px; // 고정 크기 설정
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 10px;
        }

        p {
          font-size: 1rem;
          margin: 0;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
}
</style>
