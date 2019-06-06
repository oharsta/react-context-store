import {createStore} from "./create_store";

export const teams = {
    "teams": [
        {
            name: "Riders",
            description: "We are riders"
        },
        {
            name: "Gliders",
            description: "We are gliders"
        }
    ]
};
export const {
    StateProvider: TeamsStateProvider,
    StateConsumer: TeamsStateConsumer,
    setGlobalState: setGlobalStateTeams,
    getGlobalState: getGlobalStateTeams
} = createStore({...teams});
