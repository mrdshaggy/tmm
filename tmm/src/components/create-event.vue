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
                    <!--<b-form-input id="eventDate" type="text" required-->
                                  <!--placeholder="Enter event date"-->
                                   <!--v-model="newEvent.date"-->
                    <!--&gt;</b-form-input>-->
                    <app-datepicker
                            id="eventDate"
                            :i18n="ptBr"
                            v-model="newEvent.date"
                            v-on:checkOutChanged="getDate">
                    </app-datepicker>
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
    import Datepicker from 'vue-hotel-datepicker';

    export default {
        data() {
            return {
                newEvent: {
                    name: '',
                    date: '',
                },
                ptBr: {
                    night: 'Night',
                    nights: 'Nights',
                    'day-names': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    'check-in': 'Start Date',
                    'check-out': 'End Date',
                    'month-names': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                }
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        components: {
            'app-datepicker': Datepicker
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.hideModal();
                this.$refs.alert.showAlert('success', 'Event created!');

                this.$firebaseRefs.events.push({name: this.newEvent.name, date: this.newEvent.date});
            },
            getDate() {
                let dates = [];
                dates = document.getElementsByClassName('datepicker__input');

                var d = setTimeout(function () {
                    let sd, ed;
                    sd = dates[0].value.toString();
                    ed = dates[1].value.toString();
                    return sd + ' - ' + ed;
                },100);
                console.log(d);
                this.newEvent.date = '' + d;
            },
            hideModal() {
                this.$refs.modalCreateEvent.hide();
            }
        }
    };
</script>

<style lang="scss">

</style>