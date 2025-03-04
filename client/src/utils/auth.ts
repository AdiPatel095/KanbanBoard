import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Retrieves and decodes the token from localStorage
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  // Returns true if a token exists and is not expired
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  // Checks if the token is expired by comparing the exp value with the current time
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        // exp is in seconds, so we compare it to the current time in seconds
        return decoded.exp < Date.now() / 1000;
      }
      return false;
    } catch (error) {
      // If decoding fails, consider the token as expired
      return true;
    }
  }

  // Retrieves the token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  // Stores the token in localStorage and redirects to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Removes the token from localStorage and redirects to the login page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
