import { initialCards } from './utils.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add-btn');
const forms = [...document.querySelectorAll('.popup__form')];

const userInfo = new UserInfo({
  userName: '.profile__title',
  userInfo: '.profile__subtitle',
});

const imagePopup = new PopupWithImage({ popupSelector: '.popup-image' });

const editPopup = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const addPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (data) => {
    const place = new Card(
      { name: data.title, link: data.subtitle },
      '#place__li',
      imagePopup.open
    );
    const placeElem = place.generateCard();
    placesSection.addItem(placeElem);
  },
});

forms.forEach((form) => {
  const validateForm = new FormValidator(
    {
      inputSelector: '.popup__input',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active',
      submitButtonSelector: '.popup__submit',
      inactiveButtonClass: 'popup__submit_disabled',
    },
    form
  );
  validateForm.enableValidation();
});

const placesSection = new Section(
  {
    items: initialCards,
    renderer: (placeItem) => {
      const place = new Card(placeItem, '#place__li', imagePopup.open);
      const placeElem = place.generateCard();
      placesSection.addItem(placeElem);
    },
  },
  '.places__list'
);

placesSection.renderItems();

editBtn.addEventListener('click', () =>
  editPopup.open.bind(editPopup)(userInfo.getUserInfo())
);
addBtn.addEventListener('click', addPopup.open.bind(addPopup));
