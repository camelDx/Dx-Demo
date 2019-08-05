<template>
    <section v-show="show" :class="$style.HoverTip"></section>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        }
    }
}
</script>

<style lang="scss" module>
@import '~style/basic/param';

.HoverTip {
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 4px;
    background: #fff;
    padding: 20px 30px;
    z-index: 1000;
    white-space: nowrap;
    p {
        text-align: left;
        line-height: 20px;
        font-size: 14px;
        color: #333;
        span {
            color: $color-light-blue;
        }
    }
    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > p + p {
            margin-left: 10px;
        }
    }
}
</style>