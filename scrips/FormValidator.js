export class FormValidator {
  constructor(props, formEl) {
    this._formEl = formEl;
    this._props = props;
  }

  _addListenerToInput(input) {
    input.addEventListener('input', (evt) => this._handleFieldValidation(evt));
  }

  _handleFieldValidation(evt) {
    const { target } = evt;
    const errorEl = document.querySelector(`.${target.id}-error`);
    errorEl.textContent = target.validationMessage;
    target.classList.toggle(
      this._props.inputErrorClass,
      !target.validity.valid
    );
    errorEl.classList.toggle(this._props.errorClass, !target.validity.valid);
  }

  _setSubmitBtnState() {
    const btn = this._formEl.querySelector(this._props.submitButtonSelector);
    btn.disabled = !this._formEl.checkValidity();
    btn.classList.toggle(this._props.inactiveButtonClass, !this._formEl.checkValidity());
  }

  enableValidation() {
    const inputElements = [
      ...this._formEl.querySelectorAll(this._props.inputSelector),
    ];
    inputElements.forEach((input) => this._addListenerToInput(input));
    this._formEl.addEventListener('input', (evt) => this._setSubmitBtnState());
    this._setSubmitBtnState();
  }
}
