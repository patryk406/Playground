<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="flex items-center justify-center pt-10 mb-10 bg-gray-200">
        <RouterLink class="mr-5 mb-5 p-5 w-52 text-center font-bold uppercase border-2 border-gray-100 bg-gray-200 rounded hover:bg-gray-400" to="/">Home</RouterLink>
        <RouterLink class="mr-5 mb-5 p-5 w-52 text-center font-bold uppercase border-2 border-gray-100 bg-gray-200 rounded hover:bg-gray-400" to="/tictactoe">Tic Tac Toe Game</RouterLink>
        <RouterLink class="mr-5 mb-5 p-5 w-52 text-center font-bold uppercase border-2 border-gray-100 bg-gray-200 rounded hover:bg-gray-400" to="/hangman">Hang Man Game</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style>
</style>
