import {controlBtnWrap as createControlBtnWrapTemplate} from './components/controlBtnWrapTemplate';
import {mainSearch as createMainSearchTemplate} from './components/mainSearchTemplate';
import {mainFilter as createMainFilterTemplate} from './components/mainFilterTemplate';
import {board as createBoardTemplate} from './components/boardTemplate';
import {boardFilterList as createBoardFilterList} from './components/boardFilterListTemplate';
import {createTaskEditTemplate} from './components/taskEditTemplate';
import {createTask as createTaskTemplate} from './components/taskTemplate';
import {loadMoreBtn as createLoadMoreBtnTemplate} from './components/loadMoreBtnTemplate';
import {getTaskData} from './data';
import {getFilter} from './filterData';

const mainElement = document.querySelector(`.main`);
const mainControlElement = document.querySelector(`.main__control`);
const TASK_COUNT = 8;
const render = (container, element, position) => {
  container.insertAdjacentHTML(position, element);
};
const tasksArr = new Array(TASK_COUNT).fill(``).map(getTaskData);

render(mainControlElement, createControlBtnWrapTemplate(), `beforeend`);
render(mainElement, createMainSearchTemplate(), `beforeend`);
render(mainElement, createMainFilterTemplate(getFilter(tasksArr.length)), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = document.querySelector(`.board`);
const boardTasksElement = document.querySelector(`.board__tasks`);

render(boardElement, createBoardFilterList(), `afterbegin`);
render(boardTasksElement, createTaskEditTemplate(tasksArr[0]), `beforeend`);

const renderTasks = (container, tasks) => {
  container.insertAdjacentHTML(`beforeend`, tasks.map(createTaskTemplate).join(``));
};

renderTasks(boardTasksElement, tasksArr.slice(1));

render(boardElement, createLoadMoreBtnTemplate(), `beforeend`);

const loadMoreBtn = document.querySelector(`.load-more`);
loadMoreBtn.addEventListener(`click`, () => {
  renderTasks(boardTasksElement, tasksArr);
  loadMoreBtn.remove();
});
