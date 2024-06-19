<template>
  <header id="header" role="banner">
    <div class="header__inner container">
      <div class="logo">
        <h1></h1>
      </div>
      <div class="search">
        <input type="search" placeholder="검색어를 입력해주세요!" />
        <button class="search-icon">
          <i class="fas fa-search"></i> <!-- Font Awesome 사용 -->
        </button>
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
  background-color: #66666690;
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

      input {
        width: 300px;
        height: 40px;
        border-radius: 20px;
        border: none;
        padding: 0 15px;
        font-size: 1rem;
        margin-right: 10px;
      }

      .search-icon {
        background-color: #007bff;
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
    }
  }
}
</style>
