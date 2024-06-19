<template>
  <aside id="aside">
    <div class="logo">
      <h2>🎬 Movie Chart</h2>
    </div>
    <div class="menu">
      <ul>
        <li>메뉴1</li>
        <li>메뉴2</li>
        <li>메뉴3</li>
      </ul>
    </div>
    <div class="genres">
      <h3>장르</h3>
      <div class="genre-tags">
        <span v-for="genre in genres" :key="genre" class="genre-tag">{{ genre }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
const genres = [
  "SF", "TV 영화", "가족", "공포", "다큐멘터리", "드라마", "로맨스", 
  "모험", "미스터리", "범죄", "서부", "스릴러", "애니메이션", 
  "액션", "역사", "음악", "전쟁", "코미디", "판타지"
]
</script>

<style lang="scss">
#aside {
  position: fixed;
  left: 0;
  top: 0;
  width: 260px;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden; /* 숨겨진 오버플로우 추가 */

  .logo {
    text-align: center;
    margin-bottom: 20px;
    h2 {
      font-size: 1.5rem;
      margin: 0;
    }
  }

  .menu {
    flex-grow: 1;
    overflow-y: auto; /* 스크롤 추가 */
    margin-bottom: 20px;
    ul {
      list-style: none;
      padding: 0;
      li {
        padding: 10px 0;
        cursor: pointer;
        &:hover {
          background-color: #e5e5e5;
        }
      }
    }
  }

  .genres {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }

    .genre-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .genre-tag {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 5px 10px;
        font-size: 0.9rem;
        cursor: pointer;
        &:hover {
          background-color: #e0e0e0;
        }
      }
    }
  }
}
</style>
