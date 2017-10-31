<template>
    <div>
        <h3>{{ pageTitle }}</h3>
        <p>Please create your first event</p>

        <div>
            <b-card no-body>
                <b-tabs card>
                    <b-tab :title="i.name" v-for="i, id in events" :key="id">
                        <div class="row">
                            <div class="col-sm-3 mb-3">
                                <b-card :title="i.name"
                                        :sub-title="i.date">

                                    <b-button-group size="sm">
                                        <b-btn size="sm" variant="danger" class="float-right" @click="removeEvent(i['.key'])">
                                            Delete
                                        </b-btn>
                                        <b-btn size="sm" variant="info" class="float-right">
                                            Edit
                                        </b-btn>
                                    </b-button-group>
                                </b-card>
                            </div>

                            <div class="col-sm-9">
                                <app-new-payment></app-new-payment>
                            </div>
                        </div>

                    </b-tab>

                    <!-- New Tab Button (Using tabs slot) -->
                    <b-nav-item slot="tabs" v-b-modal.modalCreateEvent href="#">
                        Create Event
                    </b-nav-item>

                    <!-- Render this if no tabs -->
                    <div slot="empty" class="text-center text-muted">
                        There are no events.
                        <br> Create a new event, please.
                    </div>
                </b-tabs>
            </b-card>
        </div>

        <app-delete-event ref="deleteEvent"></app-delete-event>
    </div>
</template>

<script>
    import {db} from '../firebase';
    import newPayment from './new-payment.vue';
    import deleteEvent from './delete-event.vue';

    export default {
        data() {
            return {
                pageTitle: 'Events',
                eventsCounter: 0
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
            console.log( this.$firebaseRefs.events )
        }
    }
</script>

<style lang="scss">

</style>