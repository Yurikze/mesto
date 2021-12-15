export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => this._parseResponse(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => this._parseResponse(res));
  }

  updateUserInfo(userData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userData.userName,
        about: userData.userInfo,
      }),
    }).then((res) => this._parseResponse(res));
  }

  addCard(userData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: userData.name,
        link: userData.link,
      }),
    }).then(this._parseResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(this._parseResponse);
  }

  likeCard(cardId, liked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: liked ? 'DELETE' : 'PUT',
    }).then(this._parseResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._parseResponse);
  }
}
