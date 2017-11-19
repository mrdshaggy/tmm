<template>
    <div>

        <mu-dialog :open="this.$parent.removeEventModal" title="Are you sure?" @close="hideModal">
            Are you sure you want to delete this event?
            <mu-raised-button slot="actions" primary @click="hideModal" label="Cancel"/>
            <mu-raised-button slot="actions" secondary @click="ok" label="Delete"/>
        </mu-dialog>

        <app-notification ref="successToast"></app-notification>
    </div>
</template>

<script>
    import {db} from '../firebase';

    export default {
        data() {
            return {
                alertMsg: '',
                id: null,
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        methods: {
            ok() {
                this.$firebaseRefs.events.child(this.$parent.$route.params['event_id']).remove();
                this.$refs.successToast.showToast('success', 'Event successfully deleted!');
                this.hideModal();
                setTimeout(() => {
                    this.$router.push('/events');
                },2000)
            },
            hideModal() {
                this.$parent.removeEventModal = false;
            },
        }
    };
</script>

<style lang="scss">

</style>