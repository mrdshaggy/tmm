<template>
    <div>
        <form @submit.prevent="onSubmit">
            <mu-text-field
                    label="Event Image:"
                    type="file"
                    v-model="newEvent.image"
                    fullWidth />
            {{ newEvent.image && newEvent.image.name }}
            <br>

            <mu-text-field
                    label="Event Name:"
                    type="text"
                    v-model="newEvent.name"
                    labelFloat
                    fullWidth />
            <br>

            <mu-date-picker
                    label="Start Date:" labelFloat fullWidth
                    okLabel="Ok"
                    cancelLabel="Cancel"
                    :dateTimeFormat="enDateFormat"
                    v-model="newEvent.startDate"/>
            <br>

            <mu-date-picker
                    label="End Date:" labelFloat fullWidth
                    okLabel="Ok"
                    cancelLabel="Cancel"
                    :dateTimeFormat="enDateFormat"
                    v-model="newEvent.endDate"/>
            <br>

            <mu-text-field
                    v-model="newEvent.description"
                    hintText="Event Description:"
                    :errorText="multiLineInputErrorText"
                    @textOverflow="handleMultiLineOverflow"
                    multiLine fullWidth
                    :rows="5" :rowsMax="15"
                    :maxLength="50"/>
            <br>

            <mu-text-field
                    label="Event Map (paste url here):"
                    type="text"
                    v-model="newEvent.map"
                    labelFloat fullWidth />
            <br>

            <mu-raised-button type="reset" label="Go back" @click="goBack()"/>
            <mu-raised-button type="submit" label="Create" primary />

        </form>

        <app-notification ref="successToast"></app-notification>
    </div>
</template>

<script>
    import {db} from '../../firebase';
    import enDate from '../addons/en-datepicker.vue';

    export default {
        data() {
            return {
                newEvent: {
                    author: '',
                    time: '',
                    name: '',
                    image: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    map: '',
                },
                enDateFormat: enDate,
                input: '',
                inputErrorText: '',
                multiLineInput: '',
                multiLineInputErrorText: '',
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        components: {},
        methods: {
            handleInputOverflow (isOverflow) {
                this.inputErrorText = isOverflow ? 'Wow wow, mate! Too much!' : ''
            },
            handleMultiLineOverflow (isOverflow) {
                this.multiLineInputErrorText = isOverflow ? 'Wow wow, mate! Too much!' : ''
            },
            onSubmit(evt) {
                this.$firebaseRefs.events.push(this.newEvent);
                this.$refs.successToast.showToast('success', 'Event created!');

                setTimeout(() => {
                    this.$router.push('/events');
                },2000)
            },
            goBack() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="scss">

</style>