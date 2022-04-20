import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tictactoe",
      name: "TicTacToe",
      component: () => import("../views/TicTacToe.vue"),
    },
    {
      path: "/hangman",
      name: "HangMan",
      component: () => import("../views/HangMan.vue"),
    },    {
      path: "/sudoku",
      name: "Sudoku",
      component: () => import("../views/SudokuGame.vue"),
    },
  ],
});

export default router;
