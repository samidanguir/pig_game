"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const namePlayer0 = document.getElementById("name--0");
const namePlayer1 = document.getElementById("name--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const name0 = document.querySelector(".name0");
const name1 = document.querySelector(".name1");
const endGame1 = document.querySelector(".endGame1");
const endGame2 = document.querySelector(".endGame2");
const soundVache = "Vache_qui_meugle.wav";
const soundCheval = "Hennissement_de_cheval.wav";
const soundCoq = "Chant_du_coq.wav";
const soundApplaudissement = "Applaudissements.wav";
const soundMouton = "Mouton.wav";
const soundLoup = "Hurlement_du_loup.wav";
const soundTigre = "Tiger.wav";
const soundFail = "Fail.wav";

// Starting conditions
score0El.textContent =0;
score1El.textContent =0;
//diceEl.classList.add('.hidden');

let scores;
let currentScore;
let activePlayer;
let playing;
let audio;

player0El.addEventListener("click", function () {
  namePlayer0.textContent = name0.value;
  name0.classList.add("hidden");
  console.log("name 0 to upper case : " + name0.value.toUpperCase());
  if (
    name0.value.toUpperCase() === "JASMEEN" ||
    name1.value.toUpperCase() == "NINI"
  ) {
    audio = new Audio(soundLoup);
    console.log("name jasm : " + name0.value.toUpperCase());
  } else if (name0.value.toUpperCase() === "SAMI") {
    console.log("name sam : " + name0.value.toUpperCase());
    audio = new Audio(soundApplaudissement);
  } else if (name0.value.toUpperCase() === "SELMA") {
    console.log("name selm : " + name0.value.toUpperCase());
    audio = new Audio(soundTigre);
  } else if (name0.value.toUpperCase() === "ELEY") {
    console.log("name selm : " + name0.value.toUpperCase());
    audio = new Audio(soundApplaudissement);
  }

  audio.play();
});
player1El.addEventListener("click", function () {
  namePlayer1.textContent = name1.value;
  name1.classList.add("hidden");
  console.log("name 1 : " + namePlayer1.textContent);
  if (
    name1.value.toUpperCase() == "JASMEEN" ||
    name1.value.toUpperCase() == "NINI"
  ) {
    audio = new Audio(soundLoup);
  } else if (name1.value.toUpperCase() == "SAMI") {
    audio = new Audio(soundCoq);
  } else if (name1.value.toUpperCase() == "SELMA") {
    audio = new Audio(soundTigre);
  } else if (name1.value.toUpperCase() == "ELEY") {
    audio = new Audio(soundApplaudissement);
  }
  audio.play();
});

const randomStart = function () {
  let random = Math.trunc(Math.random() * 2);
  if (random == 0) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }
  console.log("random : " + random);
  console.log("active : " + activePlayer);
};

const changeName = function () {
  name0.classList.remove("hidden");
  name1.classList.remove("hidden");
  name0.value = "";
  name1.value = "";

  namePlayer0.textContent = "Player 1";
  console.log("namePlayer0 : " + namePlayer0);
  namePlayer1.textContent = "Player 2";
  console.log("namePlayer1 : " + namePlayer1);
};
// function PlaySound() {
//   var sound = document.getElementById('sound1');
//   sound.Play();
// }

const init = function () {
  randomStart();
  changeName();
  //PlaySound();
  scores = [0, 0];
  currentScore = 0;
  //activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  endGame1.classList.add("hidden");
  endGame2.classList.add("hidden");
  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  if (activePlayer == 0) {
    document.querySelector(`.player--1`).classList.remove("player--active");
  } else {
    document.querySelector(`.player--0`).classList.remove("player--active");
  }
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
init();
let dice;
// Rolling the dice
btnRoll.addEventListener("click", function () {
  if (playing === true) {
    // 1 Generate a random number
    dice = Math.trunc(Math.random() * 6) + 1;
    // if (
    //   (namePlayer0.textContent === 'SAMI' && activePlayer == 0) ||
    //   (namePlayer1.textContent === 'SAMI' && activePlayer == 1)
    // ) {
    //   dice = Math.trunc(Math.random() * 6) + 1;
    //   if (dice === 1) {
    //     console.log('dice ===============================  1 : ' + dice);
    //     console.log('dice ================================ 2 : ' + dice);
    //     dice = 2;
    //   }

    //   console.log('Sami 0 or 1 : ' + namePlayer0.textContent);
    //   console.log('dice 0 : ' + dice);
    // } else {
    //   dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log('dice 1 : ' + dice);
    // }
    // 2 Display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3 Check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //current0El.textContent = currentScore;
    } else {
      //Switch to nextplayer
      audio = new Audio(soundFail);
      audio.play();
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing === true) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      endGame1.classList.remove("hidden");
      endGame2.classList.remove("hidden");
      btnHold.classList.add("hidden");
      btnRoll.classList.add("hidden");
      let winner =
        activePlayer == 0 ? namePlayer0.textContent : namePlayer1.textContent;
      let looser =
        activePlayer == 0 ? namePlayer1.textContent : namePlayer0.textContent;

      endGame1.textContent = "T'es trop fort " + winner + "💪 💪!!";
      endGame2.textContent = "Par contre, " + looser + ", tu fais pitié 🤕!! ";
    } else {
      // Switch to the other player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
