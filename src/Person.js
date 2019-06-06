import React from "react";
import {persons, setGlobalStatePerson, PersonStateConsumer} from "./state/person_store";

const style = {
    margin: "40px"
};

export const Person = ({name}) => (
    <PersonStateConsumer name={name}>
        {(person, update) => (
            <div style={style}>
                <label>Name</label>
                <input value={person.name || ""}
                       onChange={e => update({...person, name: e.target.value})}/>

                <label>Address</label>
                <input value={person.address || ""}
                       onChange={e => update({...person, address: e.target.value})}/>

                <label>Country</label>
                <input value={person.country || ""}
                       onChange={e => update(p => ({...p, country: e.target.value}))}/>

                <button onClick={() => setGlobalStatePerson(name, persons[name])}>Reset</button>
            </div>
        )}
    </PersonStateConsumer>
);

new Promise(resolve => setTimeout(() => resolve({name: "hmmmm"}), 3500))
    .then(p => setGlobalStatePerson("john", p));
