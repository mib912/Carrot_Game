'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();

const durationTime = randomNumber(5,10);
const carrotNum = randomNumber(1,7);
const bugNum = randomNumber(1,7);

const game = new GameBuilder()
  .gameDuration(durationTime)
  .carrotCount(carrotNum)
  .bugCount(bugNum)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'Replay?';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'You won🎉';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'You lost😥';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason!');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});

function randomNumber(min, max) {
  return Math.floor((Math.random() * (max - min) + min));
}