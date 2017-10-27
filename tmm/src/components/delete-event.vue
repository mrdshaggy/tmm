<template>
    <div>
        <!-- Modal Component -->
        <b-modal id="modalDeleteEvent"
                 ref="modalDeleteEvent"
                 title="Delete event?"
                 hide-footer>
            <h3 clas="my-4">Are you sure you want to delete this event?</h3>
            <div class="text-right">
                <b-button variant="danger" @click="removeEvent()">Delete</b-button>
                <b-button variant="secondary" @click="hideModal()">Cancel</b-button>
            </div>
        </b-modal>

        <b-alert :show="dismissCountDown"
                 dismissible
                 variant="success"
                 @dismissed="dismissCountdown=0"
                 @dismiss-count-down="countDownChanged">
            {{ alertMsg }}
        </b-alert>
    </div>
</template>

<script>
    import {db} from '../firebase';

    export default {
        data() {
            return {
                alertMsg: '',
                dismissSecs: 5,
                dismissCountDown: 0
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        methods: {
            removeEvent(x) {
//                for (let i = 0; i < this.events.length; i++) {
//                    if (this.events[i] === x) {
//                        this.events.splice(i, 1);
//                    }
//                    this.$firebaseRefs.events.child(x['.key']).remove();
//                }

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