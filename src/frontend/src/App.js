import React from "react";
import API from './API'
import CardComponent from './CardComponent'
import BarComponent from "./BarComponent";
import TimeChartComponent from './TimeChartComponent'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoaded: false};
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        Promise.all([
            API.service.caucusAverage(),
            API.service.caucusTotal(),
            API.service.topSpenders(),
            API.service.transactions()
        ]).then(async ([averageExpense, totalExpense, spenders, transactions]) => {
            await this.setState({...this.state,
                average: averageExpense,
                total: totalExpense,
                spenders: spenders,
                transactions: transactions,
                isLoaded: true});
        })
    }

    textStyle(text, color) {
        return <span style={{color: color}}>{text}</span>
    }

    render(){
        if (!this.state.isLoaded){
            return <h1 className="top-title">Loading...</h1>
        }

        return (
            <div>
                <section className="top-level-info">
                    <h1 className="top-title">Hello World!</h1>
                    <p className="top-info"> A data visualization project showcasing Canadian Parliamentary Members expenses paid for by the Tax Payer. Expenses are broken down into three categories: {this.textStyle("Contracts", "tomato")}, {this.textStyle("Travel", "orange")}, and {this.textStyle("Hospitality", "gold")} </p>
                </section>
                <CardComponent spenders={this.state.spenders} className='card-component'/>
                <section className="bar-section">
                    <BarComponent groups={this.state.total} className={"bar-chart"}/>
                    <p className={"info-text"}>Horton nonsuch park ut ullamco clock tower. Fugiat irure aute. Epsom derby laboris dolor labore race clock tower salts exercitation horses. Derby day sint aute id. Velit downs dolor horses anim tempor.
                        Derby ullamco duis. Nulla salts voluptate magna sunt consectetur nisi in ea hospitals consequat. Derby excepteur elit ea. Ewell horton consectetur proident epsom downs.
                        Laborum velit dolor ea horses derby day eu veniam nisi. Sit officia eu fugiat in horse race laborum horses ea aute. Consectetur duis mollit dolor epsom salts laboris labore horses chantilly voluptate id. Enim velit excepteur. Race epsom downs sunt dolor dolore enim adipisicing commodo</p>
                </section>
                <section className={"time-section"}>
                    <TimeChartComponent data={this.state.transactions}/>
                    <p className={"info-text"}>Horton nonsuch park ut ullamco clock tower. Fugiat irure aute. Epsom derby laboris dolor labore race clock tower salts exercitation horses. Derby day sint aute id. Velit downs dolor horses anim tempor.
                        Derby ullamco duis. Nulla salts voluptate magna sunt consectetur nisi in ea hospitals consequat. Derby excepteur elit ea. Ewell horton consectetur proident epsom downs.
                        Laborum velit dolor ea</p>
                </section>
            </div>
    );
    }
}

export default App