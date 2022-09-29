export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputs = Array.from(this._form.querySelectorAll(config.inputSelector));
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  //showing the error
  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = errorMessage;
  }

  //no error
  _hideInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }

  //choosing error-mode or no-error mode
  _toggleInputErrorState(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  //handlings of the button submit
  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", true);
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    })
  };

  _toggleSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  //event-listeners in inputs
  _setHandlers() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleInputErrorState(input);

        this._toggleSubmitButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setHandlers();
  }

  /*reseting validation in case of incorrect filling inputs and closing the form*/
  resetValidation() {
    const errors = this._form.querySelectorAll('.popup__error');

    this._inputs.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    })

    errors.forEach((error) => {
      error.textContent = '';
    })
  }
}
