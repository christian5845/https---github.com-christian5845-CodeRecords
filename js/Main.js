console.log("Min Vue-fil bliver indlæst");

const savedToken = sessionStorage.getItem("jwt");

if (savedToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}

const app = Vue.createApp({
    data() {
        return {
            showAllRecords: false,
            records: [],
            allRecords: [],
            filteredRecordsByArtist: "",
            filteredRecordsByTitle: "",
            // userName: "",
            // password: "",
            // isLoggedIn: sessionStorage.getItem("jwt") !== null
        };
    },

    methods: {
        showRecords() {
            axios.get("http://localhost:5292/api/records")
                .then(response => {
                    this.allRecords = response.data;
                    this.records = [...this.allRecords];
                    console.log(response.data);
                })
                .catch(error => console.error(error));
        },

        filterRecordsByArtist() {
            if (this.filteredRecordsByArtist === "") {
                this.records = [...this.allRecords];
            } else {
                this.records = this.allRecords.filter(record =>
                    record.artist.includes(this.filteredRecordsByArtist)
                );
            }
        },

        filterRecordsByTitle() {
            if (this.filteredRecordsByTitle === "") {
                this.records = [...this.allRecords];
            } else {
                this.records = this.allRecords.filter(record =>
                    record.title.includes(this.filteredRecordsByTitle)
                );
            }
        },

        // login() {
        //     axios.post("http://localhost:5292/api/auth/login", {
        //         userName: this.userName,
        //         password: this.password
        //     })
        //     .then(response => {
        //         const token = response.data.token;

        //         sessionStorage.setItem("jwt", token);
        //         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //         this.isLoggedIn = true;
        //     })
        //     .catch(error => console.error(error));
        // },

        // Logout() {
        //     sessionStorage.removeItem("jwt");
        //     delete axios.defaults.headers.common["Authorization"];
        //     this.isLoggedIn = false;
        // }
    }
});

