<template>
    <div>
        <div>
            <h1>Profile</h1>
        </div>

        <form @submit.prevent>
            <img :src="this.$parent.usr.photo" alt="" width="300">
            <br>

            <mu-text-field label="Name:" type="text" v-model="this.$parent.usr.name" disabled />
            <br>

            <mu-text-field label="Email:" type="text" v-model="this.$parent.usr.email" disabled />
            <br>
            <span>Users can see your email for communication.</span>
            <br>

            <mu-text-field label="Phone:" type="number" v-model="this.$parent.usr.phone" disabled />
            <br>
            <span>Users can see your phone for communication.</span>
            <br>
            <br>

            <mu-raised-button label="Edit"/>
            <mu-raised-button label="Save"primary/>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        conponents: {

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>

</style>