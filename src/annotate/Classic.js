import {BasicAnnotationDescribe, AnnotationUtils, AnnotationGenerator} from "@palerock/annotate-js";

export class ClassicDescribe extends BasicAnnotationDescribe {

    storageClassDecorator(targetType) {
        super.storageClassDecorator(targetType);

        const target = new targetType();

        this.propertyMap = AnnotationUtils.fromEntries(
            [
                ...Object.getOwnPropertyNames(target),
                ...Object.getOwnPropertyNames(Object.getPrototypeOf(target))
            ].map(key => [key, target[key]])
        );
    }

    onReturn() {
        return this.propertyMap;
    }

}

export const Classic = AnnotationGenerator.generate(ClassicDescribe);