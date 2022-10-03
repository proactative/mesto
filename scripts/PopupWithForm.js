export default class PopupWithForm extends Popup {

  constructor (popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;//функция callback
  }

  _getInputValues() {
 //собирает данные всех полей формы.
  }

  setEventListeners() {
    setEventListeners = super.setEventListeners; //перезаписывает родительский метод
    // + обработчик саьмита формы
  }
}
