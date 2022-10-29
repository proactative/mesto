export default class Card {
  constructor(cardData, templateSelector, handleCardClick, handleConfirmationPopupOpen, myId, handleLikeCallback, handleDislikeCallback) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._myId = myId;
    this._cardData = cardData;
    this._likesAmountNumber = cardData.likes.length;
    this._template = document.querySelector(templateSelector);
    this._handleCardClick = handleCardClick;
    this._handleConfirmationPopupOpen = handleConfirmationPopupOpen;
    this.createCard();
    this._handleLikeCallback = handleLikeCallback;
    this._handleDislikeCallback = handleDislikeCallback;
    this._likeIsMine = false;
  }

  getCardId() {
    return this._cardId;
  }

  _runApiLikeRequest() {
    if (this._newCardLikeButton.classList.contains('element__like_active')) {
      this._handleDislikeCallback(this);
    } else {
      this._handleLikeCallback(this);
    }
  }

  toggleLike() {
    this._newCardLikeButton.classList.toggle('element__like_active');

    if (this._newCardLikeButton.classList.contains('element__like_active')) {
      this._likesAmountElement.textContent = this._likesAmountNumber += 1;

    } else {
      this._likesAmountElement.textContent = this._likesAmountNumber -= 1;
    }
  }

  _isLikeMine() {
    this._cardData.likes.forEach((cardDataLike) => {
      if (cardDataLike._id == this._myId) {
        this._likeIsMine = true;
      }
    });
  }

  deleteDomCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _handleThisCardClick() {
    this._handleCardClick(this._name, this._link);
  }

  createCard() {
    this._newCard = this._template.content.querySelector('.element').cloneNode(true);

    this._newCardImage = this._newCard.querySelector('.element__image');
    this._newCardTitle = this._newCard.querySelector('.element__title');
    this._newCardLikeButton = this._newCard.querySelector('.element__like');
    this._newCardDeleteButton = this._newCard.querySelector('.element__delete-button');
    this._likesAmountElement = this._newCard.querySelector('.element__like-counter');

    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._name;
    this._newCardTitle.textContent = this._name;
    this._likesAmountElement.textContent = this._likesAmountNumber;

    this._isLikeMine();
    if (this._likeIsMine) {
      this._newCardLikeButton.classList.add('element__like_active');
    }

    this._newCardImage.addEventListener('click', () => this._handleThisCardClick());
    this._newCardLikeButton.addEventListener('click', () => this._runApiLikeRequest());

    //show confirmation-popup before deleting card
    if (this._ownerId == this._myId) {
      this._newCardDeleteButton.classList.add('element__delete-button_visible');
      this._newCardDeleteButton.addEventListener('click', () => {
        this._handleConfirmationPopupOpen(this);
      });
    }
    return this._newCard;
  }
}
