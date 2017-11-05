<template>
    <div class="header">
        <b-navbar toggleable="md" type="dark" variant="primary">

            <b-nav-toggle target="nav_collapse"></b-nav-toggle>


            <router-link to="/">
                <b-navbar-brand>
                    <img src="../../assets/logo-tmm.svg" alt="" class="logo">

                    <slot name="title" class="title"></slot>
                </b-navbar-brand>
            </router-link>

            <b-collapse is-nav id="nav_collapse">

                <b-nav is-nav-bar class="ml-auto">
                    <b-nav is-nav-bar>
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/events" class="nav-link">Events</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/friends" class="nav-link">Friends</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/currencies" class="nav-link">Currencies</router-link>
                        </li>
                    </b-nav>
                    <b-button variant="success">Create Event</b-button>

                    <b-nav-item-dropdown class="user" right>
                        <!-- Using button-content slot -->

                        <template slot="button-content">
                            <img :src="usr.photo" alt="">
                        </template>
                        <b-dropdown-item>Hello, {{ usr.name }}!</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#" @click.prevent="signOut">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        data() {
            return {
                logged: false,
                usr: {
                    name: 'asdas',
                    email: '',
                    photo: '',
                }
            }
        },
        methods: {
            signOut() {
                firebase.auth().signOut().then(function () {
                    console.log('out successfull');
                }, function (error) {
                    console.log('out error');
                });
            },
            checkUser() {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        this.logged = true;
                        this.usr.name = user.displayName;
                        this.usr.email = user.displayName;
                        this.usr.photo = user.photoURL;
                        console.log('user is logged', this.logged);
                    } else {
                        console.log('user is out');
                        this.logged = false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user img {
        width: 30px;
        height: 30px;
    }

    .title {

    }

    button {
        cursor: pointer;
    }

    .user {
        margin-left: 30px;
        margin-right: 0 !important;
    }

    .user img {
        background-color: #fff;
        border-radius: 100%;
        box-sizing: border-box;
    }

    .logo {
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }

    .navbar {
        height: 60px;
    }

    .nav-item {
        margin-right: 30px;
        display: flex;
        align-items: center;
    }

    .nav-link {
        color: #fff !important;
        position: relative;
        padding: 0 !important;
    }

    .nav-link:after {
        content: '';
        position: absolute;
        bottom: -7px;
        width: 100%;
        height: 2px;
        background: #fff;
        left: 0;
        opacity: 0;
        transition: 0.3s;
    }

    .nav-link:hover:after {
        bottom: -2px;
        opacity: 1;
    }
</style>