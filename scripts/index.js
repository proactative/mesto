import { initialCards } from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

/*for function openPopup*/
const pageContainer = document.querySelector('.page__container');
const profile = pageContainer.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');

/*for function formSubmitHandler*/
const personField = profile.querySelector('.profile__title');
const jobField = profile.querySelector('.profile__text');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_job');
const submitButtonEditProfile = document.querySelector('.popup__button_type_edit-profile');

/*for function closePopup*/
const editProfileCloseButton = popupEditProfile.querySelector('.popup__close_type_edit-profile');

/*for function openAddForm*/
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');

/*for function closeAddForm*/
const closeAddButton = document.querySelector('.popup__close_type_add-element');

/*for function addCard*/
const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template');

/*for function addElement*/
const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placeLinkInput = document.querySelector('.popup__input_type_link');
const submitElementButton = document.querySelector('.popup__button_type_submit');
const addElementForm = document.querySelector('.popup__form_type_add-form');

/*for functions zoomPhoto & closeZoomPhoto*/
const popupZoomPhoto = document.querySelector('.popup_type_zoom-photo');
const figureImage = document.querySelector('.figure__image');
const figureCaption = document.querySelector('.figure__caption');
const closeZoomButton = document.querySelector('.popup__close_type_zoom-photo');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
/*------------------------------------functions-----------------------------*/

//validation
const editFormValidation = new FormValidator(validationConfig, popupEditProfile);
const addFormValidation = new FormValidator(validationConfig, popupAddElement);

editFormValidation.enableValidation();
addFormValidation.enableValidation();

/*closing popup via the key escape*/
function closePopupViaEscape(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupViaEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupViaEscape);
}

function zoomPhoto(name, link) {
  openPopup(popupZoomPhoto);
  figureImage.src = link;
  figureCaption.textContent = name;
  figureImage.setAttribute('alt', name);
}
closeZoomButton.addEventListener('click', () => closePopup(popupZoomPhoto));

function addCard(cardData) {
  const newCard = new Card(cardData, templateElement, zoomPhoto);
  elementsContainer.prepend(newCard.createCard());
}

/*downloading cards from the array*/
initialCards.forEach(addCard);

/*editing a profile*/
function openEditProfilePopup() {
  openPopup(popupEditProfile);
  nameInput.value = personField.textContent;
  jobInput.value = jobField.textContent;
  editFormValidation.resetValidation();
  editFormValidation.disableSubmitButton();
}

function editProfileFormSubmitHandler() {
  personField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

editProfileButton.addEventListener('click', openEditProfilePopup);
editProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);

/*closing popup via clicking on overlay*/
const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

/*adding a new card*/
function addElement(e) {
  e.preventDefault();
  addCard({
    name: placeNameInput.value,
    link: placeLinkInput.value,
  });
  closePopup(popupAddElement);
}

addButton.addEventListener('click', () => {
  openPopup(popupAddElement);
  addElementForm.reset();
  addFormValidation.resetValidation();
  addFormValidation.disableSubmitButton();
});
closeAddButton.addEventListener('click', () => closePopup(popupAddElement));
popupAddElement.addEventListener('submit', addElement);



