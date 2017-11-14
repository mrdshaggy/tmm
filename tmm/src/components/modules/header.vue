<template>
    <div class="header">
        <mu-appbar>
            <router-link to="/" slot="left" class="header__logo">
                <img src="../../assets/logo-tmm.svg" alt="" class="logo">
                <slot name="title"></slot>
            </router-link>

            <template v-if="logged">
                <ul class="header__nav" slot="right">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" exact-active-class="active">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/events" exact-active-class="active">Events</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/friends" exact-active-class="active">Friends</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/currencies" exact-active-class="active">Currencies
                        </router-link>
                    </li>
                </ul>

                <router-link to="/create-event" slot="right">
                    <mu-raised-button label="Create Event" secondary/>
                </router-link>

                <mu-avatar slot="right" :src="this.$parent.usr.photo" class="logged-user"/>

                <mu-icon-menu slot="right" icon="more_vert">
                    <mu-menu-item :title="'Hello, ' + this.$parent.usr.name"/>
                    <mu-divider/>
                    <router-link to="/profile" class="r-link">
                        <mu-menu-item title="Profile"/>
                    </router-link>
                    <mu-menu-item title="Sign out" @click.prevent="signOut"/>
                </mu-icon-menu>
            </template>

            <template v-else>
                <ul class="header__nav" slot="right">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" exact-active-class="active">Home</router-link>
                    </li>
                </ul>

                <router-link to="/login" slot="right">
                    <mu-raised-button label="Log In" secondary/>
                </router-link>
            </template>
        </mu-appbar>
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
//                    console.log('out successfull');
                    location.href = '/';
                }, function (error) {
//                    console.log('out error');
                });
            },

        },
        watch: {}
    }
</script>

<style lang="scss" scoped>

    button {
        cursor: pointer;
    }

    .logged-user {
        margin-left: 30px;
    }

    .header__logo {
        font-size: 18px;
        color: #ffffff;
        text-decoration: none;
    }

    .header__nav {
        margin: 0;
        padding: 0;
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

    .nav-item {
        margin-right: 30px;
        /*display: flex;*/
        align-items: center;
        display: inline-block;
    }

    .nav-link {
        color: #fff !important;
        position: relative;
        padding: 0 !important;
        font-size: 14px;
        line-height: 21px;
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