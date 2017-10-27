<template>
    <div>
        <h3>{{ pageTitle }}</h3>
        <p>Please create your first event</p>

        <div>
            <b-card no-body>
                <b-tabs card>
                    <!-- Render Tabs -->
                    <b-tab :title="i.name" v-for="i, id in events" :key="id">
                        Tab Contents {{i.name}}
                        <b-btn size="sm" variant="danger" class="float-right" @click="()=>removeEvent(i)">
                            Delete event
                        </b-btn>
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
    </div>
</template>

<script>
    import {db} from '../firebase';

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
        methods: {
            removeEvent(x) {
                for (let i = 0; i < this.events.length; i++) {
                    if (this.events[i] === x) {
                        this.events.splice(i, 1);
                    }
                    this.removeEv(this.events[i]);
                }
            },
            createEvent() {
                this.events.push(this.eventsCounter++);
                console.log(this.eventsCounter);
            },
            removeEv(currentEv) {
                this.$firebaseRefs.events.child(currentEv['.key']).remove();
            }
        },
        mounted() {
            console.log( this.$firebaseRefs.events )
        }
    }
</script>

<style lang="scss">

</style>