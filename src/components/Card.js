export default class Card {
  constructor({id, data, tmpSelector, handleCardClick, likes}) {
    this._handleCardClick = handleCardClick;
    this.id = id
    this._cardTitle = data.name;
    this._link = data.link;
    this._tmpSelector = tmpSelector;
    this._likes = likes;
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._tmpSelector)
      .content.querySelector('.places__li')
      .cloneNode(true);

    return cardEl;
  }

  _toggleLikeHandler(e) {
    e.target.classList.toggle('places__like-btn_active');
  }

  _removeCardHandler(e) {
    this.closest('.places__li').remove();
    this._element = null;
  }

  _addEvtListenersToCard() {
    this._element
      .querySelector('.places__like-btn')
      .addEventListener('click', this._toggleLikeHandler);
    this._element
      .querySelector('.places__delete-icon')
      .addEventListener('click', this._removeCardHandler);
    this._element
      .querySelector('.places__img')
      .addEventListener('click', () => this._handleCardClick(this._link, this._cardTitle));
  }

  generateCard() {
    this._element = this._getTemplate();
    const placeImg = this._element.querySelector('.places__img');
    placeImg.src = this._link;
    placeImg.alt = this._cardTitle;
    this._element.querySelector('.places__title').textContent = this._cardTitle;
    this._element.querySelector('.places__like-count').textContent = this._likes.length;
    this._addEvtListenersToCard();
    return this._element;
  }
}
