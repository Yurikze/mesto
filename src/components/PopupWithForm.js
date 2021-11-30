import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
  }

  close = (e) => {
    super.close(e);
    if (super.close(e)) {
      const submitBtn = this._form.querySelector('.popup__submit');
      submitBtn.disabled = true;
      submitBtn.classList.add('popup__submit_disabled');
    }
  };

  setEventListeners(data = {}) {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      // Если не удалять обработчик сабмита с формы, тогда при каждом открытии попапа создаются новые обработчики. Непонятно, почему не нужно удать сабмит.
      this._handleFormSubmit(evt);
    });
    this._inputs[0].value = data.name || ''; // Это не только очистка полей форма, но в первую очередь установка значение инпутов формы редактирования данных пользователя.
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
