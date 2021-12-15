export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleClose = this._handleClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_is-visible');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_is-visible');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleClose(e) {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains('popup__close-btn')
    ) {
      this.close();
    }
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
  
  setEventListeners() {
    this._popup.addEventListener('click', this._handleClose);
  }
}
