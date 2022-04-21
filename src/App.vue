<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="navbar">
      <RouterLink class="nav_link" to="/">Home</RouterLink>
      <RouterLink class="nav_link" to="/tictactoe">Tic Tac Toe Game</RouterLink>
      <RouterLink class="nav_link" to="/hangman">Hang Man Game</RouterLink>
      <RouterLink class="nav_link" to="/sudoku">Sudoku Game</RouterLink>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  background-color: rgb(229 231 235);
  padding-bottom: 20px;
  .nav_link {
    padding: 10px;
    margin: 10px;
    text-decoration: none;
    background-color: rgb(80, 111, 165);
    width: 200px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
    border-radius: 8px;
    &:hover,
    &.router-link-active {
      background-color: rgb(45, 87, 151);
    }
  }
}

@media screen and(max-width:600px) {
  .navbar {
    flex-direction: column;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .nav_link {
      font-size: 18px;
      padding: 5px;
      margin: 5px;
    }
  }
}
</style>
