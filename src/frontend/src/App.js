import React from "react";
import UserInput from "./UserInput";
import fetch from './API'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setExpenses = this.setExpenses.bind(this)
        this.state = {};
    }

    setExpenses(name, value) {
        console.log(name, value, this.state)
        if (value) {
            delete this.state[name]
            this.setState(this.state, async () => {
                const data = await fetch({}, this.state)
                console.log(data)
            })
        }
        else
        {
            this.setState({[name]: +value}, async () => {
                const data = await fetch({}, this.state)
                console.log(data)
            })
        }
    }

    render() {
        return (
            <div>
                <UserInput onUserInputChange={this.setExpenses}/>
            </div>
        );
    }
}

export default App