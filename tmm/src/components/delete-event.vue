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

        <!--<b-alert :show="dismissCountDown"-->
                 <!--dismissible-->
                 <!--variant="success"-->
                 <!--@dismissed="dismissCountdown=0"-->
                 <!--@dismiss-count-down="countDownChanged">-->
            <!--{{ alertMsg }}-->
        <!--</b-alert>-->
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
                this.$firebaseRefs.events.child(this.id).remove();
                this.removeEvent();
            },
            show(id) {
                this.id = id;
                this.$refs.modalDeleteEvent.show();
            },
            removeEvent() {
                this.hideModal();
                this.alertMsg = 'Event deleted!';
                this.dismissCountDown = this.dismissSecs;
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
    .alert {
        position: fixed;
        right: 30px;
        top: 30px;
        z-index: 10;
        width: 100%;
        max-width: 300px;
    }
</style>