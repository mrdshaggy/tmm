<template>
    <div>
        <form @submit.prevent="onSubmit" ref="createEvent">


            <mu-stepper :activeStep="activeStep" orientation="vertical">
                <!--STEP 1-->
                <mu-step>
                    <mu-step-label><h1>General Info</h1></mu-step-label>
                    <mu-step-content>
                        <h3>I bet it will be great event! Just give an info about this event to your friends!</h3>

                        <mu-raised-button label="Upload event image" @click="pickImage" primary/>
                        <input
                                type="file"
                                style="display: none;"
                                ref="imageInput"
                                accept="image/*"
                                @change="onFileUpload"/>
                        <br>
                        <img :src="newEvent.imageUrl" alt="" style="width: auto; max-height: 250px; margin: 20px auto;">
                        <br>

                        <mu-row gutter>
                            <mu-col width="100" tablet="50" desktop="50">
                                <mu-text-field
                                        label="Event Name:"
                                        type="text"
                                        v-model="newEvent.name"
                                        labelFloat
                                        fullWidth />
                            </mu-col>
                            <mu-col width="100" tablet="50" desktop="50">
                                <mu-text-field
                                        label="Short info:"
                                        type="text"
                                        v-model="newEvent.info"
                                        :errorText="inputErrorText"
                                        @textOverflow="handleInputOverflow"
                                        :maxLength="30"
                                        labelFloat
                                        fullWidth />
                            </mu-col>
                            <mu-col width="100" tablet="50" desktop="50">
                                <mu-date-picker
                                        label="Start Date:" labelFloat fullWidth
                                        okLabel="Ok"
                                        cancelLabel="Cancel"
                                        :dateTimeFormat="enDateFormat"
                                        v-model="newEvent.startDate"/>
                            </mu-col>
                            <mu-col width="100" tablet="50" desktop="50">
                                <mu-date-picker
                                        label="End Date:" labelFloat fullWidth
                                        okLabel="Ok"
                                        cancelLabel="Cancel"
                                        :dateTimeFormat="enDateFormat"
                                        v-model="newEvent.endDate"/>
                            </mu-col>
                            <mu-col width="100" tablet="100" desktop="100">
                                <mu-text-field
                                        v-model="newEvent.description"
                                        hintText="Event Description:"
                                        :errorText="multiLineInputErrorText"
                                        @textOverflow="handleMultiLineOverflow"
                                        multiLine fullWidth
                                        :rows="5" :rowsMax="15"
                                        :maxLength="5000"/>
                            </mu-col>
                            <mu-col width="100" tablet="100" desktop="100">
                                <mu-text-field
                                        label="Event Map (paste url here):"
                                        type="text"
                                        v-model="newEvent.map"
                                        labelFloat fullWidth />
                            </mu-col>
                        </mu-row>
                        <p>Great! It's time to invite friends! Press the Next button, mate!</p>
                        <mu-raised-button label="Next" class="demo-step-button" @click="handleNext" primary/>
                    </mu-step-content>
                </mu-step>

                <!--STEP 2-->
                <mu-step>
                    <mu-step-label><h1>Invite friends</h1></mu-step-label>
                    <mu-step-content>
                        <p>Invite your friends to this event</p>
                        <mu-auto-complete label="Friend's email"
                                          :maxSearchResults="5"
                                          labelFloat :dataSource="users.registered"
                                          ref="inviteInput"
                                          v-model="inviteInputVal"
                                          filter="caseSensitiveFilter"/>
                        <mu-raised-button label="ADD" @click="inviteUser" primary/>
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
                    <mu-step-label>Options</mu-step-label>
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
            <mu-raised-button type="submit" label="Create" primary />
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
                    description: '',
                    map: '',
                    imageUrl: '',
                    image: null,
                    invited: [],
                },
                enDateFormat: enDate,
                input: '',
                inputErrorText: '',
                multiLineInput: '',
                multiLineInputErrorText: '',
                activeStep: 0,
                inviteInputVal: ''
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
            },
            users: {
                source: db.ref('users')
            }
        },
        computed: {
            finished () {
                return this.activeStep > 2
            }
        },
        methods: {
            handleInputOverflow (isOverflow) {
                this.inputErrorText = isOverflow ? 'Wow wow, mate! Too much!' : ''
            },
            handleMultiLineOverflow (isOverflow) {
                this.multiLineInputErrorText = isOverflow ? 'Wow wow, mate! Too much!' : ''
            },
            onSubmit(evt) {
                this.$refs.progress.showProgress('Creating event!');
                this.newEvent.author.name = this.$parent.usr.name;
                this.newEvent.author.email = this.$parent.usr.email;
                this.newEvent.author.photo = this.$parent.usr.photo;

                let imageUrl, key;
                this.$firebaseRefs.events.push(this.newEvent)
                    .then((data) => {
                        key = data.key;
                        return key;
                    })
                    .then(key => {
                        this.$refs.progress.showProgress('Just a moment!');
                        const filename = this.newEvent.image.name;
                        const ext = filename.slice(filename.lastIndexOf('.'));
                        return fs.ref('events/' + key + '.' + ext).put(this.newEvent.image);
                    })
                    .then(fileData => {
                        imageUrl = fileData.metadata.downloadURLs[0];
                        this.$firebaseRefs.events.child(key).update({imageUrl: imageUrl});

                        this.$refs.progress.showProgress('Event created!');
                        setTimeout(() => {
                            this.$router.push({ name: 'event', params: { event_id: key }});
                        },2000);
                    })
                    .catch((error) => {
                        console.log(error)
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
            }
        }
    };
</script>

<style lang="scss">
    .chip {
        margin-right: 10px;
    }
</style>