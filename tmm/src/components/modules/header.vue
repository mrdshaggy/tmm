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
                    <!--if logged-->
                    <template v-if="logged">
                        <b-nav is-nav-bar>
                            <li class="nav-item">
                                <router-link to="/" class="nav-link" exact-active-class="active">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/events" class="nav-link" exact-active-class="active">Events</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/friends" class="nav-link" exact-active-class="active">Friends</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/currencies" class="nav-link" exact-active-class="active">Currencies</router-link>
                            </li>
                        </b-nav>

                        <router-link to="create-event" class="btn btn-success">Create Event</router-link>

                        <b-nav-item-dropdown class="user" right>
                            <template slot="button-content">
                                <img :src="this.$parent.usr.photo" alt="">
                            </template>
                            <b-dropdown-item>Hello, {{ this.$parent.usr.name }}!</b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <router-link to="/profile" class="dropdown-item">Profile</router-link>
                            <b-dropdown-item href="#" @click.prevent="signOut">Signout</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </template>

                    <template v-else>
                        <b-nav is-nav-bar>
                            <li class="nav-item">
                                <router-link to="/" class="nav-link">Home</router-link>
                            </li>
                        </b-nav>

                        <router-link to="/login">
                            <b-button variant="success">Log In</b-button>
                        </router-link>
                    </template>


                </b-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        props: ['logged'],
        data() {
            return {}
        },
        methods: {
            signOut() {
                firebase.auth().signOut().then(() => {
                    console.log('out successfull');
                    location.href = '/';
                }, function (error) {
                    console.log('out error');
                });
            },

        },
        watch: {

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

    .nav-link:hover:after, .nav-link.active:after {
        bottom: -2px;
        opacity: 1;
    }
</style>