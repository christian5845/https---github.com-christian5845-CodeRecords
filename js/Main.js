console.log("Min Vue-fil bliver indlæst");
const app = Vue.createApp({
    
    data() {
        return {
            showAllRecords: false,
            records: [],
            allRecords: [],
            filteredRecordsByArtist: "",
            filteredRecordsByTitle: "",

        }
    },
    methods: {
        showRecords() {
            axios.get('http://localhost:5292/api/records')
            .then(response => {
                this.allRecords = response.data;
                this.records = [...this.allRecords];
                console.log(response.data);
                
            })
            .catch(error => {
                console.error(error);
            });
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
    }
  }
});

app.mount('#app');