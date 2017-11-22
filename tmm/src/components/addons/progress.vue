<template>
    <div v-if="progress" class="progress">
        <mu-circular-progress :size="60" :strokeWidth="5"/>
        <div class="progress__text">
            {{ progressText }}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                progress: false,
                progressText: 'Please wait!',
            }
        },
        methods: {
            showProgress(text) {
                this.progressText = text
                this.progress = true;
            },
            hideProgress() {
                this.progress = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .progress {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(#000, 0.2);
    }
    .mu-circular-progress {
        position: fixed;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .progress__text {
        text-align: center;
        color: #7e57c2;
        font-size: 24px;
        position: fixed;
        width: 100%;
        top: calc(50% + 50px);
    }
</style>