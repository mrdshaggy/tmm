<template>
    <div>
        <div class="events-group">
            <h3>Hey, {{ this.$parent.usr.name }}, you have {{ eventsCounter }} events!</h3>
            <div class="filter mb-4">
                <span>Filter by name:</span>
                <input type="text" v-model="filter">
            </div>

            <h4>Your events</h4>

            <mu-row class="f-start">
                <mu-col width="50" tablet="30" desktop="25"
                        v-for="event in events"
                        v-if="event.author.email === $parent.usr.email">
                    <mu-card>
                        <mu-card-header :title="'By ' + event.author.name"
                                        subTitle="Last updated 3 mins ago">
                            <mu-avatar :src="event.author.photo"
                                       slot="avatar"/>
                        </mu-card-header>
                        <mu-card-media class="card-img"
                                       :title="event.name"
                                       :subTitle="event.startDate + ' - ' + event.endDate"
                                       :style="{ backgroundImage: 'url(' + event.imageUrl + ')' }">
                        </mu-card-media>
                        <mu-card-text>
                            {{ event.info }}
                        </mu-card-text>
                        <mu-card-actions>
                            <router-link :to="{ name: 'event', params: { event_id: event['.key'] }}">
                                <mu-flat-button label="Check it!" primary/>
                            </router-link>

                            <!--<mu-flat-button label="Action 2"/>-->
                        </mu-card-actions>
                    </mu-card>
                </mu-col>
            </mu-row>

        </div>

        <div class="events-group">
            <h4>Events with you</h4>
        </div>

        <div class="events-group">
            <h4>Friends events</h4>

        </div>
    </div>
</template>

<script>
    import {db} from '../../firebase';
    import {fs} from '../../firebase';

    export default {
        data() {
            return {
                filter: '',
                pageTitle: 'Events',
                eventsCounter: 0,
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            }
        },
        methods: {

        },
        computed: {
            filteredItems() {
                return this.events.name.filter(item => {
                    return item.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                })
            },
            getEventsCounter() {
                this.eventsCounter = this.events.length;
            }
        },
        mounted() {
            this.getEventsCounter;
        },
        updated() {
            this.getEventsCounter;
        }
    }
</script>

<style lang="scss" scoped>
    p {
        margin-bottom: 0;
    }

    .btn-group {
        margin-top: 10px;
    }

    .events-group {
        border-bottom: 1px solid #eee;
        margin-bottom: 60px;
        padding-bottom: 20px;
    }

    .card-img {
        height: 200px;
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center;
    }

    .f-start {
        justify-content: flex-start;
    }

    .mu-card {
        margin: 0 10px;
    }

    .mu-card-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-bottom: 0;
    }

</style>