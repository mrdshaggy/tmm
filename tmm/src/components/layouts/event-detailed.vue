<template>
    <div>
        <h1>Event detailed</h1>
        <p>
            {{event.name}}
            {{event.startDate}}
            {{event.endDate}}
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
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        components: {
            'app-new-payment': newPayment,
            'app-delete-event': deleteEvent,
        },
        methods: {
            removeEvent(id) {
                this.$refs.deleteEvent.show(id);
            },
            createEvent() {
                this.events.push(this.eventsCounter++);
            }
        },
        mounted() {
            console.log(this.eventKey)


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