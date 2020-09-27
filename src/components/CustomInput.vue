<template>
    <label>
        测试 @Model
        <input type="text" v-model="content">
    </label>
</template>

<script>
    import {Model, VueComponent} from "@palerock/vue2-annotate";

    export default @VueComponent
    class CustomInput {
        @Model('value')
        content = String;
    }
</script>

<style scoped>

</style>