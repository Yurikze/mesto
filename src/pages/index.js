import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';

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

const getUserInfo = api.getUserInfo();
const getInitialCards = api.getInitialCards();
Promise.all([getUserInfo, getInitialCards])
  .then(([userData, initialCards]) => {
    const userInfo = new UserInfo({
      userName: '.profile__title',
      userInfo: '.profile__subtitle',
    });
    userInfo.setUserInfo({
      userName: userData.name,
      userInfo: userData.about,
    });
    userInfo.setUserId(userData._id);

    const imagePopup = new PopupWithImage('.popup-image');

    const deletePopup = new PopupWithSubmit('.popup-delete');

    const returnNewPlace = (data) => {
      const place = new Card({
        data: { ...data, myId: userInfo.getUserInfo().userId },
        tmpSelector: '#place__li',
        handleCardClick: imagePopup.open,
        handleDeleteIconClick: (card) => {
          deletePopup.open();
          deletePopup.setSubmitAction((e) => {
            api
              .deleteCard(card._id)
              .then(() => {
                card.removeCard();
                deletePopup.close(e);
              })
              .catch((err) => console.log(`Ошибка удаления: ${err}`));
          });
          deletePopup.setEventListeners();
        },
        handleLikeClick: (card) => {
          api
            .likeCard(card._id, card._isLiked())
            .then((res) => {
              card._setLikes(res.likes);
              card._setLikeState();
              card._setLikeCount();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
      return place;
    };

    const placesSection = new Section(
      {
        items: initialCards.reverse(),
        renderer: (placeItem) => {
          const place = returnNewPlace(placeItem);
          const placeElem = place.generateCard();
          placesSection.addItem(placeElem);
        },
      },
      '.places__list'
    );

    const editPopup = new PopupWithForm({
      popupSelector: '.popup-edit',
      handleFormSubmit: (e) => {
        e.preventDefault();
        const data = editPopup._getInputValues();
        api
          .updateUserInfo({ name: data.userName, about: data.userInfo })
          .then((res) => {
            userInfo.setUserInfo(data);
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`);
          });
        editPopup.close(e);
      },
    });

    const addPopup = new PopupWithForm({
      popupSelector: '.popup-add',
      handleFormSubmit: (e) => {
        e.preventDefault();
        const data = addPopup._getInputValues();
        api.addCard({ name: data.title, link: data.subtitle }).then((res) => {
          const place = returnNewPlace(res);
          const placeElem = place.generateCard();
          placesSection.addItem(placeElem);
        });

        addPopup.close(e);
      },
    });

    const onOpenEditPopoup = () => {
      editPopup.open();
      const data = userInfo.getUserInfo();
      editPopup.setEventListeners(data);
    };

    editBtn.addEventListener('click', onOpenEditPopoup);

    const onOpenAddPopup = () => {
      addPopup.open();
      addPopup.setEventListeners();
    };

    addBtn.addEventListener('click', onOpenAddPopup);

    return {
      placesSection,
    };
  })
  .then(({ placesSection }) => {
    placesSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
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
