export default class FormValidator {
  constructor(
    {
      inputErrorClass,
      errorClass,
      submitButtonSelector,
      inactiveButtonClass,
      inputSelector,
    },
    formElement
  ) {
    this._formElement = formElement;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputSelector = inputSelector;
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._button = this._formElement.querySelector(this._submitButtonSelector);
  }

  _addListenerToInput(input) {
    input.addEventListener('input', (evt) => {
      this._handleFieldValidation(evt);
      this._setSubmitBtnState();
    });
  }

  _handleFieldValidation(evt) {
    const { target } = evt;
    const errorEl = document.querySelector(`.${target.id}-error`);
    errorEl.textContent = target.validationMessage;
    target.classList.toggle(this._inputErrorClass, !target.validity.valid);
    errorEl.classList.toggle(this._errorClass, !target.validity.valid);
  }

  _setSubmitBtnState() {
    this._button.disabled = !this._formElement.checkValidity();
    this._button.classList.toggle(
      this._inactiveButtonClass,
      !this._formElement.checkValidity()
    );
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass)
    const errorEl = document.querySelector(`.${inputElement.id}-error`);
    errorEl.textContent = ''
    errorEl.classList.remove(this._errorClass)
  }

  resetValidation() {
    this._setSubmitBtnState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._inputElements.forEach((input) => this._addListenerToInput(input));
    this._setSubmitBtnState();
  }
}
