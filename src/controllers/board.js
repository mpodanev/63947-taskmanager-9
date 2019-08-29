import Board from '../components/board';
import TaskList from '../components/task-list';
import {createElement, render, unrender, Position, Key} from '../util';
import Task from '../components/task';
import TaskEdit from '../components/task-edit';
import Sort from '../components/sort';
import LoadMoreBtn from '../components/loadMoreBtn';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
    this._loadMoreBtn = new LoadMoreBtn();
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

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`.card__delete`)
      .addEventListener(`click`, () => {
        unrender(taskComponent._element);
        unrender(taskEditComponent._element);
        taskComponent.removeElement();
        taskEditComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);

        if (this._taskList.getElement().childElementCount === 0) {
          const noTasksElement = createElement(`<p class="board__no-tasks">
              Congratulations, all tasks were completed! To create a new click on
              «add new task» button.
            </p>`);
          render(this._taskList.getElement(), noTasksElement, Position.BEFOREEND);
        }
      });

    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
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
