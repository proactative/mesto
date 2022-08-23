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

/*------------------------------------functions-----------------------------*/

function toggleLike(e) {
  e.target.classList.toggle('element__like_active');
}

function deleteCard(e) {
  e.target.closest('.element').remove();
}

function openPopup(neededPopup) {
  neededPopup.classList.add('popup_opened');
}

function closePopup(neededPopup) {
  neededPopup.classList.remove('popup_opened');
}

function zoomPhoto(e) {
  openPopup(popupZoomPhoto);
  figureImage.src = e.target.closest('.element').querySelector('.element__image').src;
  figureCaption.textContent = e.target.closest('.element').querySelector('.element__title').textContent;
}
closeZoomButton.addEventListener('click',() => closePopup(popupZoomPhoto));

function createCard(cardData) {
  const newCard = templateElement.content.querySelector('.element').cloneNode(true);

  const newCardImage = newCard.querySelector('.element__image');
  const newCardTitle = newCard.querySelector('.element__title');
  const newCardLikeButton = newCard.querySelector('.element__like');
  const newCardDeleteButton = newCard.querySelector('.element__delete-button')

  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;
  newCardTitle.textContent = cardData.name;
  //обработчики событий
  newCardLikeButton.addEventListener('click', toggleLike);
  newCardDeleteButton.addEventListener('click', deleteCard);
  newCardImage.addEventListener('click', zoomPhoto);

  return newCard;
}

function addCard(cardData) {
  newCard = createCard(cardData);
  elementsContainer.prepend(newCard);
}

/*загрузка карточек из массива*/
initialCards.forEach(addCard);

/*редактирование профиля*/
function openEditProfilePopup() {
  openPopup(popupEditProfile);
  nameInput.value = personField.textContent;
  jobInput.value = jobField.textContent;
}

function editProfileFormSubmitHandler(e) {
  e.preventDefault();
  personField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

editProfileButton.addEventListener('click', openEditProfilePopup);
editProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);

/*добавление новой карточки*/
function addElement(e) {
  e.preventDefault();
  addCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  });
  addElementForm.reset();
  closePopup(popupAddElement);
}

addButton.addEventListener('click', () => openPopup(popupAddElement));
closeAddButton.addEventListener('click', () => closePopup(popupAddElement));
popupAddElement.addEventListener('submit', addElement);
