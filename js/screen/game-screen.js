// import StatsView from './stats-screen';
// import intro from './intro-screen';
import GameModel from '../data/game-model';
import emitter from '../emitter';
import HeaderView from '../view/header-view';
import LevelView from '../view/level-view';
import Application from '../application';

class GamePresenter {
  constructor() {
    this.header = new HeaderView(GameModel.state);
    this.content = new LevelView(GameModel.getCurrentLevel(), GameModel.scores);

    this.root = document.createElement('div');
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    emitter.on('answer', (answer) => game.onAnswer(answer));
    emitter.on('restart', () => game.exitGame());

    this._interval = null;
  }

  startGame() {
    GameModel.resetTime();
    this.changeLevel();

    this._interval = setInterval(() => {
      GameModel.tick();
      this.updateHeader();

      if (GameModel.state.time < 0) {
        this.stopGame();
        GameModel.decreaseLive();
        GameModel.calcScores(true);
        this.nextGame();
      }
    }, 1000);
  }

  stopGame() {
    clearInterval(this._interval);
  }

  nextGame() {
    if (GameModel.isDead() || !GameModel.hasNextLevel()) {
      this.endGame();
    } else {
      GameModel.nextLevel();
      this.startGame();
    }
  }

  exitGame() {
    this.stopGame();
    GameModel.restart();
    Application.showIntro();
  }

  restartGame() {
    GameModel.restart();
  }

  endGame() {
    // const element = document.createElement('div');
    // element.appendChild(new HeaderView().element);
    // element.appendChild(new StatsView().element);
    Application.showStats(GameModel.scores, GameModel.result());
  }

  updateHeader() {
    const header = new HeaderView(GameModel.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  changeLevel() {
    this.updateHeader();
    const level = new LevelView(GameModel.getCurrentLevel(), GameModel.scores);

    this.changeContentView(level);
  }

  onAnswer(answer) {
    this.stopGame();

    if (answer) {
      GameModel.calcScores();
    } else {
      GameModel.decreaseLive();
      GameModel.calcScores(true);
    }
    this.nextGame();
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
}

const game = new GamePresenter();

export default () => {
  game.restartGame();
  game.startGame();
  return game.root;
};
