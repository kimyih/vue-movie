<template>
  <aside id="aside">
    <div class="logo">
      <h2>🎬 Movie Chart</h2>
    </div>
    <div class="menu">
      <ul>
        <li v-for="genre in genres" :key="genre" class="menu-item" @click="goToGenre(genre)">
          {{ genre }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const genres = [
  "Home","SF", "TV 영화", "가족", "공포", "다큐멘터리", "드라마", "로맨스", 
  "모험", "미스터리", "범죄", "서부", "스릴러", "애니메이션", 
  "액션", "역사", "음악", "전쟁", "코미디", "판타지"
]

const router = useRouter()

const goToGenre = (genre) => {
  router.push({ name: 'genreMovies', params: { genre } })
}
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'); /* Font Awesome */

#aside {
  position: fixed;
  left: 0;
  top: 0;
  width: 260px;
  height: 100vh;
  background-color: #1f1f1f; /* 어두운 배경색 설정 */
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 위에서부터 시작 */
  overflow: hidden; /* 숨겨진 오버플로우 추가 */
  color: #fff; /* 텍스트 색상 흰색으로 설정 */
  z-index: 1;

  .logo {
    text-align: center;
    margin-bottom: 20px;
    h2 {
      font-size: 1.5rem;
      margin: 0;
    }
  }

  .menu {
    flex-grow: 1; /* 나머지 공간을 채우도록 설정 */
    overflow-y: auto; /* 스크롤 추가 */
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        cursor: pointer;
        color: #bfbfbf; /* 텍스트 색상 설정 */
        transition: background-color 0.3s ease, color 0.3s ease;
        &:hover {
          background-color: #333; /* 호버 시 배경색 어둡게 설정 */
          color: #fff; /* 호버 시 텍스트 색상 흰색으로 설정 */
        }
        i {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
