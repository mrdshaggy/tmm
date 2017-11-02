<template>
    <div id="app">
        <app-header>
            <span slot="title">{{ title }}</span>
        </app-header>
        <div class="app-wrapper">
            <div class="container-fluid">

                <app-create-event></app-create-event>

                <app-events-list></app-events-list>


                <div v-for="event in events">
                    {{ event.name }} - {{ event.startDate }} - {{ event.endDate }}
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import header from './components/modules/header.vue';
    import footer from './components/modules/footer.vue';
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
            'app-header': header,
            'app-footer': footer
        }
    }
</script>

<style lang="scss">
    @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
    @import '../node_modules/bootstrap/dist/css/bootstrap.css';

    #app {

    }
    body {
        background-color: rgba(0, 0, 0, 0.01);
    }
    .title {
        margin: 30px 0;
    }
    .app-wrapper {
        padding-top: 100px;
        min-height: calc(100vh - 40px);
    }
</style>
