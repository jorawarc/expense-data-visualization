import React from "react";
import { Checkbox, FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText } from '@material-ui/core';

class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {hospitality: true, travel: true, contract: true};
    };

    handleChange(e, isChecked, value) {
        this.setState({[e.target.name]: isChecked})
        this.props.onUserInputChange(e.target.name, isChecked);
    }

    render() {
        return (
            <FormControl>
                <FormLabel> Expense Types </FormLabel>
                <FormGroup>
                    <FormControlLabel control={<Checkbox name="travel" checked={this.state.travel} onChange={this.handleChange} />} label="Travel" />
                    <FormControlLabel control={<Checkbox name="hospitality" checked={this.state.hospitality} onChange={this.handleChange} />} label="Hospitality" />
                    <FormControlLabel control={<Checkbox name="contract" checked={this.state.contract} onChange={this.handleChange} />} label="Contract" />
                    <FormHelperText> Select expense types to be visualized </FormHelperText>
                </FormGroup>
            </FormControl>
        );
    }
}

export default UserInput;