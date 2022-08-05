/*for function openPopup*/
let container = document.querySelector('.page__container');
let profile = container.querySelector('.profile');
let editButton = profile.querySelector('.profile__editButton');

/*for function closePopup*/
let closeButton = popup.querySelector('.popup__close-link');

/*for function editProfile*/
let person = profile.querySelector('.profile__title');
let job = profile.querySelector('.profile__text');
let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__container');
let saveButton = form.querySelector('.popup__button');
let nameInput = form.querySelector('.popup__input_type_name');
let jobInput = form.querySelector('.popup__input_type_job');

function openPopup() {
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

function editProfile() {
  person.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup();
}
saveButton.addEventListener('click', editProfile);
