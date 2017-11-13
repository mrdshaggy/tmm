<template>
    <div>
        <div class="events-group">
            <h5 class="text-center mb-3">Hey, {{ this.$parent.usr.name }}, you have {{ eventsCounter }} events!</h5>
            <div class="filter mb-4">
                <span>Filter by name:</span>
                <input type="text" v-model="filter">
            </div>

            <h4>Current events</h4>
            <b-card-group columns>
                <b-card v-for="event in events"
                        img-src="https://placekitten.com/500/350"
                        img-fluid
                        :img-alt="event.name"
                        img-top
                        class="card-event">
                    <b-card-body>
                        <router-link :to="{ name: 'event', params: { event_id: event['.key'] }}">
                            <h3>{{ event.name }}</h3>
                        </router-link>
                        From: {{ event.startDate }}
                        <br>
                        To: {{ event.endDate }}
                    </b-card-body>
                    <b-card-body>
                        <p class="card-text">
                            {{ event.description }}
                        </p>
                    </b-card-body>
                    <small class="text-muted">Last updated 3 mins ago</small>
                </b-card>
            </b-card-group>
        </div>

        <div class="events-group">
            <h4>Future events</h4>
        </div>

        <div class="events-group">
            <h4>Previous events</h4>
        </div>
    </div>
</template>

<script>
    import {db} from '../../firebase';

    export default {
        data() {
            return {
                filter: '',
                pageTitle: 'Events',
                eventsCounter: 0,
                localEvents: [],
                eventsNames: [],
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        methods: {

        },
        computed: {
            filteredItems() {
                return this.eventsNames.filter(item => {
                    return item.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                })
            },
            getEventsCounter() {
                this.eventsCounter = this.events.length;
            }
        },
        mounted() {
            this.getEventsCounter;
        },
        updated() {
//            this.getEventsCounter;
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