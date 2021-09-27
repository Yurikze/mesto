const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close-btn');
const nameInput = popup.querySelector('[name=name].popup__input-text');
const subtitleInput = popup.querySelector('[name=subtitle].popup__input-text');
const form = popup.querySelector('.popup__form');

const openPopupHandler = () => {
  popup.classList.add('popup_is-visible');
  editFormDataHandler(title);
};

const closePopupHandler = () => {
  popup.classList.remove('popup_is-visible');
};

// const closeOverlayHandler = (e) => {
//   if (e.target === e.currentTarget) {
//     popup.classList.remove('popup_is-visible');
//   }
// };

const editFormDataHandler = () => {
  nameInput.value = title.textContent;
  subtitleInput.value = subtitle.textContent;
};

const formSubmitHandler = (e) => {
  e.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = subtitleInput.value;
  closePopupHandler();
};

editBtn.addEventListener('click', openPopupHandler);
closeBtn.addEventListener('click', closePopupHandler);
form.addEventListener('submit', formSubmitHandler);
