import {createStore} from "./create_store";

export const persons = {
    john: {
        name: "John Doe",
        address: "HQ",
        country: "NL"
    },
    mary: {
        name: "Mary Doe",
        address: "Pub",
        country: "PT"
    }
};
export const {
    StateProvider: PersonStateProvider,
    StateConsumer: PersonStateConsumer,
    setGlobalState: setGlobalStatePerson
} = createStore({...persons});
