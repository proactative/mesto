import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;

  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // достаём все элементы полей
    const inputs = this._popup.querySelectorAll('.popup__input');
    inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners(); //перезаписывает родительский метод

    const submitButton = this._popup.querySelector('.popup__button');
    submitButton.addEventListener('submit', this._formSubmit.bind(this));
  }
}
