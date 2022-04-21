<script setup>
import { computed, ref } from "vue";

const player = ref("X");
const board = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);
const CalculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
const winner = computed(() => CalculateWinner(board.value.flat()));

const MakeMove = (x, y) => {
  if (winner.value) return;

  if (board.value[x][y] !== "") return;

  board.value[x][y] = player.value;
  player.value = player.value === "X" ? "O" : "X";
};

const ResetGame = () => {
  player.value = "X";
  board.value = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
};
</script>

<template>
  <main class="x_o_game">
    <h1 class="game_name">Tic Tac Toe</h1>
    <h3 class="subtitle">Player {{ player }}'s turn</h3>

    <div class="board_container">
      <div v-for="(row, x) in board" :key="x" class="row_container">
        <div
          v-for="(cell, y) in row"
          :key="y"
          @click="MakeMove(x, y)"
          :class="`col_container ${cell === 'X' ? 'col_x' : 'col_o'}`"
        >
          {{ cell === "X" ? "x" : cell === "O" ? "⌾" : "" }}
        </div>
      </div>
    </div>
    <h2 v-if="winner" class="winner_text">Player '{{ winner }}' wins!</h2>
    <button
      @click="ResetGame"
      class="reset_game px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600"
    >
      Reset Game
    </button>
  </main>
</template>

<style scoped lang="scss">
.x_o_game {
  min-height: 100vh;
  text-align: center;
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
    flex-direction: column;
    align-items: center;
    margin-bottom: 14px;
    .row_container {
      display: flex;
      .col_container {
        display: flex;
        align-content: center;
        justify-content: center;
        cursor: pointer;
        font-size: 52px;
        border: 1px solid black;
        width: 70px;
        height: 70px;
        &.col_x {
          color: pink;
        }
        &.col_o {
          color: dodgerblue;
        }
      }
    }
  }
  .winner_text {
    font-size: 52px;
    font-weight: bold;
    margin-top: 20px;
  }
  .reset_game {
    font-size: 24px;
    padding: 5px;
    border: white;
    background-color: #7a2626;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #6c1010;
    }
  }
}
</style>
