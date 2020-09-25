<template>
    <div class="hello">
        <h1>{{ appendMessage }}</h1>
        <h2 @click="handleClick">{{ message }}</h2>
    </div>
</template>

<script>
    // 引入注解
    import {VueComponent, Props, Computed, NativeApi} from "@palerock/vue2-annotate";

    export default
    // 使用 @VueComponent 使用一个名为 HelloWorld 的组件
    @VueComponent
    class HelloWorld {

        // 申明属性 suffix
        suffix = 'For Vue2 Annotate';

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

        // 声明方法
        handleClick(e) {
            console.log(e);
            alert(this.appendMessage);
        }

        // 使用 @NativeApi 声明钩子函数
        @NativeApi
        created() {
            console.log('created');
        }

    }
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
