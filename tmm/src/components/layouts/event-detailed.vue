<template>
    <div>
        <h1>{{event.name}}</h1>
        <p>
            {{event.startDate}}
            <br>
            {{event.endDate}}
            <br>
            {{event.description}}
            <br>
            <img :src="event.imageUrl" alt="">
            <br>
        </p>

        <div id="map">
            <iframe
                    width="600"
                    height="450"
                    frameborder="0" style="border:0"
                    src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyAHJXhPMJK0nOhGWjIJopR8D9S_nQsd3E0&origin=Oslo+Norway&destination=Telemark+Norway&avoid=tolls|highways"
                    allowfullscreen>
            </iframe>
        </div>

        <mu-raised-button
                label="Remove Event"
                labelPosition="before"
                icon="backspace"
                secondary
                @click="removeEvent" />

        <app-delete-event ref="deleteEvent"></app-delete-event>
    </div>
</template>

<script>
    import {db} from '../../firebase';
    import deleteEvent from '../delete-event.vue';
    import newPayment from '../new-payment.vue';

    export default {
        data() {
            return {
                pageTitle: 'Event',
                eventId: '',
                removeEventModal: false,
            }
        },
        firebase() {
            return {
                event: {
                    source: db.ref('events').child(this.$route.params['event_id']),
                    asObject: true
                }
            }
        },
        components: {
            'app-new-payment': newPayment,
            'app-delete-event': deleteEvent,
        },
        methods: {
            removeEvent(id) {
                this.removeEventModal = true;
            }
        },
        mounted() {
            this.eventId = this.$route.params['event_id'];
        }
    }
</script>

<style lang="scss" scoped>
    p {
        margin-bottom: 0;
    }

    .btn-group {
        margin-top: 10px;
    }

    .events-group {
        border-bottom: 1px solid gray;
        margin-bottom: 60px;
        padding-bottom: 20px;
    }
    img {
        max-width: 500px;
    }

</style>