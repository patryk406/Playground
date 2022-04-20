<script setup>
import { ref } from "vue";
const sudokuNumbers = ref(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const activeNumber = ref("");
const errors = ref(0);
const board = ref([
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
]);

function validateCell(colKey, cellKey, value) {
  let checkTables = { a: false, b: false };
  for (let a = 0; a < board.value.length; a++) {
    if (!checkTables.a && !checkTables.b) {
      if (board.value[colKey][a] === value) {
        checkTables.a = true;
      } else if (board.value[a][cellKey] === value) {
        checkTables.b = true;
      }
    }
  }
  if (!checkTables.a && !checkTables.b) {
    board.value[colKey][cellKey] = value;
  } else errors.value += 1;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const arrangeBoard = () => {
  for (let a = 0; a < 18; a++) {
    let first = getRandomInt(0, 8);
    let second = getRandomInt(0, 8);
    let dummyCell = getRandomInt(1, 9);
    validateCell(first, second, dummyCell);
  }
  errors.value = 0;
};
const resetBoard = () => {
  for (let a = 0; a < board.value.length; a++) {
    for (let b = 0; b < board.value.length; b++) {
      board.value[a][b] = "-";
    }
  }
  errors.value = 0;
  activeNumber.value = "";
  arrangeBoard();
};
</script>

<template>
  <main class="pt-8 text-center min-h-screen">
    <h1 class="mb8 text-3xl font-bold uppercase">Sudoku</h1>
    <h4>Errors: {{ errors }}</h4>
    <div class="board flex items-center justify-center mt-10">
      <div
        class="row flex flex-col"
        v-for="(col, colKey) in board"
        :key="colKey"
      >
        <div
          class="col w-8 h-8 m-1 bg-gray-100 cursor-pointer"
          v-for="(cell, cellKey) in col"
          :key="cellKey"
          @click="validateCell(colKey, cellKey, activeNumber)"
        >
          {{ cell === "-" ? "" : cell }}
        </div>
      </div>
    </div>

    <div class="numbers flex items-center justify-center flex-col mt-20">
      <h3 class="text-2xl font-bold">Chose number</h3>
      <div class="numbers-container flex">
        <span
          :class="activeNumber === number ? 'active' : ''"
          class="bg-gray-100 p-2 mr-2 border border-1-solid border-gray-100 cursor-pointer"
          v-for="(number, id) in sudokuNumbers"
          :key="id"
          @click="activeNumber = number"
          >{{ number }}</span
        >
      </div>
      <button @click="resetBoard">Reset Board</button>
    </div>
  </main>
</template>

<style scoped>
.active {
  background-color: #616161;
  color: white;
}
</style>
