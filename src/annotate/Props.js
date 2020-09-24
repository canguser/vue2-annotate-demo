import {AnnotationGenerator} from "@palerock/annotate-js";
import {ExtraDescribe} from "@/annotate/Extra";

export class PropDescribe extends ExtraDescribe{
}

export const Props = AnnotationGenerator.generate(PropDescribe);