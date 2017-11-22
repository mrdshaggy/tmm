<template>
    <div>
        <form @submit.prevent="onSubmit" ref="createEvent">


            <mu-stepper :activeStep="activeStep" orientation="vertical">
                <mu-step>
                    <mu-step-label><h2>General Info</h2></mu-step-label>
                    <mu-step-content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolores esse et ex harum labore libero maiores numquam repellendus unde!
                        </p>

                        <mu-raised-button label="Upload Image" @click="pickImage" primary/>
                        <input
                                type="file"
                                style="display: none;"
                                ref="imageInput"
                                accept="image/*"
                                @change="onFileUpload"/>
                        <br>
                        <img :src="newEvent.imageUrl" alt="" style="width: auto; max-height: 250px; margin: 20px auto;">
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
                                :maxLength="5000"/>
                        <br>

                        <mu-text-field
                                label="Event Map (paste url here):"
                                type="text"
                                v-model="newEvent.map"
                                labelFloat fullWidth />
                        <br>

                        <mu-raised-button label="Next" class="demo-step-button" @click="handleNext" primary/>
                    </mu-step-content>
                </mu-step>

                <!--STEP 2-->
                <mu-step>
                    <mu-step-label>Add Friends</mu-step-label>
                    <mu-step-content>
                        <p>
                            Friends step
                        </p>
                        <mu-raised-button label="Next" class="demo-step-button" @click="handleNext" primary/>
                        <mu-flat-button label="Previous" class="demo-step-button" @click="handlePrev"/>
                    </mu-step-content>
                </mu-step>

                <!--STEP 3-->
                <mu-step>
                    <mu-step-label>To do list</mu-step-label>
                    <mu-step-content>
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
                        photo: '',
                    },
                    time: '',
                    name: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    map: '',
                    imageUrl: '',
                    image: null,
                },
                enDateFormat: enDate,
                input: '',
                inputErrorText: '',
                multiLineInput: '',
                multiLineInputErrorText: '',
                activeStep: 0,
            }
        },
        firebase: {
            events: {
                source: db.ref('events')
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
            }
        }
    };
</script>

<style lang="scss">

</style>