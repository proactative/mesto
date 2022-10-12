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

function createCardElement(item) {
const newCard = new Card(
        item,
        templateElement,
        () => {
          popupWithImage.open(item);
        }
      );
      return newCard.createCard();
}

//section
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(createCardElement(item));
    }
  },
  '.elements'
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
  section.addItem(createCardElement(newData));
  addElementPopup.close();
}

//add element form
const addElementPopup = new PopupWithForm('.popup_type_add-element', addElementFormSubmitHandler);
addElementPopup.setEventListeners();

//opening via clicking on  the icon
addButton.addEventListener('click', () => {
  addElementPopup.open();
  addElementForm.reset();
  addFormValidation.resetValidation();
  addFormValidation.disableSubmitButton();
});
