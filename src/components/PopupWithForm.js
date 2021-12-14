import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._submitBtn = this._form.querySelector('.popup__submit');
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = 'Сохранить'
    }
  }

  close(e) {
    super.close(e);
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains('popup__close-btn') ||
      e.type === 'sumbit'
    ) {
      this._form.reset();
      this._submitBtn.disabled = true;
      this._submitBtn.classList.add('popup__submit_disabled');
    }
  }

  _setValues(data) {
    this._inputs[0].value = data.name || '';
    this._inputs[1].value = data.userInfo || '';
  }

  setEventListeners(data) {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
    if (data) {
      this._setValues(data)
    }
  }

  _getInputValues() {
    return Array.from(this._inputs).reduce((res, input) => {
      return {
        ...res,
        [input.name]: input.value,
      };
    }, {});
  }
}
