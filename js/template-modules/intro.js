import createElementDOM from '../create-dom-element';
import {renderScreen} from '../display-screens';
import greeting from './greeting';

const introTemplate = `\
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>`;

const intro = createElementDOM(introTemplate);

intro.querySelector('.intro__asterisk').onclick = () => {
  renderScreen(greeting);
};

export default intro;
