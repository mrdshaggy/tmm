<template>
    <div>
        <h3>Cureencies converter</h3>

        <b-form @submit.prevent="onSubmit">
            <b-row>
                <b-col>
                    <b-form-group label="From:" label-for="cur1">
                        <b-form-input id="cur1"
                                      type="number" v-model="cur.from" required
                                      placeholder="Enter value"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="To:" label-for="cur2">
                        <b-form-input id="cur2"
                                      type="number" v-model="cur.to" required
                                      placeholder="Enter value"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col></b-col>
            </b-row>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="secondary">Reset</b-button>
        </b-form>

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


    </div>
</template>

<script>

    export default {
        data() {
            return {
                cur: {
                    from: '',
                    to: '',
                }
            }
        },
        conponents: {},
        methods: {
            onSubmit() {

            }
        },
        mounted() {
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