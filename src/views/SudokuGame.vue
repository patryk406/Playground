<script setup>
import {ref} from "vue";
const sudokuNumbers = ref(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const activeNumber = ref("");
const errors = ref(0);
const showPopup = ref(false);
const finalMessage = ref('Congratulations! You won! 😃');
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
const checkWinner=()=>{
  const tempStr = board.value.toString()
  if (tempStr.includes('-')){
    return
  }
  showPopup.value=true;
}
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
  if (!checkTables.a && !checkTables.b && value !=='') {
    board.value[colKey][cellKey] = value;
  } else if (value !== '') {
    errors.value += 1
  };
  checkWinner();
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return `${Math.floor(Math.random() * (max - min)) + min}`;
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
arrangeBoard();
</script>

<template>
  <main class="sudoku_container pt-8 text-center">
    <h1 class="mb-7 text-3xl font-bold uppercase">Sudoku</h1>
    <h4  class="font-bold">Errors: <span class="text-red-800 font-bold text-xl ml-1">{{ errors }}</span></h4>
    <div class="board flex items-center justify-center mt-10">
      <div
        class="row_col row flex flex-col"
        v-for="(col, colKey) in board"
        :key="colKey"
      >
        <div
          class="sudoku_col text-center bg-gray-100 font-bold col w-10 h-10 cursor-pointer hover:bg-gray-400"
          :class="cell !=='' && cell !=='-' ? 'bg-gray-400' : ''"
          v-for="(cell, cellKey) in col"
          :key="cellKey"
          @click="validateCell(colKey, cellKey, activeNumber)"
        >
          {{ cell === "-" ? "" : cell }}
        </div>
      </div>
    </div>

    <div class="numbers flex items-center justify-center flex-col mt-10">
      <h3 class="text-2xl font-bold mb-2">Chose number</h3>
      <div class="numbers-container flex">
        <span
          :class="activeNumber === number ? 'active' : ''"
          class="bg-gray-100 text-xl p-5 mr-2 border border-1-solid border-gray-100 cursor-pointer rounded-3xl"
          v-for="(number, id) in sudokuNumbers"
          :key="id"
          @click="activeNumber = number"
          >{{ number }}</span
        >
      </div>
      <button @click="resetBoard" class="w-40 h-10 bg-red-800 font-bold text-xl rounded text-white mt-10">Reset Board</button>
    </div>
    <div class="popup" v-show="showPopup">
      <div class="popup_container flex items-center justify-center
flex-col bg-gray-200 p-10 rounded-2xl border border-4 border-white">
        <h2 class="final_message text-xl font-semibold">{{ finalMessage }}</h2>
        <button @click="resetBoard" class="play_button mt-10 p-3 bg-gray-300 rounded-2xl font-semibold hover:bg-gray-500 hover:text-white">Play Again</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.active {
  background-color: #616161;
  color: white;
}
.sudoku_col{
  border:1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.row_col:nth-of-type(3),
.row_col:nth-of-type(6){
  .sudoku_col{
    border-right:2px solid black;
  }
}
.sudoku_col:nth-of-type(3),
.sudoku_col:nth-of-type(6){
  border-bottom:2px solid black;
}
.popup{
  position: absolute;
  top:0;
  left:0;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
  width: 100vw;
  height:100vh;
  background-color: rgba(0, 0, 0, 0.90);
}
</style>
