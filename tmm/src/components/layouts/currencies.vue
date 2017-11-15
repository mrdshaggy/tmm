<template>
    <div>
        <h3>Cureencies converter</h3>

        <form @submit.prevent="onSubmit">
            <mu-text-field label="From:" hintText="Enter Currency" type="number" v-model="cur.from"/>
            <mu-text-field label="To:" hintText="Enter Currency" type="number" v-model="cur.to"/>
            <mu-flat-button label="Convert" primary/>
            <mu-flat-button label="Reset" secondary/>
        </form>

        <p>
            <br><br><br>
            Basic USD</p>

        <p>
            Add currency:
            <br>
            name EUR
            <br>
            1 usd = N eur
            <br>
            button add
        </p>

        <div>
            {{ curData }}
        </div>


    </div>
</template>

<script>

    export default {
        data() {
            return {
                cur: {
                    from: '',
                    to: '',
                },
                curData: [],
            }
        },
        conponents: {},
        methods: {
            onSubmit() {

            }
        },
        mounted() {
            let cData = 'https://www.mycurrency.net/service/rates';


//            fx.base = "USD";
//            fx.rates = {
//                "EUR" : 0.745101, // eg. 1 USD === 0.745101 EUR
//                "GBP" : 0.647710, // etc...
//                "HKD" : 7.781919,
//                "USD" : 1,        // always include the base rate (1:1)
//                /* etc */
//            }
//            fx.convert(1, {from: "USD", to: "UAH"});
        }
    }
</script>

<style lang="scss" scoped>

</style>