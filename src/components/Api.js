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
    }).then(res => this._parseResponse(res))
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    }).then(res => this._parseResponse(res))
  }

  updateUserInfo(userData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    }).then(res => this._parseResponse(res))
  }

  addCard(userData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: userData.name,
        link: userData.link
      })
    }).then(res => this._parseResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(res => this._parseResponse(res))
  }

  likeCard(cardId, liked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: liked ? 'DELETE' : 'PUT'
    }).then(res => this._parseResponse(res))
  }

}
