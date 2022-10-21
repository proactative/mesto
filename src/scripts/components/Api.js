const { data } = require("autoprefixer");

class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //   .then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(new Error(res.status));
  //   })
  //   // .then((result) => {
  //   //   console.log(result)
  //   // })
  //   .catch((err) => Promise.reject(err));
  //  }

  _getRespose(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  }

  // 1 - загрузка информации о пользователе с сервера
  getUserInfo() {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._getResponse)
  }

  // 2 - загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._getResponse);
  }

  //3 - редактирование профиля
  editProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie', //переписать
        about: 'Physicist and Chemist'
      })
    })
    .then(this._getResponse)
  }

  updateAvatar(что?) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: что?.avatar
      })
    })
    .then(this._getResponseData)
  }

  //4 - добавление новой карточки
  addCard({ title, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ title, link })
    })
    .then(this._getResponse);
  }

  //5 - отображение количества лайков
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse);
  }

  //6 - удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse);
  }
}
