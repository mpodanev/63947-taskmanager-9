import {controlBtnWrap as createControlBtnWrapTemplate} from './components/controlBtnWrapTemplate';
import {mainSearch as createMainSearchTemplate} from './components/mainSearchTemplate';
import {mainFilter as createMainFilterTemplate} from './components/mainFilterTemplate';
import {board as createBoardTemplate} from './components/boardTemplate';
import {boardFilterList as createBoardFilterList} from './components/boardFilterListTemplate';
import {loadMoreBtn as createLoadMoreBtnTemplate} from './components/loadMoreBtnTemplate';
import {getTask} from './data';
import {getFilter} from './filterData';
import Task from './components/task';
import TaskEdit from './components/task-edit';
import {createElement, render, unrender} from './util';

const mainElement = document.querySelector(`.main`);
const mainControlElement = document.querySelector(`.main__control`);
const TASK_COUNT = 8;
// const render = (container, element, position) => {
//   container.insertAdjacentHTML(position, element);
// };
// const tasksArr = new Array(TASK_COUNT).fill(``).map(getTaskData);

const taskMocks = new Array(TASK_COUNT).fill(``).map(getTask);

const renderTask = (taskMock) => {

  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement().querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tasksContainer, task.getElement(), `beforeend`);
};

const tasksContainer = document.querySelector(`.board__tasks`);
taskMocks.forEach((taskMock) => renderTask(taskMock));

// render(mainControlElement, createControlBtnWrapTemplate(), `beforeend`);
// render(mainElement, createMainSearchTemplate(), `beforeend`);
// render(mainElement, createMainFilterTemplate(getFilter(tasksArr.length)), `beforeend`);
// render(mainElement, createBoardTemplate(), `beforeend`);

// const boardElement = document.querySelector(`.board`);
// const boardTasksElement = document.querySelector(`.board__tasks`);

// render(boardElement, createBoardFilterList(), `afterbegin`);

// render(boardElement, createLoadMoreBtnTemplate(), `beforeend`);

// const loadMoreBtn = document.querySelector(`.load-more`);
// loadMoreBtn.addEventListener(`click`, () => {
//   renderTasks(boardTasksElement, tasksArr);
//   loadMoreBtn.remove();
// });
