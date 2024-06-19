import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'
import PersonDetail from '@/views/PersonDetail.vue'
import GenreMovies from '@/views/GenreMovies.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/movie/:id',
    name: 'movieDetail',
    component: DetailView,
  }, {
    path: '/person/:id', // 출연진 상세 정보 라우트 추가
    name: 'personDetail',
    component: PersonDetail
  },
  {
    path: '/genre/:genre', // 장르 페이지 라우트 추가
    name: 'genreMovies',
    component: GenreMovies
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL), // 환경 변수 사용
  routes
})

export default router
