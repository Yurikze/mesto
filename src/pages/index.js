import { initialCards } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add-btn');
const forms = [...document.querySelectorAll('.popup__form')];

const userInfo = new UserInfo({
  userName: '.profile__title',
  userInfo: '.profile__subtitle',
});

const imagePopup = new PopupWithImage('.popup-image');

const placesSection = new Section(
  {
    items: initialCards,
    renderer: (placeItem) => {
      const place = new Card({data: placeItem, tmpSelector: '#place__li', handleCardClick: imagePopup.open});
      const placeElem = place.generateCard();
      placesSection.addItem(placeElem);
    },
  },
  '.places__list'
);

placesSection.renderItems();


const addPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (e) => {
    e.preventDefault()
    const data = addPopup._getInputValues();
    const place = new Card({
      data: { name: data.title, link: data.subtitle },
      tmpSelector: '#place__li',
      handleCardClick: imagePopup.open
    });
    const placeElem = place.generateCard();
    placesSection.addItem(placeElem);
    addPopup.close(e)
  },
});

const editPopup = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleFormSubmit: (e) => {
    e.preventDefault()
    const data = editPopup._getInputValues();
    userInfo.setUserInfo(data)
    editPopup.close(e)
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


const onOpenEditPopoup = () => {
  editPopup.open.bind(editPopup)()
  const data = userInfo.getUserInfo()
  editPopup.setEventListeners(data)
}

const onOpenAddPopup = () => {
  addPopup.open.bind(addPopup)()
  addPopup.setEventListeners()
}

editBtn.addEventListener('click', onOpenEditPopoup)
addBtn.addEventListener('click', onOpenAddPopup);
