<template>
  <header id="header" role="banner">
    <div class="header__inner container">
      <h1><span>Movie</span> Chart</h1>
      <div class="search">
        <input type="search" />
        <span class="icon"></span>
        <button></button>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
#header {
  width: 100%;
  height: 60px;
  background-color: #dedede;

  .header__inner {
    width: 100%;
    display: flex;
    position: relative;

    h1 {
      font-weight: 900;
      font-size: 2rem;

      span {
        color: rgb(148, 60, 60);
      }
    }

    .search {
      position: absolute;
      right: 0;
      top: 10px;

      input {
        width: 360px;
        height: 40px;
        border-radius: 50px;
        background-color: #fff;
        border: 1px solid var(--white);
      }
    }
  }
}
</style>
