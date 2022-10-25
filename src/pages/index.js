import './index.css';

//import { initialCards } from '../scripts/cards.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';

import {
  editProfileButton,
  personField,
  jobField,
  avatarField,
  nameInput,
  jobInput,
  addButton,
  avatarButton,
  popupAddElement,
  templateElement,
  addElementForm,
  validationConfig,
  popupEditProfile,
  updateAvatarForm,
  popupEditAvatar
} from '../scripts/utils/constants.js';

//validation
const editFormValidation = new FormValidator(validationConfig, popupEditProfile);
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddElement);
addFormValidation.enableValidation();

const updateAvatarFormValidation = new FormValidator(validationConfig, popupEditAvatar);
updateAvatarFormValidation.enableValidation();

//zoom photo
const popupWithImage = new PopupWithImage('.popup_type_zoom-photo');
popupWithImage.setEventListeners();

//popup for card deleting
const popupWithConfirmation = new PopupWithConfirmation(".popup_type_confirm-deletion");
popupWithConfirmation.setEventListeners();

//opening removing confirmation popup
function showDeleteCardConfirmationPopup(deleteCardFromBrowserCallback, cardId) {
  popupWithConfirmation.open();

  popupWithConfirmation.setDeleteCardFromBrowserCallback(deleteCardFromBrowserCallback);
  popupWithConfirmation.setDeleteCardFromServerCallback(() => api.deleteCard(cardId));
}

//creating a new card
function addLike(id) {
  api.addLike(id)
}

function removeLike(id) {
  api.deleteLike(id)
}

function createCardElement(item) {
  const newCard = new Card(
    item,
    templateElement,
    () => {
      popupWithImage.open(item);
    },
    showDeleteCardConfirmationPopup,
    userInfo.getId(),
    addLike,
    removeLike,
  );
  return newCard.createCard();
}

//edit avatar
function changeAvatarSubmitFormHandler(url) {
  api.updateAvatar(url['avatar-link']);
  userInfo.setAvatar(url['avatar-link']);
  popupWithFormForAvatar.close();
}

const popupWithFormForAvatar = new PopupWithForm('.popup_type_update-avatar', changeAvatarSubmitFormHandler);
popupWithFormForAvatar.setEventListeners();

//edit profile
function editProfileFormSubmitHandler(formNewInfo) {
  api.editProfile(formNewInfo["full-name"], formNewInfo.job);
  userInfo.setUserInfo({ name: formNewInfo["full-name"], job: formNewInfo.job });
  editProfilePopup.close();
}

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', editProfileFormSubmitHandler);
editProfilePopup.setEventListeners();

//оpen edit-profile-popup via clicking on icon
editProfileButton.addEventListener('click', () => {
  editProfilePopup.open();

  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;

  editFormValidation.resetValidation();
  editFormValidation.disableSubmitButton();
});

//open avatar-popup via clicking on pencil
avatarButton.addEventListener('click', () => {
  popupWithFormForAvatar.open();
  updateAvatarForm.reset();
  updateAvatarFormValidation.resetValidation();
  updateAvatarFormValidation.disableSubmitButton();
});

//adding a new card
function addElementFormSubmitHandler(data) {
  api.addCard(data['place-name'], data['place-link'])
  .then((data) => {                             //данные с сервера о новосозданной карточке
    section.addItem(createCardElement(data));
  })
 .finally(() => addElementPopup.close());
}

const addElementPopup = new PopupWithForm('.popup_type_add-element', addElementFormSubmitHandler);
addElementPopup.setEventListeners();

//open via clicking on the icon
addButton.addEventListener('click', () => {
  addElementPopup.open();
  addElementForm.reset();
  addFormValidation.resetValidation();
  addFormValidation.disableSubmitButton();
});

// new api
const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-52',
  {
    authorization: '2d9ff2df-e659-4f7f-80c0-40ca2d274d7d',
    'Content-Type': 'application/json'
  }
);

//userInfo
const userInfo = new UserInfo({ name: personField, job: jobField, avatar: avatarField });

api.getUserInfo().then((data) => {
  userInfo.setUserInfo({ name: data.name, job: data.about, id: data._id});
  userInfo.setAvatar(data.avatar);
})

//section
const section = new Section(
  {
    items: [],
    renderer: (item) => {
      section.addItem(createCardElement(item));
    }
  },
  '.elements'
);
section.renderItems();

api.getInitialCards().then((cards) => {
  cards.forEach((card) => {

    section.addItem(createCardElement(card));
  });
});
