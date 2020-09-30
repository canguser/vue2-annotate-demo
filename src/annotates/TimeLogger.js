import {Annotate, Surround, DefaultParam, DynamicParam} from "@palerock/vue2-annotate";


export default
@Annotate({extends: Surround})
class TimeLogger {

    @DynamicParam
    @DefaultParam
    logApi({propertyEntity}) {
        // 设置其默认属性为属性名
        return propertyEntity.name;
    }

    before({annotate, isGetter, isSetter}) {

        // 通过参数 isGetter, isSetter 添加后缀
        let suffix = '';
        if (isSetter) {
            suffix = '(Setter)';
        }
        if (isGetter) {
            suffix = '(Getter)';
        }

        // 通过 annotate 获取该注解上的其它参数值
        const {logApi} = annotate.params;
        console.time(logApi + suffix);
    }

    after({lastValue, annotate, isGetter, isSetter}) {
        let suffix = '';
        if (isSetter) {
            suffix = '(Setter)';
        }
        if (isGetter) {
            suffix = '(Getter)';
        }

        const {logApi} = annotate.params;
        console.timeEnd(logApi + suffix);
        // 需要将实际返回值返回出去，避免改变原方法返回值
        return lastValue;
    }
}