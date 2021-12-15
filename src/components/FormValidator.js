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
      this._handleFieldValidation(evt)
      this._toggleButtonState(this._inputElements, this._button)
    });
  }

  _handleFieldValidation(evt) {
    const { target } = evt;
    const errorEl = document.querySelector(`.${target.id}-error`);
    errorEl.textContent = target.validationMessage;
    target.classList.toggle(this._inputErrorClass, !target.validity.valid);
    errorEl.classList.toggle(this._errorClass, !target.validity.valid);
  }

  setSubmitBtnState() {
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

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      this._button.disabled = true
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      this._button.disabled = ''
    }
  };

  enableValidation() {
    this._inputElements.forEach((input) => this._addListenerToInput(input));
    this.setSubmitBtnState();
  }
}
