export default class Card {
  constructor(cardData, templateSelector, zoomPhoto) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._zoomPhoto = zoomPhoto;
  }

  _toggleLike() {
    this._newCardLikeButton.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._newCard.remove();
  }

  _zoomThisPhoto() {
    this._zoomPhoto(this._name, this._link);
  }

  createCard() {

    this._newCard = this._templateSelector.content.querySelector('.element').cloneNode(true);

    this._newCardImage = this._newCard.querySelector('.element__image');
    this._newCardTitle = this._newCard.querySelector('.element__title');
    this._newCardLikeButton = this._newCard.querySelector('.element__like');
    this._newCardDeleteButton = this._newCard.querySelector('.element__delete-button');

    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._name;
    this._newCardTitle.textContent = this._name;

    //слушатели
    this._newCardLikeButton.addEventListener('click', () => this._toggleLike());
    this._newCardDeleteButton.addEventListener('click',() => this._deleteCard());
    this._newCardImage.addEventListener('click', () => this._zoomThisPhoto());

    return this._newCard;
  }


}
