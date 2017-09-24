<template>
    <div id="app">
        <h1 class="text-center title">{{ title }}</h1>

        <app-create-event></app-create-event>

        <app-events-list></app-events-list>


        <div v-for="event in events">
            {{ event.name }} - {{ event.date }}
        </div>
    </div>
</template>

<script>
    import createEvent from './components/create-event.vue';
    import eventsList from './components/events.vue';

    import Firebase from 'firebase';

    // Initialize Firebase
    let config = {
        apiKey: "AIzaSyCiaZ6D17B_lr1OiGqpposNJDbZ_rW-nJY",
        authDomain: "temm-dd89d.firebaseapp.com",
        databaseURL: "https://temm-dd89d.firebaseio.com",
        projectId: "temm-dd89d",
        storageBucket: "temm-dd89d.appspot.com",
        messagingSenderId: "733607351069"
    };

    let app = Firebase.initializeApp(config);
    let db = app.database();

    let eventsRef = db.ref('events');

    export default {
        name: 'app',
        data() {
            return {
                title: 'Team Money Manager',
                newEvent: {
                    name: '',
                    date: '',
                }
            }
        },
        firebase: {
            events: eventsRef
        },
        methods: {
            createEvent() {

            },
        },
        components: {
            'app-create-event': createEvent,
            'app-events-list': eventsList,
        }
    }
</script>

<style lang="scss">
    @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
    @import '../node_modules/bootstrap/dist/css/bootstrap.css';

    #app {
        padding: 0 30px;
    }
    body {
        background-color: rgba(0, 0, 0, 0.03);
    }
    .title {
        margin: 30px 0;
    }
</style>
