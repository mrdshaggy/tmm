<template>
    <div class="header">
        <b-navbar toggleable="md" type="dark" variant="primary">

            <b-nav-toggle target="nav_collapse"></b-nav-toggle>

            <b-navbar-brand href="#">
                <img src="../../assets/logo-tmm.svg" alt="" class="logo">

                <slot name="title" class="title"></slot>
            </b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-nav is-nav-bar class="ml-auto">
                    <b-nav is-nav-bar>
                        <b-nav-item href="#">Home</b-nav-item>
                        <b-nav-item href="#">Events</b-nav-item>
                        <b-nav-item href="#">Friends</b-nav-item>
                    </b-nav>
                    <b-button variant="success">Create Event</b-button>

                    <b-nav-item-dropdown  class="user" right>
                        <!-- Using button-content slot -->

                        <template slot="button-content">
                            <img src="../../assets/user-boy.svg" alt="">
                        </template>
                        <b-dropdown-item>Hello, User!</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {

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
        margin-right: 0!important;
    }
    .user img {
        background-color: #fff;
        border-radius: 100%;
        padding: 3px;
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
        color: #fff!important;
        position: relative;
        padding: 0!important;
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