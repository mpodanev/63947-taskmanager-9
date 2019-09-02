import ControlBtn from '../components/controlBtn';
import {render, Position} from '../util';

export default class ControlBtnController {
  constructor(container) {
    this._container = container;
    this._controlBtn = new ControlBtn();
  }

  init() {
    render(this._container, this._controlBtn.getElement(), Position.BEFOREEND);
  }
}
