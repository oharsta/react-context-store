import React, {createElement} from "react";

export const createStore = (initialState) => {
    const stateItemConsumers = {};
    const stateItemUpdateListeners = {};
    const stateItemUpdaters = {};
    const stateItemValues = initialState;

    let StateProvider = ({children}) => createElement(React.Fragment, null, children);

    Object.keys(initialState).forEach(name => {
        const {Provider, Consumer} = React.createContext({
            value: initialState[name],
            update: () => {
                throw new Error("cannot update initial value");
            },
        });
        stateItemConsumers[name] = ({children}) => createElement(Consumer, null, ({value, update}) => children(value, update));
        stateItemUpdateListeners[name] = [];
        stateItemUpdaters[name] = func => stateItemUpdateListeners[name].forEach(listener => listener(func));
        const InnerProvider = StateProvider;

        StateProvider = class extends React.PureComponent {

            constructor() {
                super();
                stateItemUpdateListeners[name].push((funcOrValue) => {
                    const newValue = typeof funcOrValue === "function" ? funcOrValue(this.state.value) : funcOrValue;
                    this.setState({value: newValue});
                    stateItemValues[name] = newValue;
                });
                this.state = {value: initialState[name], update: stateItemUpdaters[name]};
            }

            render = () => createElement(Provider, {value: this.state},
                createElement(InnerProvider, null, this.props.children));
        };
    });
    const StateConsumer = ({name, children}) => stateItemConsumers[name]({children});
    return {
        StateProvider,
        StateConsumer,
        setGlobalState: (name, update) => stateItemUpdaters[name](update),
        getGlobalState: name => stateItemValues[name],
    };
};