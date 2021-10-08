const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close-btn');
const nameInput = popup.querySelector('[name=name].popup__input-text');
const subtitleInput = popup.querySelector('[name=subtitle].popup__input-text');
const form = popup.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');
const placeTemplate = document.querySelector('#place__li').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const renderPlaceItem = (item) => {
  const placeElem = placeTemplate.querySelector('.places__li').cloneNode(true);
  placeElem.querySelector('.places__img').src = item.link;
  placeElem.querySelector('.places__img').alt = item.name;
  placeElem.querySelector('.places__title').textContent = item.name;

  placesList.append(placeElem);
};

initialCards.forEach(renderPlaceItem);

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
