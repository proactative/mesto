const pageContainer = document.querySelector('.page__container');
const profile = pageContainer.querySelector('.profile');
export const editProfileButton = profile.querySelector('.profile__edit-button');
export const personField = profile.querySelector('.profile__title');
export const jobField = profile.querySelector('.profile__text');
export const avatarField = document.querySelector('.profile__avatar');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('.popup__input_type_name');
export const jobInput = formEditProfile.querySelector('.popup__input_type_job');
export const avatarArea =document.querySelector('.profile__avatar-container');
export const addButton = document.querySelector('.profile__add-button');
export const popupAddElement = document.querySelector('.popup_type_add-element');
export const templateElement = document.querySelector('.template');
export const addElementForm = document.querySelector('.popup__form_type_add-form');
export const updateAvatarForm = document.querySelector('.popup__form_type_update-avatar');
export const popupEditAvatar = document.querySelector('.popup_type_update-avatar');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
