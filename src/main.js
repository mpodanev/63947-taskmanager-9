import {controlBtnWrap} from './components/controlBtnWrap';
import {mainSearch} from './components/mainSearch';
import {mainFilter} from './components/mainFilter';
import {board} from './components/board';

import {boardFilterList} from './components/boardFilterList';
import {createTask} from './components/task';
import {loadMoreBtn} from './components/loadMoreBtn';

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

const render = (container, element, position) => {
  container.insertAdjacentHTML(position, element);
};

render(mainControl, controlBtnWrap(), `beforeend`);
render(main, mainSearch(), `beforeend`);
render(main, mainFilter(), `beforeend`);
render(main, board(), `beforeend`);

