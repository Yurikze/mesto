import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._submitBtn = this.form.querySelector('.popup__submit');
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = 'Сохранить';
    }
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      if (data.hasOwnProperty(input.name)) {
        input.value = data[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
      this.form.reset()
    });
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
