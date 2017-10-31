<template>
    <b-alert :show="dismissCountDown"
             dismissible
             :variant="alertType"
             @dismissed="dismissCountdown=0"
             @dismiss-count-down="countDownChanged">
        <slot name="alertMessage">{{ alertMsg }}</slot>
    </b-alert>
</template>

<script>
    export default {
        data() {
            return {
                alertMsg: '',
                alertType: '',
                dismissSecs: 5,
                dismissCountDown: 0,
            }
        },
        methods: {
            showAlert(type, msg) {
                this.alertType = type;
                this.alertMsg = msg;
                this.dismissCountDown = this.dismissSecs;
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            }
        }
    }
</script>

<style lang="scss">
    .alert {
        position: fixed;
        right: 30px;
        top: 30px;
        z-index: 10;
        width: 100%;
        max-width: 300px;
    }
</style>