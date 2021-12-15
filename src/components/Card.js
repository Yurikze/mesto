export default class Card {
  constructor({
    data,
    tmpSelector,
    handleCardClick,
    handleDeleteIconClick,
    handleLikeClick,
  }) {
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._id = data._id;
    this._cardTitle = data.name;
    this._link = data.link;
    this._tmpSelector = tmpSelector;
    this._likes = data.likes;
    this._myId = data.myId;
    this._owner = data.owner._id;
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._tmpSelector)
      .content.querySelector('.places__li')
      .cloneNode(true);

    return cardEl;
  }

  _isLiked() {
    return Boolean(this._likes.find((item) => item._id === this._myId));
  }

  setLikesInfo(likes) {
    this._setLikes(likes)
    this._setLikeState()
    this._setLikeCount()
  }

  _setLikes(likes) {
    this._likes = likes;
  }

  _setLikeState() {
    if (this._isLiked()) {
      this._likeBtn.classList.add('places__like-btn_active');
    } else {
      this._likeBtn.classList.remove('places__like-btn_active');
    }
  }

  _setLikeCount() {
    this._likeCount.textContent = this._likes.length;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _addEvtListenersToCard() {
    this._likeBtn.addEventListener('click', () => this._handleLikeClick(this));
    this._deleteBtn.addEventListener('click', () =>
      this._handleDeleteIconClick(this)
    );
    this._element
      .querySelector('.places__img')
      .addEventListener('click', () =>
        this._handleCardClick(this._link, this._cardTitle)
      );
  }

  generateCard() {
    this._element = this._getTemplate();
    const placeImg = this._element.querySelector('.places__img');
    placeImg.src = this._link;
    placeImg.alt = this._cardTitle;
    this._element.querySelector('.places__title').textContent = this._cardTitle;
    this._likeCount = this._element.querySelector('.places__like-count');
    this._likeBtn = this._element.querySelector('.places__like-btn');
    this._deleteBtn = this._element.querySelector('.places__delete-icon');
    this._myId !== this._owner
      ? (this._deleteBtn.style.display = 'none')
      : 'block';
    this._setLikeState();
    this._setLikeCount();
    this._addEvtListenersToCard();
    return this._element;
  }
}
