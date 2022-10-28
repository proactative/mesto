import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

import {
  profileEditButton,
  personField,
  jobField,
  avatarField,
  nameInput,
  jobInput,
  elementAddButton,
  avatarArea,
  popupAddElement,
  templateElement,
  elementAddForm,
  validationConfig,
  popupEditProfile,
  avatarUpdateForm,
  popupEditAvatar
} from '../utils/constants.js';

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
  popupWithConfirmation.setDeleteCardFromServerCallback(() => api.deleteCard(cardId).catch((err) => console.log(`Ошибка: ${err}`)));
}

//creating a new card
function addLike(id) {
  api.addLike(id).catch((err) => console.log(`Ошибка: ${err}`));
}

function removeLike(id) {
  api.deleteLike(id).catch((err) => console.log(`Ошибка: ${err}`));
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
  api.updateAvatar(url['avatar-link'])
    .then(() => {
      userInfo.setAvatar(url['avatar-link']);
      popupWithFormForAvatar.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupWithFormForAvatar.setInitialButtonText();
  });
}

const popupWithFormForAvatar = new PopupWithForm('.popup_type_update-avatar', changeAvatarSubmitFormHandler);
popupWithFormForAvatar.setEventListeners();

//edit profile
function editProfileFormSubmitHandler(formNewInfo) {
  api.editProfile(formNewInfo["full-name"], formNewInfo.job)
    .then(() => {
      userInfo.setUserInfo({ name: formNewInfo["full-name"], job: formNewInfo.job });
      editProfilePopup.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      editProfilePopup.setInitialButtonText();
  });
}

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', editProfileFormSubmitHandler);
editProfilePopup.setEventListeners();

//оpen edit-profile-popup via clicking on icon
profileEditButton.addEventListener('click', () => {
  editProfilePopup.open();

  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;

  editFormValidation.resetValidation();
  editFormValidation.disableSubmitButton();
});

//open avatar-popup via clicking on pencil
avatarArea.addEventListener('click', () => {
  popupWithFormForAvatar.open();
  avatarUpdateForm.reset();
  updateAvatarFormValidation.resetValidation();
  updateAvatarFormValidation.disableSubmitButton();
});

//adding a new card
function addElementFormSubmitHandler(data) {
  api.addCard(data['place-name'], data['place-link'])
    .then((data) => {                             //данные с сервера о новосозданной карточке
      section.addItem(createCardElement(data));
      addElementPopup.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      addElementPopup.setInitialButtonText();
  });
}


const addElementPopup = new PopupWithForm('.popup_type_add-element', addElementFormSubmitHandler);
addElementPopup.setEventListeners();

//open via clicking on the icon
elementAddButton.addEventListener('click', () => {
  addElementPopup.open();
  elementAddForm.reset();
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

//userInfo
const userInfo = new UserInfo({ name: personField, job: jobField, avatar: avatarField });

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then((response) => {
    const data = response[0];
    const cards = response[1];

    userInfo.setUserInfo({ name: data.name, job: data.about, id: data._id });
    userInfo.setAvatar(data.avatar);

    cards.forEach((card) => {
      section.addItem(createCardElement(card));
    })
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
