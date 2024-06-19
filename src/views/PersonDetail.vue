<template>
    <div class="person-detail">
      <button class="back-button" @click="goBack">&#x2190;</button>
      <div v-if="person">
        <h1>{{ person.name }}</h1>
        <img :src="'https://image.tmdb.org/t/p/w500' + person.profile_path" :alt="person.name" />
        <p><strong>생년월일:</strong> {{ person.birthday }}</p>
        <p><strong>출생지:</strong> {{ person.place_of_birth }}</p>
        <p><strong>약력:</strong> {{ person.biography }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
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
  const apiKey = import.meta.env.VITE_APP_API_KEY // 환경 변수 사용
  
  const fetchPerson = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${route.params.id}?api_key=${apiKey}&language=ko-KR`
      )
      person.value = response.data
    } catch (error) {
      console.error(error)
    }
  }
  
  const goBack = () => {
    router.go(-1)
  }
  
  onMounted(fetchPerson)
  </script>
  
  <style lang="scss" scoped>
  .person-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    color: #000;
  
    .back-button {
      font-size: 1.5rem;
      cursor: pointer;
      background: none;
      border: none;
      color: #007bff;
      &:hover {
        color: #0056b3;
      }
    }
  
    h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }
  
    img {
      width: 100%;
      height: auto;
      border-radius: 10px;
      margin-bottom: 20px;
    }
  
    p {
      font-size: 1.2rem;
      margin: 10px 0;
    }
  
    strong {
      font-weight: bold;
    }
  }
  </style>
  