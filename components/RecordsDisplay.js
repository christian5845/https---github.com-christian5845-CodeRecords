app.component('records-display', {
    props: ['records', 'showAllRecords'],
    // Besked til forælderen om at hente listen igen efter tilføj/slet/opdater
    emits: ['changed'],
    template: /*html*/ `
        <div>
            <!-- Tilføj ny plade -->
            <h2 class="section-title">Add a record</h2>
            <div class="add-form">
                <input type="text" v-model="newRecord.Title" placeholder="Title">
                <input type="text" v-model="newRecord.Artist" placeholder="Artist">
                <input type="number" v-model.number="newRecord.Duration" placeholder="Duration (sek)">
                <input type="number" v-model.number="newRecord.PublicationYear" placeholder="Release Year">
                <button class="btn btn-success" @click="addRecord()">Add Record</button>
            </div>

            <div class="empty-state" v-if="!showAllRecords">
                Press "Show Records" to see the collection.
            </div>

            <table id="recordsTable" class="table records-table" v-if="showAllRecords">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Duration</th>
                        <th>Release Year</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in records" :key="record.id">

                        <!-- Redigeringstilstand: den række der opdateres lige nu -->
                        <template v-if="editRecord && editRecord.id === record.id">
                            <td><input type="text" v-model="editRecord.title"></td>
                            <td><input type="text" v-model="editRecord.artist"></td>
                            <td><input type="number" v-model.number="editRecord.duration"></td>
                            <td><input type="number" v-model.number="editRecord.publicationYear"></td>
                            <td>
                                <button id="saveBtn" class="btn btn-success btn-sm" @click="updateRecord()">Save</button>
                                <button id="cancelBtn" class="btn btn-secondary btn-sm" @click="cancelEdit()">Cancel</button>
                            </td>
                        </template>

                        <!-- Normal visning -->
                        <template v-else>
                            <td>{{ record.title }}</td>
                            <td>{{ record.artist }}</td>
                            <td>{{ record.duration }}</td>
                            <td>{{ record.publicationYear }}</td>
                            <td>
                                <button id="updateBtn" class="btn btn-primary btn-sm" @click="startEdit(record)">Update</button>
                                <button id="deleteBtn" class="btn btn-danger btn-sm" @click="deleteRecord(record.id)">Delete</button>
                            </td>
                        </template>

                    </tr>
                </tbody>
            </table>
        </div>
    `,

    data() {
        return {
            newRecord: { Title: "", Artist: "", Duration: "", PublicationYear: "" },
            // Kopi af den plade, der redigeres (null = ingen redigering)
            editRecord: null
        };
    },

    methods: {
        addRecord() {
            axios.post("http://localhost:5292/api/records", this.newRecord)
                .then(response => {
                    console.log(response.data);
                    this.newRecord = { Title: "", Artist: "", Duration: "", PublicationYear: "" };
                    this.$emit('changed');
                })
                .catch(error => console.error(error));
        },

        deleteRecord(recordId) {
            axios.delete(`http://localhost:5292/api/records/${recordId}`)
                .then(response => {
                    console.log(response.data);
                    this.$emit('changed');
                })
                .catch(error => console.error(error));
        },

        // Laver en kopi, så listen ikke ændres, før man trykker Save
        startEdit(record) {
            this.editRecord = { ...record };
        },

        cancelEdit() {
            this.editRecord = null;
        },

        updateRecord() {
            axios.put(`http://localhost:5292/api/records/${this.editRecord.id}`, this.editRecord)
                .then(response => {
                    console.log(response.data);
                    this.editRecord = null;
                    this.$emit('changed');
                })
                .catch(error => console.error(error));
        }
    }
});
