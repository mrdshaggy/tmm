<template>
    <mu-toast v-if="toast" :message="toastMsg" @close="hideToast" :class="toastType" ></mu-toast>
</template>

<script>
    export default {
        data() {
            return {
                toast: false,
            }
        },
        methods: {
            showToast(type, msg) {
                this.toastType = type;
                this.toastMsg = msg;
                this.toast = true;
                if (this.toastTimer) clearTimeout(this.toastTimer);
                this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
            },
            hideToast () {
                this.toast = false;
                if (this.toastTimer) clearTimeout(this.toastTimer);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mu-toast {

    }
    .mu-toast.success {
        background-color: green;
        color: #fff;
    }
    .mu-toast.error {
        background-color: red;
        color: #fff;
    }
</style>