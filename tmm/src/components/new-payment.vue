<template>
    <div>
        <b-card>
            Here will be new payment
        </b-card>
    </div>
</template>

<script>
    import {db} from '../firebase';

    export default {
        data() {
            return {

            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>

<styles lang="scss">

</styles>