<template>
    <div class="registration">
        <h3>Registration / Log In</h3>
        <p>Welcome to the team money manager! <br>
            Please sign in to use service. Thank you!
        </p>
        <a href="#" @click.prevent="auth(gp)">
            <img src="../../assets/google-btn.svg" alt="">
        </a>
        <a href="#" @click.prevent="auth(fbp)">
            <img src="../../assets/fb-btn.svg" alt="">
        </a>
    </div>
</template>

<script>
    import firebase from 'firebase';
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var facebookProvider = new firebase.auth.FacebookAuthProvider();

    export default {
        data() {
            return {
                fbp: facebookProvider,
                gp: googleProvider,
            }
        },
        methods: {
            auth(provider) {
                firebase.auth().signInWithPopup(provider).then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    var user = result.user;
                    this.$router.push('events');
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    h3 {
        margin-bottom: 30px;
    }
    p {
        margin-bottom: 20px;
    }
    .registration {
        text-align: center;
        margin: 15% auto 0;
        border-radius: 8px;
        padding: 50px;
        background: #fff;
        max-width: 500px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    }
    a {
        width: 46px;
        height: 46px;
        display: inline-block;
        margin: 10px;
        transition: opacity 0.3s;
    }
    a:hover {
        opacity: 0.8;
    }
</style>