<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const searchQuery = ref('')
const searchResults = ref([])
const apiKey = '84e04d04d1d383b99ab8e6457dc398c6'
const router = useRouter()

const performSearch = async () => {
  if (searchQuery.value.trim() === '') {
    searchResults.value = []
    return
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: apiKey,
        query: searchQuery.value,
        language: 'ko-KR'
      }
    })
    searchResults.value = response.data.results
  } catch (error) {
    console.error(error)
    searchResults.value = []
  }
}

const goToMovieDetail = (id) => {
  router.push({ name: 'movieDetail', params: { id } })
  searchResults.value = [] // 검색 결과 초기화
}
</script>

<template>
  <header id="header" role="banner">
    <div class="header__inner container">
      <div class="logo">
        <h1></h1>
      </div>
      <div class="search">
        <input type="search" v-model="searchQuery" placeholder="검색어를 입력해주세요!" @input="performSearch" />
        <button class="search-icon" @click="performSearch">
          <i class="fas fa-search"></i>
        </button>
        <div class="search-results" v-if="searchResults.length">
          <ul>
            <li v-for="result in searchResults" :key="result.id" @click="goToMovieDetail(result.id)">
              {{ result.title }} ({{ result.release_date }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

#header {
  position: fixed;
  top: 0;
  left: 300px; /* aside와 맞추기 위해 left 위치 조정 */
  right: 0;
  height: 60px;
  padding: 10px 20px;
  background-color: #181818; /* 어두운 배경색 설정 */
  color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  .header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .logo {
      h1 {
        font-weight: 900;
        font-size: 1.5rem;
        color: #fff;
        margin: 0;
      }
    }

    .search {
      display: flex;
      align-items: center;
      position: relative;

      input {
        width: 300px;
        height: 40px;
        border-radius: 20px;
        border: none;
        padding: 0 15px;
        font-size: 1rem;
        margin-right: 10px;
        background-color: #333; /* 입력 필드 배경색 어둡게 설정 */
        color: #fff; /* 입력 필드 텍스트 색상 흰색으로 설정 */
      }

      .search-icon {
        background-color: #007bff00;
        border: none;
        color: #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #0056b3;
        }
        
        i {
          font-size: 1.2rem;
        }
      }

      .search-results {
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        background-color: #333;
        color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1001;

        ul {
          list-style: none;
          margin: 0;
          padding: 10px;
        }

        li {
          padding: 10px;
          cursor: pointer;
          &:hover {
            background-color: #444;
          }
        }
      }
    }
  }
}
</style>
