import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Avatar from '../components/Avatar.js';
import Api from '../components/Api.js';
import '../pages/index.css';

const config = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
}

const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add-btn');
const forms = [...document.querySelectorAll('.popup__form')];

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '3af5a01e-7b93-4927-85da-faee16dd46e6',
    'Content-Type': 'application/json',
  },
});

const userInfo = new UserInfo({
  userName: '.profile__title',
  userInfo: '.profile__subtitle',
});

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup-avatar',
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api
      .updateAvatar(data.avaUrl)
      .then((res) => {
        avatar.setUserAvatar(res.avatar);
        avatarPopup.close();
      })
      .catch((err) => `Error setting avatar ${err}`)
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  },
});
avatarPopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup-image');
imagePopup.setEventListeners()

const deletePopup = new PopupWithSubmit('.popup-delete');
deletePopup.setEventListeners()

const avatar = new Avatar({
  avaSelector: '.profile__ava-container',
  clickHandler: () => {
    avatarPopup.open();
  },
});
avatar.setEventListeners();


const returnNewPlace = (data) => {
  const place = new Card({
    data: { ...data, myId: userInfo.getUserInfo().userId },
    tmpSelector: '#place__li',
    handleCardClick: imagePopup.open,
    handleDeleteIconClick: (card) => {
      deletePopup.open();
      deletePopup.setSubmitAction(() => {
        api
          .deleteCard(card._id)
          .then(() => {
            card.removeCard();
            deletePopup.close();
          })
          .catch((err) => console.log(`Ошибка удаления: ${err}`));
      });
    },
    handleLikeClick: (card) => {
      api
        .likeCard(card._id, card._isLiked())
        .then((res) => {
          card.setLikesInfo(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return place;
};

const placesSection = new Section({
  renderer: (placeItem) => {
    const place = returnNewPlace(placeItem);
    const placeElem = place.generateCard();
    placesSection.apendItem(placeElem);
  },
  containerSelector: '.places__list',
});

const editPopup = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleFormSubmit: (data) => {
    editPopup.renderLoading(true);
    api
      .updateUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo({userName: res.name, userInfo: res.about});
        editPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        editPopup.renderLoading(false);
      });
  },
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (data) => {
    api
      .addCard({ name: data.title, link: data.subtitle })
      .then((res) => {
        const place = returnNewPlace(res);
        const placeElem = place.generateCard();
        placesSection.prependItem(placeElem);
        addPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        addPopup.renderLoading(false);
      });
  },
});
addPopup.setEventListeners()

const onOpenEditPopoup = () => {
  editPopup.open();
  const data = userInfo.getUserInfo();
  editPopup.setInputValues(data)
};

editBtn.addEventListener('click', onOpenEditPopoup);

const onOpenAddPopup = () => {
  addPopup.open();
};

addBtn.addEventListener('click', onOpenAddPopup);

forms.forEach((form) => {
  const validateForm = new FormValidator(
    config,
    form
  );
  validateForm.enableValidation();
});

// Async requests
const getUserInfo = api.getUserInfo();
const getInitialCards = api.getInitialCards();

Promise.all([getUserInfo, getInitialCards])
  .then(([userData, initialCards]) => {
    
    avatar.setUserAvatar(userData.avatar);
    userInfo.setUserInfo({
      userName: userData.name,
      userInfo: userData.about,
    });
    userInfo.setUserId(userData._id);
    placesSection.renderItems(initialCards);

  })

  .catch((err) => {
    console.log(err);
  });


