import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
  }

  open(data = {}) {
    super.open();
    this._inputs[0].value = data.name || '';
    this._inputs[1].value = data.userInfo || '';
  }

  _onFormSubmit = (e) => {
    e.preventDefault();
    const submitBtn = this._form.querySelector('.popup__submit');
    const data = this._getInputValues(); //Получаем данные из полей формы
    this._handleFormSubmit(data); //Передаем данные в колбэк конструктора попапа
    this._form.removeEventListener('submit', this._onFormSubmit);
    this.close(e);
    this._form.reset();
    submitBtn.disabled = true;
    submitBtn.classList.add('popup__submit_disabled');
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._onFormSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._onFormSubmit);
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
