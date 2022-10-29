import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {

  constructor(selector, deleteCardCallback) {
    super(selector);
    this._form =this._popup.querySelector('.popup__form_confirm-delition');
    this._deleteCardCallback = deleteCardCallback;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCardCallback(this._card);
    });
  }
}
