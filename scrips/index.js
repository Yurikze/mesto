import { initialCards } from './dummy_data.js';
import { Card } from './Card.js';

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add-btn');
const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup-edit');
const editForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('[name=title].popup__input');
const subtitleInput = popupEdit.querySelector('[name=subtitle].popup__input');
const popupAdd = document.querySelector('.popup-add');
const addForm = popupAdd.querySelector('.popup__form');
const placeTitleInput = popupAdd.querySelector('[name=title].popup__input');
const placeImgSrcInput = popupAdd.querySelector('[name=subtitle].popup__input');

const openPopupHandler = (popup) => {
  popup.classList.add('popup_is-visible');
  document.addEventListener('keydown', onEscPopupHandler);
  document.addEventListener('click', onClosePopup);
};

const renderPlaceItem = (item) => {
  const data = {...item, openPopupHandler}
  const place = new Card(data, '#place__li');
  const placeElem = place.generateCard();
  placesList.prepend(placeElem);
};

initialCards.forEach(renderPlaceItem);

const onEscPopupHandler = (e) => {
  onClosePopup(e);
};

const onClosePopup = (e) => {
  const openedPopup = document.querySelector('.popup_is-visible');

  (e.target.dataset.delete !== undefined &&
    closePopupHandler(e.target.closest('.popup'))) ||
    (e.target.classList.contains('popup') && closePopupHandler(e.target)) ||
    (e.key === 'Escape' && closePopupHandler(openedPopup));
};

const closePopupHandler = (popup) => {
  popup.classList.remove('popup_is-visible');
  document.removeEventListener('keydown', onEscPopupHandler);
  document.removeEventListener('click', onClosePopup);
};

const editFormDataHandler = () => {
  openPopupHandler(popupEdit);
  nameInput.value = title.textContent;
  subtitleInput.value = subtitle.textContent;
};

const editFormSubmitHandler = (e) => {
  e.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = subtitleInput.value;
  closePopupHandler(popupEdit);
};

const addPlaceHandler = (e) => {
  e.preventDefault();
  const placeItem = {
    name: placeTitleInput.value,
    link: placeImgSrcInput.value,
  };
  renderPlaceItem(placeItem);
  placeTitleInput.value = '';
  placeImgSrcInput.value = '';
  closePopupHandler(popupAdd);
  addForm.querySelector('.popup__submit').disabled = true;
};

editBtn.addEventListener('click', editFormDataHandler);
addBtn.addEventListener('click', () => openPopupHandler(popupAdd));
addForm.addEventListener('submit', (e) => addPlaceHandler(e));
editForm.addEventListener('submit', (e) => editFormSubmitHandler(e));
