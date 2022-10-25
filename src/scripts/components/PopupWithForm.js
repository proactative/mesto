import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._button = this._popup.querySelector('.popup__button');
    this._button.setAttribute('initialTextContent', this._button.textContent);
  }

  _getInputValues() {
    this._formValues = {};

    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    setTimeout(() => {
      this._button.textContent = this._button.getAttribute('initialTextContent');
    }, "700");

  }

  setEventListeners() {
    super.setEventListeners();

    const form = this._popup.querySelector('.popup__form');
    form.addEventListener(
      'submit',
      () => {
        this._button.textContent = 'Сохранение...';
        this._formSubmit(this._getInputValues());
      }
    );
  }
}
