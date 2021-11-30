export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_is-visible');
  }

  close(e) {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains('popup__close-btn')
    ) {
      this._popup.classList.remove('popup_is-visible');
      this._popup.removeEventListener('click', this.close);
      return true
    }
  };

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this._popup.classList.remove('popup_is-visible');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  };

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this.close);
  }
}