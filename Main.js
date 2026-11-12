const app = Vue.createApp({
    data() {
        return {
            ShowAllRecords: false,
            records: []

        }
    },
    methods: {
        showRecords() {
            axios.get('http://localhost:5292/api/records')
            .then(response => {
                this.records = response.data;
                console.log(response.data);
            })
        }
    }
}).mount('#app');