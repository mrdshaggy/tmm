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

        <b-alert :show="dismissCountDown"
                 dismissible
                 variant="success"
                 @dismissed="dismissCountdown=0"
                 @dismiss-count-down="countDownChanged">
            {{ alertMsg }}
        </b-alert>
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
                alertMsg: '',
                dismissSecs: 5,
                dismissCountDown: 0
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
                this.alertMsg = 'Event created!';
                this.dismissCountDown = this.dismissSecs;
                this.$firebaseRefs.events.push({name: this.newEvent.name, date: this.newEvent.date});
            },
            hideModal() {
                this.$refs.modalCreateEvent.hide();
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
        }
    };
</script>

<style lang="scss">
    .alert {
        position: fixed;
        right: 30px;
        top: 30px;
        z-index: 10;
        width: 100%;
        max-width: 300px;
    }
</style>