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
    this._inputs[0].value = data.name;
    this._inputs[1].value = data.userInfo;
  }

  close(e) {
    super.close(e)
    if (e.type === 'submit') {
      this._form.reset()
    }
  }

  _onFormSubmit(e) {
    e.preventDefault();
    const data = this._getInputValues(); //Получаем данные из полей формы
    this._handleFormSubmit(data); //Передаем данные в колбэк конструктора попапа
    this._form.removeEventListener('submit', this._onFormSubmit);
    this.close(e);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._onFormSubmit.bind(this));
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
