//showing the error
function showInputError(form, input, errorMessage, config) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.classList.add(config.errorClass);
  error.textContent = errorMessage;
}

//no error
function hideInputError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '';
}

//choosing error-mode or no-error mode
function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
}

//handlings of the button submit
function disableSubmitButton(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.setAttribute("disabled",  true);
}

function enableSubmitButton(button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.removeAttribute("disabled");
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
};

function toggleSubmitButtonState(inputs, button, config) {
  if (hasInvalidInput(inputs)) {
    disableSubmitButton(button, config);
  } else {
    enableSubmitButton(button, config);
  }
}

//event-listeners in inputs
function setHandlers(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(form, input, config);
      toggleSubmitButtonState(inputs, button, config);
    });
  });
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setHandlers(form, config);
  });
}

enableValidation(validationConfig);

/*reseting validation in case of incorrect filling inputs and closing the form*/
function resetValidation(config, popup) {
  const errors = Array.from(popup.querySelectorAll('.popup__error'));
  const inputs = Array.from(popup.querySelectorAll(config.inputSelector));

  inputs.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });

  errors.forEach((error) => {
    error.textContent = '\u00A0';
  });
}
