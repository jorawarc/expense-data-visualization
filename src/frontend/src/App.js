import React from "react";
import UserInput from "./UserInput";
import BarChartComponent from "./BarChartComponent";

import fetch from './API'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setExpenses = this.setExpenses.bind(this)
        this.state = {params: {}, data: {}};
    }

    componentDidMount() {
        fetch({}, {}).then(async (data) => {
            await this.setState({data: data})
        })
    }

    setExpenses(name, value) {
        if (value) {
            delete this.state["params"][name]
        }
        else {
            this.state.params[name] = +value
        }
        this.setState(this.state, async () => {
            const data = await fetch({}, this.state.params)
            this.state.data = data
            await this.setState(this.state)
        })
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default App