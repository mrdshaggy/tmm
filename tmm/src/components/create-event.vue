<template>
    <div>
        <b-modal id="modalCreateEvent" ref="modalCreateEvent" title="Create event" hide-footer>
            <b-form @submit="onSubmit">
                <b-form-group label="Event:" label-for="eventName">
                    <b-form-input id="eventName" type="text" required
                                  placeholder="Enter event name"
                                   v-model="newEvent.name"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Date:" label-for="eventDate">
                    <b-form-input id="eventDate" type="text" required
                                  placeholder="Enter event date"
                                   v-model="newEvent.date"
                    ></b-form-input>
                </b-form-group>
                <div class="float-right">
                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="secondary" @click="hideModal()">Cancel</b-button>
                </div>
            </b-form>
        </b-modal>

        <app-alert slot="alertMessage" ref="alert"></app-alert>
    </div>
</template>

<script>
    import {db} from '../firebase';

    export default {
        data() {
            return {
                newEvent: {
                    name: '',
                    date: '',
                },
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
//                alert(JSON.stringify(this.form));
//                var json = JSON.stringify(this.form);
                this.hideModal();
                this.$refs.alert.showAlert('success', 'Event created!');

                this.$firebaseRefs.events.push({name: this.newEvent.name, date: this.newEvent.date});
            },
            notification() {

            },
            hideModal() {
                this.$refs.modalCreateEvent.hide();
            }
        }
    };
</script>

<style lang="scss">

</style>