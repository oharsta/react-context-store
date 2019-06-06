import React from "react";
import {teams as initialState, setGlobalStateTeams, TeamsStateConsumer, getGlobalStateTeams} from "./state/team_store";

const style = {
    margin: "40px"
};
const attrStyle = {
    display: "inline-block",
    margin: "0 10px",
    fontStyle: "italic"
};

class NewTeam extends React.Component {

    constructor() {
        super();
        this.state = {name: "", description: ""}
    }

    render() {
        const {name, description} = this.state;
        return <div>
            <label>Name</label>
            <input value={name} onChange={e => this.setState({name: e.target.value})}/>

            <label>Description</label>
            <input value={description} onChange={e => this.setState({description: e.target.value})}/>

            <button
                onClick={() => {
                    const newTeam = {...this.state};
                    this.setState({name: "", description: ""},
                        () => setGlobalStateTeams("teams", [...getGlobalStateTeams("teams"), newTeam]));
                }}>Submit
            </button>
        </div>
    }
}

export const Teams = () => (
    <TeamsStateConsumer name="teams">
        {(teams, update) => (
            <div style={style}>
                {teams.map((team, index) =>
                    <div key={index}>
                        <label>Name</label>
                        <label style={attrStyle}>{team.name || ""}</label>

                        <label>Description</label>
                        <label style={attrStyle}>{team.description || ""}</label>

                        <button onClick={() => update(teams.filter(t => t.name !== team.name))}>Remove</button>
                    </div>)}

                <NewTeam/>

                <button onClick={() => setGlobalStateTeams("teams", initialState.teams)}>Reset</button>
            </div>
        )}
    </TeamsStateConsumer>
);
