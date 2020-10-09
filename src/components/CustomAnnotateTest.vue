<template>
    <div>
        <button @click="testing">测试时间{{secondMessage}}</button>
    </div>
</template>

<script>
    import {VueComponent, NativeApi} from "@palerock/vue2-annotate";
    import TimeLogger from "@/annotates/TimeLogger";
    import If from "@/annotates/If";

    export default @VueComponent
    class CustomAnnotateTest {

        messages = ['hello', 'world'];

        @TimeLogger
        @If({met: e => e.altKey, otherwise: e => console.log(e.altKey)})
        testing() {
            console.log('do testing');
        }

        @TimeLogger
        get secondMessage() {
            return this.messages[1];
        }

        // 注意，此处不用加注解，同一 name 如果 getter 和 setter 都加了注解，那么会生效两次
        set secondMessage(message) {
            const messages = [...this.messages];
            messages[1] = message;
            this.messages = messages; // 强制更新数组
        }

        @NativeApi
        async created() {
            console.log(this.secondMessage);
            this.secondMessage = 'emmmm';
            console.log(this.secondMessage);
        }
    }
    console.log(CustomAnnotateTest);
</script>

<style scoped>

</style>