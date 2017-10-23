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

    import {db} from './firebase';

    export default {
        name: 'app',
        data() {
            return {
                title: 'Team Money Manager',
                newEvent: {
                    name: '',
                    date: '',
                },
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
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
