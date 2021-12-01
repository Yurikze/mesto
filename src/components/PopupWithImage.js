import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  open = (src, title) => {
    this._popup.querySelector('.popup-image__img').src = src;
    this._popup.querySelector('.popup-image__subtitle').textContent = title;
    super.open();
    super.setEventListeners()
  };
}
