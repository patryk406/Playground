<script setup>
import { computed, onBeforeUnmount, ref } from "vue";

const words = ["application", "programming", "interface", "wizard"];
const keyboard = [['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['z','x','c','v','b','n','m']]
const finalMessage = ref("");
let selectedWord = words[Math.floor(Math.random() * words.length)];
const playable = ref(true);
const correctLetters = ref([]);
const wrongLetters = ref([]);
const errors = computed(() => wrongLetters.value.length);
const showNotification = ref(false);
const showPopup = ref(false);

const showTyped = () => {
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
  }, 2000);
};

const handleKeyDown = (e) => {
  if (playable.value && e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.value.includes(letter)) {
        correctLetters.value.push(letter);
        if (correctLetters.value.length === selectedWord.length) {
          console.log("hi1");
          finalMessage.value = "Congratulations! You won! 😃";
          showPopup.value = true;
          playable.value = false;
        }
      } else {
        showTyped();
      }
    } else {
      if (!wrongLetters.value.includes(letter)) {
        wrongLetters.value.push(letter);
        if (wrongLetters.value.length === 5) {
          console.log("hi2", wrongLetters.value.length);
          finalMessage.value = `Unfortunately you lost. 😕\n\n...the word was: ${selectedWord.value}`;
          showPopup.value = true;
          playable.value = false;
        }
      } else {
        showTyped();
      }
    }
  }
};
const playAgain = () => {
  playable.value = true;
  correctLetters.value = [];
  wrongLetters.value = [];
  selectedWord = words[Math.floor(Math.random() * words.length)];
  showPopup.value = false;
};
window.addEventListener("keydown", handleKeyDown);
onBeforeUnmount(() => removeEventListener("keydown", handleKeyDown));
</script>

<template>
  <main class="pt-8 m-auto text-center min-h-screen">
    <h1 class="font-bold uppercase text-3xl">Hangman Game</h1>
    <p class="text-xl">Find correct word!</p>
    <div class="flex mt-10 items-center justify-center">
      <div class="game-container">
        <svg width="400" height="300" viewBox="0 0 317 234" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="173" width="100" height="61" fill="#767676"/>
          <rect x="217" y="172.997" width="100" height="61" fill="#767676"/>
          <g filter="url(#filter0_d_21_12)">
            <path d="M53 3.015C53.0069 1.63431 51.8932 0.509437 50.5125 0.502534C49.1318 0.49563 48.0069 1.60931 48 2.99L53 3.015ZM49.4278 217.436L63.9336 203.075L49.5722 188.569L35.0664 202.93L49.4278 217.436ZM48 2.99L47 202.99L52 203.015L53 3.015L48 2.99Z" fill="black"/>
          </g>
          <g filter="url(#filter1_d_21_12)">
            <path d="M270 3.0125C270.007 1.63181 268.893 0.506935 267.512 0.500031C266.132 0.493128 265.007 1.60681 265 2.9875L270 3.0125ZM266.428 217.434L280.934 203.072L266.572 188.566L252.066 202.928L266.428 217.434ZM265 2.9875L264 202.987L269 203.012L270 3.0125L265 2.9875Z" fill="black"/>
          </g>
          <path d="M159 63L107.038 19.5H210.962L159 63Z" fill="#C4C4C4"/>
          <path d="M51 3H268" stroke="black" stroke-width="3" stroke-linecap="round"/>
          <path d="M113.5 8L115.887 3H110.113L112.5 8H113.5ZM112.5 15L110.113 20H115.887L113.5 15H112.5ZM112.5 7.5V15.5H113.5V7.5H112.5Z" fill="black"/>
          <path d="M205.5 8L207.887 3H202.113L204.5 8H205.5ZM204.5 15L202.113 20H207.887L205.5 15H204.5ZM204.5 7.5V15.5H205.5V7.5H204.5Z" fill="black"/>
          <path d="M160.519 71.0015L167.694 56.0087L150.374 55.9913L157.519 70.9985L160.519 71.0015ZM157.521 69.4985L157.494 95.9985L160.494 96.0015L160.521 69.5015L157.521 69.4985Z" fill="black"/>
<!--          head-->
          <ellipse v-show="errors>0" cx="153" cy="95.5" rx="1" ry="4.5" transform="rotate(-31 153 95.5)" fill="black"/>
          <ellipse v-show="errors>0" cx="152.459" cy="95.2459" rx="0.2" ry="2.5" transform="rotate(-31 152.459 95.2459)" fill="white"/>
          <ellipse v-show="errors>0" cx="165.175" cy="95.3723" rx="1" ry="4.5" transform="rotate(31 165.175 95.3723)" fill="black"/>
          <ellipse v-show="errors>0" cx="165.459" cy="95.2459" rx="0.2" ry="2.5" transform="rotate(31 165.459 95.2459)" fill="white"/>
          <circle v-show="errors>0" cx="159" cy="105" r="9.5" fill="#E9E7E7" stroke="black"/>
          <ellipse v-show="errors>0" cx="163.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 163.001 109.503)" fill="#EC8C8C"/>
          <ellipse v-show="errors>0" cx="163.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 163.001 109.503)" fill="#EC8C8C"/>
          <ellipse v-show="errors>0" cx="163.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 163.001 109.503)" fill="#EC8C8C"/>
          <ellipse v-show="errors>0" cx="163.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 163.001 109.503)" fill="#EC8C8C"/>
          <ellipse v-show="errors>0" cx="163.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 163.001 109.503)" fill="#EC8C8C"/>
          <ellipse v-show="errors>0" cx="155.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 155.001 109.503)" fill="#EC8C8C"/>
          <ellipse v-show="errors>0" cx="155.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 155.001 109.503)" fill="#EC8C8C"/>
          <ellipse v-show="errors>0" cx="155.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 155.001 109.503)" fill="#EC8C8C"/>
          <ellipse v-show="errors>0" cx="155.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 155.001 109.503)" fill="#EC8C8C"/>
          <ellipse v-show="errors>0" cx="155.001" cy="109.503" rx="0.5" ry="2" transform="rotate(-90.0871 155.001 109.503)" fill="#EC8C8C"/>
          <path v-show="errors>0" d="M156.773 100.298L153.921 99.2724L154.328 98.5077L156.773 100.298Z" fill="black"/>
          <path v-show="errors>0" d="M161.235 100.319L163.68 98.5286L164.087 99.2933L161.235 100.319Z" fill="black"/>
          <ellipse v-show="errors>0" cx="155.085" cy="101.005" rx="2" ry="0.648052" transform="rotate(10 155.085 101.005)" fill="#FFFBFB"/>
          <ellipse v-show="errors>0" cx="163.082" cy="100.986" rx="2" ry="0.648052" transform="rotate(-10 163.082 100.986)" fill="#FFFBFB"/>
          <line v-show="errors>0" x1="156" y1="101.101" x2="154" y2="101.099" stroke="black" stroke-width="0.2"/>
          <line v-show="errors>0" x1="164" y1="101.103" x2="162" y2="101.1" stroke="black" stroke-width="0.2"/>
          <ellipse v-show="errors>0" cx="160.5" cy="105.25" rx="0.5" ry="0.25" fill="#EFCDCD"/>
          <ellipse v-show="errors>0" cx="157.5" cy="105.25" rx="0.5" ry="0.25" fill="#EFCDCD"/>
          <path v-show="errors>0" d="M159 110L162.464 110.75H155.536L159 110Z" fill="#C4C4C4"/>
          <!--          -->
          <ellipse v-show="errors>2" cx="171.74" cy="117.695" rx="1" ry="8.5" transform="rotate(-134.756 171.74 117.695)" fill="url(#paint0_radial_21_12)"/>
          <ellipse v-show="errors>3" cx="146.339" cy="118.065" rx="1" ry="8.5" transform="rotate(138.924 146.339 118.065)" fill="url(#paint1_radial_21_12)"/>
          <ellipse v-show="errors>4" cx="154" cy="170" rx="1" ry="10" fill="url(#paint2_radial_21_12)"/>
          <ellipse v-show="errors===5" cx="164" cy="170" rx="1" ry="10" fill="url(#paint3_radial_21_12)"/>
          <ellipse v-show="errors>1" cx="159" cy="140" rx="13" ry="25" fill="url(#paint4_diamond_21_12)"/>
          <defs>
            <filter id="filter0_d_21_12" x="31.0664" y="0.502502" width="36.8672" height="224.934" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_21_12"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_21_12" result="shape"/>
            </filter>
            <filter id="filter1_d_21_12" x="248.066" y="0.5" width="36.8672" height="224.934" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_21_12"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_21_12" result="shape"/>
            </filter>
            <radialGradient id="paint0_radial_21_12" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(171.74 113.728) rotate(90) scale(12.4667 1.46667)">
              <stop stop-color="#413636"/>
              <stop offset="1" stop-color="#3F0000" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint1_radial_21_12" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(146.339 114.098) rotate(90) scale(12.4667 1.46667)">
              <stop stop-color="#413636"/>
              <stop offset="1" stop-color="#3F0000" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint2_radial_21_12" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(154 165.333) rotate(90) scale(14.6667 1.46667)">
              <stop stop-color="#413636"/>
              <stop offset="1" stop-color="#3F0000" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint3_radial_21_12" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(164 165.333) rotate(90) scale(14.6667 1.46667)">
              <stop stop-color="#413636"/>
              <stop offset="1" stop-color="#3F0000" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="paint4_diamond_21_12" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(159 140) rotate(90) scale(29.878 15.5366)">
              <stop stop-color="#4F5B85"/>
              <stop offset="0.51815" stop-color="#64B38D"/>
              <stop offset="0.9999" stop-opacity="0.39"/>
              <stop offset="1" stop-color="#E5FCB3" stop-opacity="0"/>
            </radialGradient>
          </defs>
        </svg>

        <div class="words-container flex flex-col-reverse">
          <div class="wrong_letters flex mt-5">
            <p class="mr-5 font-semibold text-red-500">Wrong:</p>
            <span
              class="single_letter mr-3 "
              v-for="(wrongLetter, key) in wrongLetters"
              :key="key"
              >{{ wrongLetter }}</span
            >
          </div>
          <div class="word mt-5">
            <p class="mr-5 font-semibold text-green-500">Correct:</p>
            <span
              class="single_letter"
              v-for="(letter, key) in selectedWord"
              :key="key"
            >
              {{ correctLetters.includes(letter) ? letter : "" }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-show="showPopup">
      <div class="popup_container flex items-center justify-center
flex-col bg-gray-200 p-10 rounded-2xl border border-4 border-white">
        <h2 class="final_message text-xl font-semibold">{{ finalMessage }}</h2>
        <button @click="playAgain" class="play_button mt-10 p-3 bg-gray-300 rounded-2xl font-semibold hover:bg-gray-500 hover:text-white">Play Again</button>
      </div>
    </div>
    <div
      class="notification bg-gray-300 px-10 py-5 rounded text-xl font-bold"
      v-show="showNotification"
    >
      <p>You have already entered this letter</p>
    </div>
    <div class="keyboard_container flex flex-col items-center justify-center mt-2">
    <div class="keyboard flex" v-for="(row, rowKey) in keyboard" :key="rowKey">
      <span class="letter p-3 m-1 bg-black flex text-white border border-amber-100 rounded-xl font-bold"
            v-for="(letter, letterKey) in row" :key="letterKey"
@click="handleKeyDown({key:letter, keyCode:65})"
>{{letter}}</span>
    </div></div>
  </main>
</template>
<style>
.word {
  height: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.single_letter {
  text-align: center;
  margin: 0 5px;
  width: 20px;
  border-bottom: 2px solid black;
}
.notification {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.popup{
  position: absolute;
  top:0;
  left:0;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
  height:100vh;
  width:100vw;
  background-color: rgba(0, 0, 0, 0.90);
}
</style>
