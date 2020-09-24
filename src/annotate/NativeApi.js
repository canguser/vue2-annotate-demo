import {AnnotationGenerator} from "@palerock/annotate-js";
import {ExtraDescribe} from "@/annotate/Extra";

export class NativeApiDescribe extends ExtraDescribe{
}

export const NativeApi = AnnotationGenerator.generate(NativeApiDescribe);