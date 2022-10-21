import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {

  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._confirmationButton = this._popup.querySelector(".popup__button");//или document
  }

  open(data) {
    //this._data = data;
    super.open();
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', this._callback(//какой агрумент?))
  }
}

