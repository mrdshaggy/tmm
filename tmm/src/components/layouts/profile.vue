<template>
    <div>
        <div>
            <h1>Profile</h1>
        </div>

        <img :src="this.$parent.usr.photo" alt="" width="300">

        <b-form>
            <b-form-group label="Name:">
                <b-form-input type="text" v-model="this.$parent.usr.name" disabled></b-form-input>
            </b-form-group>

            <b-form-group label="Email:" description="Users can see your email for communication.">
                <b-form-input type="email" v-model="this.$parent.usr.email" disabled></b-form-input>
            </b-form-group>

            <b-form-group label="Phone:" description="Users can see your phone number for communication.">
                <b-form-input type="text" v-model="this.$parent.usr.phone" disabled></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="success">Edit</b-button>
            <!--<b-button type="reset" variant="secondary">Reset</b-button>-->
        </b-form>
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