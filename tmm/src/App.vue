<template>
    <div id="app">
        <app-header :logged="logged">
            <span slot="title">{{ title }}</span>
        </app-header>

        <div class="app-wrapper">
            <div class="container-fluid">
                <router-view>
                    <app-login></app-login>

                    <app-profile></app-profile>

                    <app-create-event></app-create-event>

                    <app-events-list></app-events-list>

                </router-view>
            </div>
        </div>

        <app-footer></app-footer>
    </div>
</template>

<script>
    import header from './components/modules/header.vue';
    import footer from './components/modules/footer.vue';
    import createEvent from './components/layouts/create-event.vue';
    import eventsList from './components/layouts/events.vue';
    import login from './components/layouts/login.vue';
    import profile from './components/layouts/profile.vue';
    import firebase from 'firebase';

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
                logged: false,
                usr: {
                    name: '',
                    email: '',
                    photo: '',
                    phone: '',
                }
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        methods: {
            checkUser() {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        this.logged = true;
                        this.usr.name = user.displayName;
                        this.usr.email = user.email;
                        this.usr.photo = user.photoURL;
                        this.usr.phone = user.phoneNumber;
//                        console.log(user);
                    } else {
                        this.logged = false;
                    }
                });
            }
        },
        components: {
            'app-create-event': createEvent,
            'app-events-list': eventsList,
            'app-header': header,
            'app-footer': footer,
            'app-login': login,
            'app-profile': profile,
        },
        mounted() {
            this.checkUser();
        }
    }
</script>

<style lang="scss">
    @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
    @import '../node_modules/bootstrap/dist/css/bootstrap.css';

    #app {

    }
    body {
        background-color: rgba(0, 0, 0, 0.03);
    }
    .title {
        margin: 30px 0;
    }
    .app-wrapper {
        padding-top: 100px;
        min-height: calc(100vh - 40px);
    }
</style>
