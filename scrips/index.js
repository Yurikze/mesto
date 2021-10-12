const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add-btn');
const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup-edit');
const nameInput = popupEdit.querySelector('[name=title].popup__input-text');
const subtitleInput = popupEdit.querySelector(
  '[name=subtitle].popup__input-text'
);
const popupAdd = document.querySelector('.popup-add');
const placeTitleInput = popupAdd.querySelector(
  '[name=title].popup__input-text'
);
const placeImgSrcInput = popupAdd.querySelector(
  '[name=subtitle].popup__input-text'
);

const placeTemplate = document.querySelector('#place__li').content;
const popupImg = document.querySelector('.popup-image');
const popupImgSrc = popupImg.querySelector('.popup-image__img');
const popupImgText = popupImg.querySelector('.popup-image__subtitle');

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

const createCard = (item) => {
  const placeElem = placeTemplate.querySelector('.places__li').cloneNode(true);
  const placeImg = placeElem.querySelector('.places__img');
  placeImg.src = item.link;
  placeImg.alt = item.name;
  placeElem.querySelector('.places__title').textContent = item.name;
  placeElem
    .querySelector('.places__like-btn')
    .addEventListener('click', (e) => {
      e.target.classList.toggle('places__like-btn_active');
    });
  placeElem
    .querySelector('.places__delete-icon')
    .addEventListener('click', (e) => {
      e.target.parentNode.remove();
    });
  placeImg.addEventListener('click', (e) => {
    if (e.currentTarget === e.target) {
      openPopupHandler(popupImg);
      popupImgSrc.src = item.link;
      popupImgSrc.alt = item.name;
      popupImgText.textContent = item.name;
      popupImg
        .querySelector('.popup__close-btn')
        .addEventListener('click', () => closePopupHandler(popupImg));
    }
  });
  return placeElem;
};

const renderPlaceItem = (item) => {
  const placeElem = createCard(item);
  placesList.prepend(placeElem);
};

initialCards.forEach(renderPlaceItem);

const openPopupHandler = (popup) => {
  popup.classList.add('popup_is-visible');
};

const closePopupHandler = (popup) => {
  popup.classList.remove('popup_is-visible');
};

const editFormDataHandler = () => {
  openPopupHandler(popupEdit);
  popupEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = subtitleInput.value;
    closePopupHandler(popupEdit);
  });
  nameInput.value = title.textContent;
  subtitleInput.value = subtitle.textContent;
  popupEdit
    .querySelector('.popup__close-btn')
    .addEventListener('click', () => closePopupHandler(popupEdit));
};

const addPlaceHandler = () => {
  openPopupHandler(popupAdd);
  popupAdd.querySelector('.popup__form').addEventListener('submit', (e) => {
    e.preventDefault();
    const placeItem = {
      name: placeTitleInput.value,
      link: placeImgSrcInput.value,
    };
    renderPlaceItem(placeItem);
    placeTitleInput.value = '';
    placeImgSrcInput.value = '';
    closePopupHandler(popupAdd);
  });
  popupAdd
    .querySelector('.popup__close-btn')
    .addEventListener('click', () => closePopupHandler(popupAdd));
};

editBtn.addEventListener('click', editFormDataHandler);
addBtn.addEventListener('click', addPlaceHandler);
