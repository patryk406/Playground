<script setup>
import { ref } from "vue";
const sudokuNumbers = ref(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const activeNumber = ref("");
const errors = ref(0);
const showPopup = ref(false);
const finalMessage = ref("Congratulations! You won! 😃");
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
const checkWinner = () => {
  const tempStr = board.value.toString();
  if (tempStr.includes("-")) {
    return;
  }
  showPopup.value = true;
};
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
  if (!checkTables.a && !checkTables.b && value !== "") {
    board.value[colKey][cellKey] = value;
  } else if (value !== "") {
    errors.value += 1;
  }
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
  <main class="sudoku_game">
    <h1 class="game_name">Sudoku</h1>
    <h4 class="subtitle">
      Errors: <span class="">{{ errors }}</span>
    </h4>
    <div class="board_container">
      <div class="row_container" v-for="(col, colKey) in board" :key="colKey">
        <div
          class="col_container"
          :class="cell !== '' && cell !== '-' ? 'whited_cell' : ''"
          v-for="(cell, cellKey) in col"
          :key="cellKey"
          @click="validateCell(colKey, cellKey, activeNumber)"
        >
          {{ cell === "-" ? "" : cell }}
        </div>
      </div>
    </div>

    <div class="numbers">
      <h3 class="numbers_title">Chose number</h3>
      <div class="numbers-container">
        <span
          :class="activeNumber === number ? 'active' : ''"
          class="number"
          v-for="(number, id) in sudokuNumbers"
          :key="id"
          @click="activeNumber = number"
          >{{ number }}</span
        >
      </div>
      <button @click="resetBoard" class="reset_game">Reset Game</button>
    </div>
    <div class="popup" v-show="showPopup">
      <div class="popup_message">
        <h2 class="final_message">{{ finalMessage }}</h2>
        <button @click="resetBoard" class="reset_game">Play Again</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.sudoku_game {
  text-align: center;
}
.game_name {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.subtitle {
  font-size: 18px;
  margin-bottom: 8px;
}
.board_container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  .row_container {
    display: flex;
    flex-direction: column;
    .col_container {
      display: flex;
      align-content: center;
      cursor: pointer;
      font-size: 32px;
      width: 38px;
      height: 38px;
      border: 1px solid black;
      justify-content: center;
      align-items: center;
      &.col_container:nth-of-type(3),
      &.col_container:nth-of-type(6) {
        border-bottom: 2px solid black;
      }
    }
    &.row_container:nth-of-type(3),
    &.row_container:nth-of-type(6) {
      .col_container {
        border-right: 2px solid black;
      }
    }
  }
}
.numbers {
  .numbers_title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .numbers-container {
    display: flex;
    align-content: center;
    justify-content: center;
    .number {
      font-size: 18px;
      border: 1px solid black;
      padding: 10px;
      border-radius: 50%;
      margin: 10px 5px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      &.active,
      &:hover {
        background-color: #616161;
        color: white;
      }
    }
  }
  .reset_game {
    font-size: 24px;
    padding: 5px;
    border: white;
    background-color: #7a2626;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 5px;
    &:hover {
      background-color: #6c1010;
    }
  }
}
.popup {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  .popup_message {
    background-color: rgb(229 231 235);
    padding: 15px;
    border-radius: 8px;
    .final_message {
      font-size: 24px;
    }
  }
}
@media screen and(max-width:600px) {
  .col_container {
    height: 30px !important;
    width: 30px !important;
    font-size: 24px !important;
  }
  .number {
    font-size: 16px !important;
    height: 20px !important;
    width: 20px !important;
    padding: 5px !important;
    line-height: 20px !important;
  }
}
</style>
