import { fetchUser, userLogout } from '../api/ActionCreators';

class UserAuth {
    token;
    details = null;
    isAuthenticated = false;

    static user = new UserAuth();

    constructor() {
        this.loadStorage();
    }

    loadStorage(){
        // Transfer sessionStorage from one tab to another
        if (window.addEventListener) {
            window.addEventListener("storage", this.sessionStorage_transfer, false);
        } else {
            window.attachEvent("onstorage", this.sessionStorage_transfer);
        };
        if (!sessionStorage.length) {
            localStorage.setItem('getSessionStorage', 'foobar');
            localStorage.removeItem('getSessionStorage', 'foobar');
        };

        this.token = sessionStorage.getItem("AUTH_TOKEN") ?? localStorage.getItem("AUTH_TOKEN") ?? null;
        this.id = sessionStorage.getItem("USER_ID") ?? localStorage.getItem("USER_ID") ?? null;        
    }

    async authenticate() {
        if (!this.isAuthenticated && this.token != null && this.id != null) {
            this.details = JSON.parse(sessionStorage.getItem("details")) ?? null
            if (!this.details) {
                this.details = await fetchUser(this.id)
                sessionStorage.setItem("details", JSON.stringify(this.details))
                this.isAuthenticated = true;
            }
            this.isAuthenticated = true;
        }
        return {...this.details, isAuthenticated: this.isAuthenticated, token: this.token }
    }

    async login(user, remember) {
        if (remember === true) {
            localStorage.setItem("AUTH_TOKEN", user.access_token)
            localStorage.setItem("USER_ID", user.id)
        }
        else {
            sessionStorage.setItem("AUTH_TOKEN", user.access_token)
            sessionStorage.setItem("USER_ID", user.id)
        }
        sessionStorage.setItem("details", JSON.stringify(user))
        this.details = user;
        this.id = user.id;
        this.token = user.access_token;
        this.isAuthenticated = true;
        return {...this.details, isAuthenticated: this.isAuthenticated, token: this.token }
    }

    async logout() {
        await userLogout()
        sessionStorage.clear();
        localStorage.clear();
        this.details = null;
        this.token = null;
        this.id = null;
        this.isAuthenticated = false;
        return { isAuthenticated: this.isAuthenticated }
    }

    register() {
        console.log("Register")
    }

    async sessionStorage_transfer(event) {
        if (!event) { event = window.event; } // ie suq
        if (!event.newValue) return;          // do nothing if no value to work with
        if (event.key === 'getSessionStorage') {
            // another tab asked for the sessionStorage -> send it
            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            // the other tab should now have it, so we're done with it.
            localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
        } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
            // another tab sent data <- get it
            var data = JSON.parse(event.newValue);
            for (var key in data) {
                sessionStorage.setItem(key, data[key]);
            }
        }
        this.isAuthenticated = true;
    };
}

export default UserAuth.user