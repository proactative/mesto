import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    const inputs = this._popup.querySelectorAll('.popup__input');
    inputs.forEach(input => {
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