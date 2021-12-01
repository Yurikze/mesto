import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
  }

  close(e) {
    super.close(e);
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains('popup__close-btn') ||
      e.type === 'sumbit'
    ) {
      this._form.reset();

      // Если избавиться от операций с кнопкой внутри попапа, тогда после сабмита формы, при открытии попапа кнопка сабмита активна,
      // так как не срабатывает никакой метод класса FormValidator

      const submitBtn = this._form.querySelector('.popup__submit');
      submitBtn.disabled = true;
      submitBtn.classList.add('popup__submit_disabled');
    }
  }

  setEventListeners(data = {}) {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
    this._inputs[0].value = data.name || '';
    this._inputs[1].value = data.userInfo || '';
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
