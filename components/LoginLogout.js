app.component('login-logout', {
    template:
    /*html*/ 
    `
    <span v-if="!isLoggedIn">
        <input type="text" v-model="userName" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">
        <button class="btn btn-primary" @click="login()">Login</button>
    </span>
    <span v-if="isLoggedIn">
        <button class="btn btn-danger" @click="Logout()">Logout</button>
    </span>
    `,
    
    data() {
        return {
            userName: "",
            password: "",
            isLoggedIn: sessionStorage.getItem("jwt") !== null
        };
    },

    methods: {
        login() {
            axios.post("http://localhost:5292/api/auth/login", {
                userName: this.userName,
                password: this.password
            })
            .then(response => {
                const token = response.data.token;

                sessionStorage.setItem("jwt", token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                this.isLoggedIn = true;
            })
            .catch(error => console.error(error));
        },

        Logout() {
            sessionStorage.removeItem("jwt");
            delete axios.defaults.headers.common["Authorization"];
            this.isLoggedIn = false;
        }
    }
})

