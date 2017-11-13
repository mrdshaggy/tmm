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
            {{event.image}}
            <br>
        <div v-html="event.map"></div>
        </p>

        <b-btn v-b-modal.modalDeleteEvent variant="danger">Remove Event</b-btn>


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
                this.$refs.deleteEvent.show(id);
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

</style>