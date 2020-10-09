import {Annotate, Surround, DefaultParam, DynamicParam} from "@palerock/vue2-annotate";


export default @Annotate({extends: Surround})
class TimeLogger {

    @DynamicParam
    @DefaultParam
    logApi({propertyEntity}) {
        // 设置其默认属性为属性名
        return propertyEntity.name;
    }

    before({annotate, isGetter, isSetter, trans}) {

        // 通过参数 isGetter, isSetter 添加后缀
        let suffix = '';
        if (isSetter) {
            suffix = '(Setter)';
        }
        if (isGetter) {
            suffix = '(Getter)';
        }

        // 放到 trans 里面供后续方法使用
        trans.suffix = suffix;

        // 通过 annotate 获取该注解上的其它参数值
        const {logApi} = annotate.params;
        console.time(logApi + suffix);
    }

    after({lastValue, annotate, trans}) {
        const {suffix} = trans;
        const {logApi} = annotate.params;
        console.timeEnd(logApi + suffix);
        // 需要将实际返回值返回出去，避免改变原方法返回值
        return lastValue;
    }

    onError({annotate, trans}) {
        const {suffix} = trans;
        const {logApi} = annotate.params;
        // 捕捉到错误时，停止计时
        console.timeEnd(logApi + suffix);
    }
}