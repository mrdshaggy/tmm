<template>
    <div>
        <b-form @submit.prevent="onSubmit">
            <b-form-group label="Event Image:">
                <b-form-file v-model="newEvent.image"></b-form-file>
                <br>
                {{ newEvent.image && newEvent.image.name }}
            </b-form-group>
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

            <b-form-group label="Event Description:">
                <b-form-textarea v-model="newEvent.description"
                                 placeholder="Enter something"
                                 :rows="3"
                                 :max-rows="6">
                </b-form-textarea>
            </b-form-group>

            <b-form-group label="Event Map:">
                <b-form-input type="text" required
                              placeholder="Google maps URL"
                              v-model="newEvent.map"
                ></b-form-input>
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
                    author: '',
                    time: '',
                    name: '',
                    image: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    map: '',
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
            dateFormat() {

            },
            onSubmit(evt) {
                this.newEvent.startDate = this.newEvent.startDate.substring(0, this.newEvent.startDate.indexOf('T'));
                this.newEvent.endDate = this.newEvent.endDate.substring(0, this.newEvent.endDate.indexOf('T'));

                this.$firebaseRefs.events.push(this.newEvent);
                this.$refs.alert.showAlert('success', 'Event created!');

                setTimeout(() => {
                    this.$router.push('/events');
                },2000)
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