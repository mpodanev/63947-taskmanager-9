import MainSearch from './components/main-search';
import MainFilter from './components/main-filter';
import {getTask} from './data';
import {getFilter} from './filterData';
import {render, Position} from './util';
import BoardController from './controllers/board';
import ControlBtnController from './controllers/controlBtn';

const mainElement = document.querySelector(`.main`);
const mainControlElement = document.querySelector(`.main__control`);
const TASK_COUNT = 8;

const controlBtnController = new ControlBtnController(mainControlElement);

const taskMocks = new Array(TASK_COUNT).fill(``).map(getTask);

const boardController = new BoardController(mainElement, taskMocks);
const mainSerch = new MainSearch();
const mainFilter = new MainFilter(getFilter(10));


render(mainElement, mainSerch.getElement(), Position.BEFOREEND);
render(mainElement, mainFilter.getElement(), Position.BEFOREEND);
controlBtnController.init();
boardController.init();
