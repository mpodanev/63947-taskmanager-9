import {controlBtnWrap as createControlBtnWrapTemplate} from './components/controlBtnWrapTemplate';
import {mainSearch as createMainSearchTemplate} from './components/mainSearchTemplate';
import {mainFilter as createMainFilterTemplate} from './components/mainFilterTemplate';
import {board as createBoardTemplate} from './components/boardTemplate';
import {boardFilterList as createBoardFilterList} from './components/boardFilterListTemplate';
import {createTaskEditTemplate} from './components/taskEditTemplate';
import {createTask as createTaskTemplate} from './components/taskTemplate';
import {loadMoreBtn as createLoadMoreBtnTemplate} from './components/loadMoreBtnTemplate';
import {getTask as taskData} from './components/data';

const mainElement = document.querySelector(`.main`);
const mainControlElement = document.querySelector(`.main__control`);
const TASK_COUNT = 3;
const render = (container, element, position) => {
  container.insertAdjacentHTML(position, element);
};

render(mainControlElement, createControlBtnWrapTemplate(), `beforeend`);
render(mainElement, createMainSearchTemplate(), `beforeend`);
render(mainElement, createMainFilterTemplate(), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = document.querySelector(`.board`);
const boardTasksElement = document.querySelector(`.board__tasks`);

render(boardElement, createBoardFilterList(), `afterbegin`);
render(boardTasksElement, createTaskEditTemplate(), `beforeend`);

const renderTasks = (container, count) => {
  container.insertAdjacentHTML(`beforeend`, new Array(count)
    .fill(``)
    .map(taskData)
    .map(createTaskTemplate)
    .join(``));
};

renderTasks(boardTasksElement, TASK_COUNT);

render(boardElement, createLoadMoreBtnTemplate(), `beforeend`);

