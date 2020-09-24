import {BasicAnnotationDescribe, AnnotationUtils, AnnotationGenerator} from "@palerock/annotate-js";
import {Extra} from "@/annotate/Extra";
import {NativeApi} from "@/annotate/NativeApi";
import {Computed} from "@/annotate/Computed";
import {Prop} from "@/annotate/Prop";

export class ClassicDescribe extends BasicAnnotationDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            name: ''
        })
    }

    get defaultKey() {
        return 'name'
    }

    get componentName() {
        return this.name || this.classEntity.name;
    }

    storageClassDecorator(targetType) {
        super.storageClassDecorator(targetType);

        const target = new targetType();

        const propertyMap = AnnotationUtils.fromEntries(
            [
                ...Object.getOwnPropertyNames(target),
                ...Object.getOwnPropertyNames(Object.getPrototypeOf(target))
            ].map(key => [key, target[key]])
        );

        const properties = this.classEntity.properties;

        this.dataMap = {};
        this.nativeMap = {};
        this.computedMap = {};
        this.propMap = {};

        Object.keys(propertyMap).forEach(
            key => {
                const targetProperty = properties.find(property => property.name === key);
                let isDataOrMethod = true;
                if (targetProperty) {
                    if (targetProperty.hasAnnotations(Extra)) {
                        isDataOrMethod = false;
                    }
                    if (targetProperty.hasAnnotations(NativeApi)) {
                        this.nativeMap[key] = propertyMap[key];
                    }
                    if (targetProperty.hasAnnotations(Computed)) {
                        this.computedMap[key] = propertyMap[key];
                    }
                    if (targetProperty.hasAnnotations(Prop)) {
                        this.propMap[key] = propertyMap[key];
                    }
                }
                if (isDataOrMethod) {
                    this.dataMap[key] = propertyMap[key];
                }
            }
        )
    }

    parseDataOrMethods(result = {}) {
        const methods = {};
        const data = {};
        Object.entries(this.dataMap).forEach(
            ([key, value]) => {
                if (typeof value === 'function') {
                    methods[key] = value;
                } else {
                    data[key] = value;
                }
            }
        );
        Object.assign(result, {
            methods, data() {
                return data
            }
        })
    }

    parseComputedMap(result = {}) {
        result.computed = {...result.computed, ...this.computedMap};
    }

    parseNativeApi(result = {}) {
        const _this = this;
        const nativeMap = {...this.nativeMap};
        if ('data' in nativeMap) {
            const existData = result.data;
            nativeMap.data = function () {
                return {
                    ..._this.nativeMap.data,
                    ...(typeof existData === 'function' ? existData() : {})
                };
            }
        }
        Object.assign(result, nativeMap);
    }

    parsePropMap(result = {}) {
        result.props = {...result.props, ...this.propMap};
    }

    onReturn() {
        const result = {};
        result.name = this.componentName;
        this.parseDataOrMethods(result);
        this.parseComputedMap(result);
        this.parsePropMap(result);
        this.parseNativeApi(result);
        return result;
    }

}

export const Classic = AnnotationGenerator.generate(ClassicDescribe);
