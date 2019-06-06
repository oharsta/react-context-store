import React from "react";
import "./App.scss";
import {Person} from "./Person";
import {Teams} from "./Teams";
import {PersonStateProvider} from "./state/person_store";
import {TeamsStateProvider} from "./state/team_store";

export const App = () =>
    <div>
        <h3>Global state example</h3>
        <PersonStateProvider>
            <Person name="john"/>
            <Person name="john"/>
            <Person name="mary"/>
            <Person name="mary"/>
        </PersonStateProvider>
        <TeamsStateProvider>
            <Teams/>
            <Teams/>
        </TeamsStateProvider>
    </div>
;
