class UserStore {
  constructor() {
    if (localStorage.getItem('token')) this.token = localStorage.getItem('token')
    if (localStorage.getItem('user')) this.currentUser = localStorage.getItem('user')
  }

  setToken(token) {
    localStorage.setItem('token', token)
    this.token = token
  }

  setCurrentUser(mail) {
    localStorage.setItem('user', mail)
    this.currentUser = mail
  }

  getCurrentUser() {
    return this.currentUser
  }

  getToken() {
    return this.token
  }
}

export let userStore = new UserStore()