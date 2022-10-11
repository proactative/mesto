import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._inputs = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};

    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    const form = this._popup.querySelector('.popup__form');
    form.addEventListener(
      'submit',
      () => {
        this._formSubmit(this._getInputValues());
      }
    );
  }
}
