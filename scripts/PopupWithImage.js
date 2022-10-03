export default class PopupWithImage extends Popup{

  constructor (data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  openPopupwithImage() {
    let open = super.open(this._name, this._link);

    figureImage.src = this._link;
    figureCaption.textContent = this._name;
    figureImage.setAttribute('alt', this._name);

    return open;
  }
}
