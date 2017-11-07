<template>
    <div>
        <b-form @submit.prevent="onSubmit">
            <b-form-group label="Event:" label-for="eventName">
                <b-form-input id="eventName" type="text" required
                              placeholder="Enter event name"
                              v-model="newEvent.name"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Start Date:" label-for="eventStartDate">
                <app-datetime
                        required
                        auto-close
                        input-class="form-control"
                        placeholder="Date of start"
                        id="eventStartDate"
                        v-model="newEvent.startDate"></app-datetime>
            </b-form-group>
            <b-form-group label="End Date:" label-for="eventEndDate">
                <app-datetime
                        required
                        auto-close
                        input-class="form-control"
                        placeholder="Finish date"
                        id="eventEndtDate"
                        v-model="newEvent.endDate"></app-datetime>
            </b-form-group>
            <div class="float-right">
                <b-button type="submit" variant="success">Create</b-button>
                <b-button type="reset" variant="secondary" @click="goBack()">Go Back</b-button>
            </div>
        </b-form>

        <app-alert slot="alertMessage" ref="alert"></app-alert>
    </div>
</template>

<script>
    import {db} from '../../firebase';

    export default {
        data() {
            return {
                newEvent: {
                    id: null,
                    name: '',
                    startDate: '',
                    endDate: '',
                    image: '',
                    description: '',
                },
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        components: {},
        methods: {
            onSubmit(evt) {
                this.$refs.alert.showAlert('success', 'Event created!');

                var sd = this.newEvent.startDate,
                    ed = this.newEvent.endDate
                sd = sd.substring(0, sd.indexOf('T'));
                ed = ed.substring(0, ed.indexOf('T'));

                this.$firebaseRefs.events.push({name: this.newEvent.name, startDate: sd, endDate: ed});
            },
            getDate() {

            },
            hideModal() {
                this.$refs.modalCreateEvent.hide();
            },
            goBack() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="scss">
    .form-control {
        background: #fff !important;
    }
</style>