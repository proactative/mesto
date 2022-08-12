/*for function openPopup*/
let container = document.querySelector('.page__container');
let profile = container.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');

/*for function formSubmitHandler*/
let person = profile.querySelector('.profile__title');
let job = profile.querySelector('.profile__text');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let form = popupContainer.querySelector('.popup__form');
let nameInput = form.querySelector('.popup__input_type_name');
let jobInput = form.querySelector('.popup__input_type_job');

/*for function closePopup*/
let closeButton = popup.querySelector('.popup__close-link');

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
