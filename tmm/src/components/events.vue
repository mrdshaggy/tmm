<template>
    <div>
        <h3>{{ pageTitle }}</h3>
        <p>Pease create your first event</p>

        <div>
            <b-card no-body>
                <b-tabs card>
                    <!-- Render Tabs -->
                    <b-tab :title="`Event ${i}`" v-for="i in events" :key="i">
                        Tab Contents {{i}}
                        <b-btn size="sm" variant="danger" class="float-right" @click="()=>removeEvent(i)">
                            Close tab
                        </b-btn>
                    </b-tab>

                    <!-- New Tab Button (Using tabs slot) -->
                    <b-nav-item slot="tabs" v-b-modal.modalCreateEvent href="#">
                        Create Event
                    </b-nav-item>

                    <!-- Render this if no tabs -->
                    <div slot="empty" class="text-center text-muted">
                        There are no events.
                        <br> Create a new event, please.
                    </div>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageTitle: 'Events',
                events: [],
                eventsCounter: 0
            }
        },
        methods: {
            removeEvent(x) {
                for (let i = 0; i < this.events.length; i++) {
                    if (this.events[i] === x) {
                        this.events.splice(i, 1);
                    }
                }
            },
            createEvent() {
                this.events.push(this.eventsCounter++);
            }
        },
        mounted() {
            console.log( this.$parent.$data.events )
        }
    }
</script>

<style lang="scss">

</style>