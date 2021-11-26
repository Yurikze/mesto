export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_is-visible');
    this.setEventListeners();
  };

  close = (e) => {
    if (
      e.target.classList.contains('popup') ||
      e.target.classList.contains('popup__close-btn')
    ) {
      this._popup.classList.remove('popup_is-visible');
      this._removeEventListeners()
    }
  };

  _handleEscClose = (e) => {
    e.key === 'Escape' && this._popup.classList.remove('popup_is-visible');
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this.close);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this.close);
  }
}
