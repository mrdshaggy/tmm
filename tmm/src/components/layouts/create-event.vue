<template>
    <div>
        <form @submit.prevent ref="createEvent">


            <mu-stepper :activeStep="activeStep" orientation="vertical">
                <!--STEP 1-->
                <mu-step>
                    <mu-step-label><h1>Event card</h1></mu-step-label>
                    <mu-step-content>
                        <h3>Hi, mate! How r u doin? Let's create a new event! Your card will look like this one!</h3>

                        <mu-row gutter>
                            <mu-col width="100" tablet="40" desktop="30">
                                <mu-card class="card">
                                    <mu-card-header :title="this.$parent.usr.name"
                                                    subTitle="Last updated 1 minute ago">
                                        <mu-avatar :src="this.$parent.usr.photo"
                                                   slot="avatar"/>
                                    </mu-card-header>
                                    <mu-card-media class="card-img"
                                                   :title="newEvent.name"
                                                   :subTitle="newEvent.startDate + ' - ' + newEvent.endDate"
                                                   :style="{ backgroundImage: 'url(' + newEvent.imageUrl + ')' }">
                                    </mu-card-media>
                                    <mu-card-text>
                                        {{newEvent.info}}
                                    </mu-card-text>
                                    <mu-card-actions>
                                        <mu-raised-button :label="newEvent.btnText" secondary/>
                                    </mu-card-actions>
                                </mu-card>
                            </mu-col>

                            <mu-col width="100" tablet="60" desktop="70">
                                <mu-raised-button label="Upload event image" @click="pickImage" primary/>
                                <input
                                        type="file"
                                        style="display: none;"
                                        ref="imageInput"
                                        accept="image/*"
                                        @change="onFileUpload"/>
                                <br>

                                <mu-text-field
                                            ref="eName"
                                            label="Event Name:"
                                            type="text"
                                            v-model="newEvent.name"
                                            labelFloat
                                            fullWidth />


                                <mu-text-field
                                            ref="eInfo"
                                            label="Short info:"
                                            type="text"
                                            v-model="newEvent.info"
                                            :errorText="inputErrorText"
                                            @textOverflow="handleInputOverflow"
                                            :maxLength="30"
                                            labelFloat
                                            fullWidth />


                                <mu-date-picker
                                            ref="eStart"
                                            label="Start Date:" labelFloat fullWidth
                                            okLabel="Ok"
                                            cancelLabel="Cancel"
                                            :dateTimeFormat="enDateFormat"
                                            v-model="newEvent.startDate"/>


                                <mu-date-picker
                                            ref="eFinish"
                                            label="End Date:" labelFloat fullWidth
                                            okLabel="Ok"
                                            cancelLabel="Cancel"
                                            :dateTimeFormat="enDateFormat"
                                            v-model="newEvent.endDate"/>

                                <mu-text-field
                                        ref="eBtn"
                                        label="Button text:"
                                        type="text"
                                        v-model="newEvent.btnText"
                                        :errorText="inputErrorText"
                                        @textOverflow="handleInputOverflow"
                                        :maxLength="15"
                                        labelFloat
                                        fullWidth />
                            </mu-col>
                        </mu-row>



                        <mu-raised-button label="Next" @click="handleNext" primary/>
                    </mu-step-content>
                </mu-step>
                <mu-step>
                    <mu-step-label><h1>General Info</h1></mu-step-label>
                    <mu-step-content>
                        <h3>I bet it will be great event! Just give an info about this event to your friends!</h3>



                        <mu-row gutter>

                            <mu-col width="100" tablet="100" desktop="100">
                                <mu-text-field
                                        v-model="newEvent.description"
                                        hintText="Event Description:"
                                        :errorText="multiLineInputErrorText"
                                        @textOverflow="handleMultiLineOverflow"
                                        multiLine fullWidth
                                        :rows="5" :rowsMax="15"
                                        :maxLength="50000"/>
                            </mu-col>
                            <mu-col width="100" tablet="100" desktop="100">
                                <p>Add points of your trip</p>
                                <mu-timeline lineColor="black" lineType="solid">
                                    <mu-timeline-item iconColor="gray">
                                        <mu-raised-button label="Add location" primary/>
                                        <!--<span>Place 1</span>-->
                                    </mu-timeline-item>
                                    <!--<mu-timeline-item lineType="solid">-->
                                        <!--<span>Place 2</span>-->
                                    <!--</mu-timeline-item>-->
                                </mu-timeline>


                                <div>
                                    <iframe
                                            width="600"
                                            height="450"
                                            frameborder="0" style="border:0"
                                            src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyAHJXhPMJK0nOhGWjIJopR8D9S_nQsd3E0&origin=Oslo+Norway&destination=Telemark+Norway&avoid=tolls|highways"
                                            allowfullscreen>
                                    </iframe>
                                </div>



                            </mu-col>
                        </mu-row>
                        <p>Great! It's time to invite friends! Press the Next button!</p>
                        <mu-raised-button label="Next" @click="handleNext" primary/>
                        <mu-flat-button label="Previous" @click="handlePrev"/>
                    </mu-step-content>
                </mu-step>

                <!--STEP 2-->
                <mu-step>
                    <mu-step-label><h1>Invite friends</h1></mu-step-label>
                    <mu-step-content>
                        <h3>Invite your friends to this event!</h3>
                        <mu-auto-complete label="Friend's email"
                                          :maxSearchResults="5"
                                          labelFloat :dataSource="users"
                                          ref="inviteInput"
                                          v-model="inviteInputVal"
                                          @keydown.enter="inviteUser"
                                          filter="caseSensitiveFilter"/>
                        <mu-raised-button label="ADD" @click="inviteUser" primary/>
                        Or press Enter
                        <br>

                        <mu-chip class="chip"
                                 v-for="us in newEvent.invited"
                                 @delete="removeInvited(us)"
                                 showDelete>
                            <mu-avatar :size="32" src="/images/uicon.jpg"/> {{ us }}
                        </mu-chip>

                        <br>
                        <br>

                        <mu-raised-button label="Next" class="demo-step-button" @click="handleNext" primary/>
                        <mu-flat-button label="Previous" class="demo-step-button" @click="handlePrev"/>
                    </mu-step-content>
                </mu-step>

                <!--STEP 3-->
                <mu-step>
                    <mu-step-label><h1>Options</h1></mu-step-label>
                    <mu-step-content>
                        <p>on/off</p>
                        <ul>
                            <li>To do list</li>
                            <li>comments</li>
                            <li>friends can invite another friends</li>
                            <li>Base currency</li>
                            <li>Other currencies</li>
                            <li>Other currencies</li>
                        </ul>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est exercitationem fugiat illum inventore ipsum iure libero nihil nobis odit officia officiis optio quaerat quam quas quidem quo repellat rerum saepe sed similique, ullam veritatis voluptates. Esse, est repellat. Consequuntur, inventore!
                        </p>
                        <mu-raised-button label="Next" class="demo-step-button" @click="handleNext" primary/>
                        <mu-flat-button label="Previous" class="demo-step-button" @click="handlePrev"/>
                    </mu-step-content>
                </mu-step>
            </mu-stepper>
            <p v-if="finished">
                Congrats! You have created new Event. Do you want create one more?
                <a href="javascript:;" @click="reset">Create new one!</a>
            </p>


            <br><br><br>
            <mu-raised-button type="button" @click="onSubmit" label="Create" primary />
            <br><br><br>

        </form>

        <app-notification ref="successToast"></app-notification>
        <app-progress ref="progress"></app-progress>
    </div>
</template>

<script>
    import {db} from '../../firebase';
    import {fs} from '../../firebase';
    import enDate from '../addons/en-datepicker.vue';

    export default {
        data() {
            return {
                newEvent: {
                    author: {
                        name: '',
                        email: '',
                        photo: '',
                    },
                    time: '',
                    name: '',
                    startDate: '',
                    endDate: '',
                    info: '',
                    btnText: '',
                    description: '',
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/temm-dd89d.appspot.com/o/events%2Ftravel-dafault.jpg?alt=media&token=0cc1e9d1-aba9-415d-8b2f-ca5a7530b41f',
                    image: null,
                    invited: [],
                    timeline: '',
                    route: {},
                },
                enDateFormat: enDate,
                input: '',
                inputErrorText: '',
                multiLineInput: '',
                multiLineInputErrorText: '',
                activeStep: 0,
                inviteInputVal: '',
                users: ['v.bodnar@qubstudio.com', 'aa@gmail.com', 'bb@gmail.com', 'cc@gmail.com'],
                googleApiKey: 'AIzaSyAHJXhPMJK0nOhGWjIJopR8D9S_nQsd3E0',
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            },
        },
        components: {

        },
        computed: {
            finished () {
                return this.activeStep > 2
            }
        },
        methods: {
            handleInputOverflow (isOverflow) {
                this.inputErrorText = isOverflow ? 'Wow wow, bro! Too much!' : ''
            },
            handleMultiLineOverflow (isOverflow) {
                this.multiLineInputErrorText = isOverflow ? 'Wow wow, bro! Too much!' : ''
            },
            onSubmit(evt) {
                this.$refs.progress.showProgress('Creating event!');

                this.newEvent.author.name = this.$parent.usr.name;
                this.newEvent.author.email = this.$parent.usr.email;
                this.newEvent.author.photo = this.$parent.usr.photo;
                this.newEvent.invited.toString();

                let imageUrl, key;
                this.$firebaseRefs.events.push(this.newEvent)
                    .then((data) => {
                        key = data.key;
                        return key;
                    })
                    .then(key => {
                        this.$refs.progress.showProgress('Just a moment!');
                        if (this.newEvent.imageUrl == 0) {
                            return;
                        }
                        else {
                            const filename = this.newEvent.image.name;
                            const ext = filename.slice(filename.lastIndexOf('.'));
                            return fs.ref('events/' + key + '.' + ext).put(this.newEvent.image);
                        }
                    })
                    .then(fileData => {
                        console.log(fileData)
                        if (fileData) {
                            imageUrl = fileData.metadata.downloadURLs[0];
                        }
                        else {
                            imageUrl = 'https://firebasestorage.googleapis.com/v0/b/temm-dd89d.appspot.com/o/events%2Ftravel-dafault.jpg?alt=media&token=0cc1e9d1-aba9-415d-8b2f-ca5a7530b41f';
                        }
                        this.$firebaseRefs.events.child(key).update({imageUrl: imageUrl});

                        this.$refs.progress.showProgress('Event created!');
                        setTimeout(() => {
                            this.$router.push({ name: 'event', params: { event_id: key }});
                        },2000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            pickImage () {
              this.$refs.imageInput.click();
            },
            onFileUpload (event) {
                const files = event.target.files;
                let filename = files[0].name;

                if (filename.lastIndexOf('.') <= 0) {
                    return alert('Please add a valid file!');
                }

                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    this.newEvent.imageUrl = fileReader.result;
                });
                fileReader.readAsDataURL(files[0]);
                this.newEvent.image = files[0];
            },
            handleNext () {
                this.activeStep++
            },
            handlePrev () {
                this.activeStep--
            },
            reset () {
                this.$refs.createEvent.reset();
                this.activeStep = 0;
            },
            inviteUser() {
                this.newEvent.invited.push(this.inviteInputVal);
                this.inviteInputVal = '';
                this.$refs.inviteInput.focus();
            },
            removeInvited(e) {
                let index = this.newEvent.invited.indexOf(e);
                if (index >= 0) {
                    this.newEvent.invited.splice(index, 1);
                }
            },
        }
    };
</script>

<style lang="scss">
    .chip {
        margin-right: 10px;
    }

    .card {
        max-width: 300px;
    }

    .card-img {
        height: 200px;
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center;
    }
</style>