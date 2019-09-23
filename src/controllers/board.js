import Board from '../components/board';
import TaskList from '../components/task-list';
import {render, unrender, Position} from '../util';
import Sort from '../components/sort';
import LoadMoreBtn from '../components/load-more-btn';
import TaskController from '../controllers/task';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
    this._loadMoreBtn = new LoadMoreBtn();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._loadMoreBtn.getElement(), Position.BEFOREEND);

    this._tasks.forEach((taskMock) => this._renderTask(taskMock));

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    this._loadMoreBtn.getElement().addEventListener(`click`, this._onLoadMoreClick.bind(this));
  }

  _renderBoard() {
    unrender(this._taskList.getElement());
    this._taskList.removeElement();
    unrender(this._loadMoreBtn.getElement());
    this._loadMoreBtn.removeElement();

    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    this._tasks.forEach((taskMock) => this._renderTask(taskMock));

    render(this._board.getElement(), this._loadMoreBtn.getElement(), Position.BEFOREEND);
    this._loadMoreBtn.getElement().addEventListener(`click`, this._onLoadMoreClick.bind(this));
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }

  _onLoadMoreClick() {
    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
    this._tasks = this._tasks.concat(...this._tasks);
    unrender(this._loadMoreBtn._element);
    this._loadMoreBtn.getElement().removeEventListener(`click`, this._onLoadMoreClick.bind(this));
    this._loadMoreBtn.removeElement();
  }
}
