import './index.css';

import { initialCards } from '../scripts/cards.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {
  editProfileButton,
  personField,
  jobField,
  nameInput,
  jobInput,
  addButton,
  popupAddElement,
  elementsContainer,
  templateElement,
  addElementForm,
  validationConfig,
  popupEditProfile,
} from '../scripts/utils/constants.js';

//validation
const editFormValidation = new FormValidator(validationConfig, popupEditProfile);
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddElement);
addFormValidation.enableValidation();

//zoom photo
const popupWithImage = new PopupWithImage('.popup_type_zoom-photo');
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
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', editProfileFormSubmitHandler);
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
const addElementPopup = new PopupWithForm('.popup_type_add-element', addElementFormSubmitHandler);
addElementPopup.setEventListeners();

//открытие по иконке
addButton.addEventListener('click', () => {
  addElementPopup.open();
  addElementForm.reset();
  addFormValidation.resetValidation();
  addFormValidation.disableSubmitButton();
});


