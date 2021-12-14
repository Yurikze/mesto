export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this)
  }

  open() {
    this._popup.classList.add('popup_is-visible');
  }

  close(e) {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains('popup__close-btn') ||
      e.target.classList.contains('popup__submit')
    ) {
      this._popup.classList.remove('popup_is-visible');
      this._popup.removeEventListener('click', this.close);
      document.removeEventListener('keydown', this._handleEscClose);
    }
  };

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this._popup.classList.remove('popup_is-visible');
      this._popup.removeEventListener('click', this.close);
      document.removeEventListener('keydown', this._handleEscClose);
    }
  };

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this.close);
  }
}
