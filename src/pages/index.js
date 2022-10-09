import './index.css';

import { initialCards } from '../scripts/cards.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

const pageContainer = document.querySelector('.page__container');
const profile = pageContainer.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');
const personField = profile.querySelector('.profile__title');
const jobField = profile.querySelector('.profile__text');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_job');
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');
const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template');
const addElementForm = document.querySelector('.popup__form_type_add-form');
const popupZoomPhoto = document.querySelector('.popup_type_zoom-photo');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//validation
const editFormValidation = new FormValidator(validationConfig, popupEditProfile);
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddElement);
addFormValidation.enableValidation();

//zoom photo
const popupWithImage = new PopupWithImage(popupZoomPhoto);
popupWithImage.setEventListeners();

//section
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(
        item,
        templateElement,
        () => {
          popupWithImage.open(item);
        }
      );
      const cardElement = newCard.createCard();
      section.addItem(cardElement);
    }
  },
  elementsContainer
);
section.renderItems();

//userInfo
const userInfo = new UserInfo({ nameSelector: personField, jobSelector: jobField });

function editProfileFormSubmitHandler(formNewInfo) {
  userInfo.setUserInfo({ name: formNewInfo["full-name"], job: formNewInfo.job });
  editProfilePopup.close();
}

//edit profile
const editProfilePopup = new PopupWithForm(popupEditProfile, editProfileFormSubmitHandler);
editProfilePopup.setEventListeners();

//оpen via clicking on icon
editProfileButton.addEventListener('click', () => {
  editProfilePopup.open();

  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;

  editFormValidation.resetValidation();
  editFormValidation.disableSubmitButton();
});

function addElementFormSubmitHandler(data) {

  const newData = {name: data['place-name'], link: data['place-link']};

  const newCard = new Card(
    newData,
    templateElement,
    () => {
      popupWithImage.open(newData);
    }
  );
  const cardElement = newCard.createCard();
  section.addItem(cardElement);

  //закрытие
  addElementPopup.close();
}

//add element form
const addElementPopup = new PopupWithForm(popupAddElement, addElementFormSubmitHandler);
addElementPopup.setEventListeners();

//открытие по иконке
addButton.addEventListener('click', () => {
  addElementPopup.open();
  addElementForm.reset();
  addFormValidation.resetValidation();
  addFormValidation.disableSubmitButton();
});


