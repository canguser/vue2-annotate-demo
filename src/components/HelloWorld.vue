<template>
    <div class="hello">
        <h1>{{ appendMessage }}</h1>
        <h2 @click="handleClick">{{ subTitle }}</h2>
        <h3>{{content}}</h3>
        <p>
            <CustomInput v-model="content"></CustomInput>
        </p>
    </div>
</template>

<script>
    // 引入注解
    import {VueComponent, Props, Computed, NativeApi, Watch} from "@palerock/vue2-annotate";
    import CustomInput from "@/components/CustomInput";

    export default // 使用 @VueComponent 使用一个名为 HelloWorld 的组件
    @VueComponent
    class HelloWorld {

        @NativeApi
        components = {CustomInput};

        content = 'Hello @Model';

        // 申明属性 suffix
        suffix = 'For Vue2 Annotate';

        subTitle = 'My Vue2 Annotate';

        // 声明参数 msg
        @Props
        msg = String;

        // 声明计算属性 message
        @Computed
        appendMessage() {
            return this.msg + ' ' + this.suffix
        }

        // 计算属性的第二种写法
        get message() {
            return this.msg;
        }

        @Watch
        $$subTitle(newValue, oldValue) {
            console.log('sub title changed');
            console.log(oldValue, '=>', newValue);
        }

        set subTitleAppend(value) {
            this.subTitle += ' ' + value;
        }

        // 有 setter 必须有 getter
        get subTitleAppend() {
            return this.subTitle;
        }

        // 声明方法
        handleClick(e) {
            console.log(e, this.message);
            this.subTitleAppend = 'Clicked';
        }

        // 使用 @NativeApi 声明钩子函数
        @NativeApi
        created() {
            console.log('created');
        }

    }

    console.log(HelloWorld);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
