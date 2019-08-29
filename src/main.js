import {controlBtnWrap as createControlBtnWrapTemplate} from './components/controlBtnWrapTemplate';
import {mainSearch as createMainSearchTemplate} from './components/mainSearchTemplate';
import {mainFilter as createMainFilterTemplate} from './components/mainFilterTemplate';
import {board as createBoardTemplate} from './components/boardTemplate';
import {boardFilterList as createBoardFilterList} from './components/boardFilterListTemplate';
import {loadMoreBtn as createLoadMoreBtnTemplate} from './components/loadMoreBtn';
import {getTask} from './data';
import {getFilter} from './filterData';
import Task from './components/task';
import TaskEdit from './components/task-edit';
import {createElement, render, unrender} from './util';
import BoardController from './controllers/board';

const mainElement = document.querySelector(`.main`);
const mainControlElement = document.querySelector(`.main__control`);
const TASK_COUNT = 8;

const taskMocks = new Array(TASK_COUNT).fill(``).map(getTask);

const tasksContainer = document.querySelector(`.board__tasks`);
const boardController = new BoardController(tasksContainer, taskMocks);
boardController.init();
