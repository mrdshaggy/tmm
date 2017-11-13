<template>
    <div>
        <!-- Modal Component -->
        <b-modal id="modalDeleteEvent"
                 ref="modalDeleteEvent"
                 title="Delete event?"
                 hide-footer>
            <h3 clas="my-4">Are you sure you want to delete this event?</h3>
            <div class="text-right">
                <b-button variant="danger" @click="ok">Delete</b-button>
                <b-button variant="secondary" @click="hideModal">Cancel</b-button>
            </div>
        </b-modal>

        <app-alert slot="alertMessage" ref="alert"></app-alert>
    </div>
</template>

<script>
    import {db} from '../firebase';

    export default {
        data() {
            return {
                alertMsg: '',
                dismissSecs: 5,
                dismissCountDown: 0,
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
                this.$refs.alert.showAlert('success', 'Event successfully deleted!');
                this.hideModal();
                setTimeout(() => {
                    this.$router.push('/events');
                },2000)

            },
            show(id) {
                this.id = id;
                this.$refs.modalDeleteEvent.show();
            },
            hideModal() {
                this.$refs.modalDeleteEvent.hide();
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
        }
    };
</script>

<style lang="scss">

</style>