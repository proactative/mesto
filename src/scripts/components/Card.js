export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick= handleCardClick;
    this.createCard();
  }

  _toggleLike() {
    this._newCardLikeButton.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._newCard.remove();
  }

  _handleThisCardClick() {
    this._handleCardClick(this._name, this._link);
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

    this._newCardLikeButton.addEventListener('click', () => this._toggleLike());
    this._newCardDeleteButton.addEventListener('click',() => this._deleteCard());
    this._newCardImage.addEventListener('click', () => this._handleThisCardClick());

    return this._newCard;
  }


}
