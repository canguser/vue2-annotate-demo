import {Annotate, Surround} from "@palerock/vue2-annotate";

export default @Annotate({extends: Surround})
class ErrorHandler {

    onError({error, resolve}) {
        console.log(error);
        resolve();
    }

}