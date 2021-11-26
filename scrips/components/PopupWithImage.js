import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (src, title) => {
    super.open();
    this._popup.querySelector('.popup-image__img').src = src;
    this._popup.querySelector('.popup-image__subtitle').textContent = title;
  }
}
