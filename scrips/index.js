const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add-btn');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close-btn');
const nameInput = popup.querySelector('[name=title].popup__input-text');
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

  placesList.prepend(placeElem);
};

initialCards.forEach(renderPlaceItem);

const openPopupHandler = () => {
  popup.classList.add('popup_is-visible');
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
  openPopupHandler();
  popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
  nameInput.value = title.textContent;
  subtitleInput.value = subtitle.textContent;
};

const addPlaceHandler = (e) => {
  openPopupHandler();
  const newPlace = {};
  popup.querySelector('.popup__title').textContent = 'Новое место';
  nameInput.placeholder = 'Название';
  nameInput.value = '';
  subtitleInput.placeholder = 'Ссылка на картинку';
  subtitleInput.value = '';

  const formAddPlaceHandler = (evt) => {
    evt.preventDefault();

    newPlace.name = nameInput.value;
    newPlace.link = subtitleInput.value;
    renderPlaceItem(newPlace);

    form.removeEventListener('submit', formAddPlaceHandler);
    form.addEventListener('submit', formSubmitHandler);

    closePopupHandler();
  };

  form.removeEventListener('submit', formSubmitHandler);
  form.addEventListener('submit', formAddPlaceHandler);
};

const formSubmitHandler = (e) => {
  e.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = subtitleInput.value;
  closePopupHandler();
};

editBtn.addEventListener('click', editFormDataHandler);
closeBtn.addEventListener('click', closePopupHandler);
addBtn.addEventListener('click', addPlaceHandler);
form.addEventListener('submit', formSubmitHandler);
