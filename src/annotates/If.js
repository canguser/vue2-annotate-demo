import {Annotate, Surround} from "@palerock/vue2-annotate";

export default @Annotate({extends: Surround})
class If {

    met() {
        return true;
    }

    otherwise() {
    }

    before({params, annotate, preventDefault}) {
        const {met, otherwise} = annotate.params;
        if (!met.apply(this, params)) {
            preventDefault();
            return otherwise.apply(this, params);
        }
    }

}