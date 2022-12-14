import decode from 'jwt-decode';

class AuthService {

    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if user is still logged in
    loggedIn() {
        // checks if there is a saved token and it's if still valid
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if token has expired
    isTokenExpired(token) {
        try {
            const decoded = decoded(token);
            if (decode.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from local storage
    getToken() {
        // retrieves the user token from local storage
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        // saves user token to local storage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // clear token in localStorage and force logout with reload
    logout() {
        // clear token and profile data from localStorage
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

}

export default new AuthService();