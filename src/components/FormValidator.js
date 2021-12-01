export default class FormValidator {
  constructor({inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass, inputSelector}, formEl) {
    this._formEl = formEl;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputSelector = inputSelector;
  }

  text() {
    console.log(1)
  }

  _addListenerToInput(input) {
    input.addEventListener('input', (evt) => this._handleFieldValidation(evt));
  }

  _handleFieldValidation(evt) {
    const { target } = evt;
    const errorEl = document.querySelector(`.${target.id}-error`);
    errorEl.textContent = target.validationMessage;
    target.classList.toggle(
      this._inputErrorClass,
      !target.validity.valid
    );
    errorEl.classList.toggle(this._errorClass, !target.validity.valid);
  }

  _setSubmitBtnState() {
    const btn = this._formEl.querySelector(this._submitButtonSelector);
    btn.disabled = !this._formEl.checkValidity();
    btn.classList.toggle(this._inactiveButtonClass, !this._formEl.checkValidity());
  }

  enableValidation() {
    const inputElements = [
      ...this._formEl.querySelectorAll(this._inputSelector),
    ];
    inputElements.forEach((input) => this._addListenerToInput(input));
    this._formEl.addEventListener('input', this._setSubmitBtnState.bind(this));
    this._setSubmitBtnState();
  }
}
