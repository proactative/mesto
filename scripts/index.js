/*for function openPopup*/
let container = document.querySelector('.page__container');
let profile = container.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');

/*for function formSubmitHandler*/
let person = profile.querySelector('.profile__title');
let job = profile.querySelector('.profile__text');
let popup = document.querySelector('.popup_type_edit-profile');
let popupContainer = popup.querySelector('.popup__container');
let form = popupContainer.querySelector('.popup__form');
let nameInput = form.querySelector('.popup__input_type_name');
let jobInput = form.querySelector('.popup__input_type_job');

/*for function closePopup*/
let closeButton = popup.querySelector('.popup__close_type_edit-profile');

/*for function openAddForm*/
let addButton = document.querySelector('.profile__add-button');
let popupAddElement = document.querySelector('.popup_type_add-element');

/*for function closeAddForm*/
let closeAddButton = document.querySelector('.popup__close_type_add-element'); //+

/* for function addCard*/
let elementContainer = document.querySelector('.elements');
let templateElement = document.querySelector('.template');

/*for function addElement*/
let placeNameInput = document.querySelector('.popup__input_type_place-name');
let placeLinkInput = document.querySelector('.popup__input_type_link');
let submitElementButton = document.querySelector('.popup__button_type_submit');

/*for functions zoomPhoto & closeZoomPhoto*/
let photos = document.querySelectorAll('.element__image');
let popupZoomPhoto = document.querySelector('.popup_type_zoom-photo');
let figureImage = document.querySelector('.figure__image');
let figureCaption = document.querySelector('.figure__caption');
let closeZoomButton = document.querySelector('.popup__close_type_zoom-photo');

const initialCards = [
  {
    name: 'Северное сияние',
    link: 'https://images.unsplash.com/photo-1589311836849-4cec35b363cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1205&q=80'
  },
  {
    name: 'Петра',
    link: 'https://images.unsplash.com/photo-1591014979179-213bfba5f3b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Большой Барьерный риф',
    link: 'https://images.unsplash.com/photo-1582623838120-455da222cdc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Великая Китайская стена',
    link: 'https://images.unsplash.com/photo-1608037521277-154cd1b89191?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Памуккале',
    link: 'https://images.unsplash.com/photo-1595846415458-404defd93fb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Мачу-Пикчу',
    link: 'https://images.unsplash.com/photo-1461681922067-669418071e5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVjaHUlMjBwaWNjdXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
];

/*------------------------------------functions-----------------------------*/

function toggleLike(e) {
  e.target.classList.toggle('element__like_active');
}

function deleteCard(e) {
  e.target.closest('.element').remove();
}

function zoomPhoto(e) {
  popupZoomPhoto.classList.add('popup_opened');
  figureImage.src = e.target.closest('.element').querySelector('.element__image').src;
  figureCaption.textContent = e.target.closest('.element').querySelector('.element__title').textContent;
}

function closeZoomPhoto() {
  popupZoomPhoto.classList.remove('popup_opened');
}
closeZoomButton.addEventListener('click', closeZoomPhoto);


function addCard(cardData) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector('.element__title').textContent = cardData.name;
  newCard.querySelector('.element__image').src = cardData.link;
  //добавляем обработчики событий
  newCard.querySelector('.element__like').addEventListener('click', toggleLike);
  newCard.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  newCard.querySelector('.element__image').addEventListener('click', zoomPhoto);

  elementContainer.prepend(newCard);
}

/*загрузка карточек из массива*/
initialCards.forEach(addCard);

/*редактирование профиля*/
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = person.textContent;
  jobInput.value = job.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  person.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);

/*добавление новой карточки*/
function openAddForm() {
  popupAddElement.classList.add('popup_opened');
}

function closeAddForm() {
  popupAddElement.classList.remove('popup_opened');
}

function addElement(e) {
  e.preventDefault();
  addCard( {name: placeNameInput.value,
            link: placeLinkInput.value}
  );
  placeNameInput.value = '';//очистили поле ввода
  placeLinkInput.value = '';
  closeAddForm();
}

addButton.addEventListener('click', openAddForm);
closeAddButton.addEventListener('click', closeAddForm);
popupAddElement.addEventListener('submit', addElement);












