<template>
    <div>
        <div class="events-group">
            <h4>Current events</h4>
            <b-card-group columns>
                <b-card v-for="event, id in events"
                        img-src="https://placekitten.com/500/350"
                        img-fluid
                        :img-alt="event.name"
                        img-top
                        class="card-event">
                    <b-card-body>
                        <router-link to="/events/event">
                            <h3>{{ event.name }}</h3>
                            <p>{{id}}</p>
                        </router-link>
                        From: {{ event.startDate }}
                        <br>
                        To: {{ event.endDate }}
                    </b-card-body>
                    <b-card-body>
                        <p class="card-text">
                            This is a event description
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

        },
        mounted() {
//            console.log(this.$firebaseRefs.events)

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