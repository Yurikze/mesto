const enableValidation = (props) => {
  const forms = [...document.querySelectorAll(props.formSelector)];
  const a = 1;
  forms.forEach((form) => {
    addListenerToForm((form = form), props);
    form.addEventListener('submit', (evt) => {
      const { target } = evt;
      const data = [...target.querySelectorAll(props.inputSelector)].reduce(
        (sum, input) => ({
          ...sum,
          [input.name]: input.value,
        }),
        {}
      );
    });
  });
};

const addListenerToForm = (form, props) => {
  const inputElements = [...form.querySelectorAll(props.inputSelector)];
  inputElements.forEach((inputEl) => {
    addListenerToInput((inputEl = inputEl), props);
  });
};

const addListenerToInput = (inputEl, props) => {
  inputEl.addEventListener('input', (evt) => {
    handleFieldValidation((evt = evt), props);
  });
};

const handleFieldValidation = (evt, props) => {
  const { target } = evt;
  const errorEl = document.querySelector(`.${target.id}-error`);
  errorEl.textContent = target.validationMessage;
  target.classList.toggle(props.inputErrorClass, !target.validity.valid);
  errorEl.classList.toggle(props.errorClass, !target.validity.valid);
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});
