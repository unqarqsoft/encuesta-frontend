import { Injectable } from '@angular/core'

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  public usuario;

  login(username, password) {
    this.usuario = { username: username };
    localStorage.setItem('auth_token', 'authtoken');
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('auth_token');
  }

}
