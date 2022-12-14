import Popup from './Popup.js';

export default class PopupWithImage extends Popup{

  constructor (selector) {
    super(selector);
    this._figureImage = document.querySelector('.figure__image');
    this._figureCaption = document.querySelector('.figure__caption');
  }

  open({name, link}) {
    this._figureImage.src = link;
    this._figureCaption.textContent = name;
    this._figureImage.setAttribute('alt', name);
    super.open();
  }
}
