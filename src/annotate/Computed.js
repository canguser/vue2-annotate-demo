import {AnnotationGenerator} from "@palerock/annotate-js";
import {ExtraDescribe} from "@/annotate/Extra";

export class ComputedDescribe extends ExtraDescribe{
}

export const Computed = AnnotationGenerator.generate(ComputedDescribe);