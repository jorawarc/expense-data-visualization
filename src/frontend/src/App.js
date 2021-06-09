import React from "react";
import API from './API'
import CardComponent from './CardComponent'
import BarComponent from "./BarComponent";
import TimeChartComponent from './TimeChartComponent'
import HistogramComponent from "./HistogramComponent";
import SearchComponent from "./SearchComponent";
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
            API.service.transactions(),
            API.service.totalSum(),
            API.service.members()
        ]).then(async ([averageExpense, totalExpense, spenders, transactions, totalSum, members]) => {
            await this.setState({...this.state,
                average: averageExpense,
                total: totalExpense,
                spenders: spenders,
                transactions: transactions,
                totalSum: totalSum,
                members: members,
                isLoaded: true});
        })
    }

    textStyle(text, color) {
        return <span style={{color: color}}>{text}</span>
    }

    render(){
        const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2})
        if (!this.state.isLoaded){
            return <h1 className="top-title">Loading...</h1>
        }

        return (
            <div>
                <section className="top-level-info">
                    <h1 className="top-title">{formatter.format(this.state.totalSum)}</h1>
                    <p className="top-info"> A data exploration project showcasing Canadian Parliamentary Members expenses paid for by the Tax Payer. Expenses are broken down into four categories: {this.textStyle("Contracts", "tomato")}, {this.textStyle("Travel", "orange")}, {this.textStyle("Hospitality", "gold")}, and {this.textStyle("Salaries", "#91fff5")}. (Last Updated 2021 Q2)</p>
                </section>
                <CardComponent spenders={this.state.spenders} className='card-component'/>
                <section className="bar-section">
                    <BarComponent groups={this.state.total} className={"bar-chart"}/>
                    <p className={"info-text"}>{this.textStyle("Salaries", "#91fff5")} account for the majority of expenditures. As the Liberal Caucus holds a larger portion of parliament, they proportionally have a larger expenditure of salaries.<br/>
                        {this.textStyle("Contract", "tomato")} expenses account for the second largest expenditure. These expenses include a variety of transactions, everything related to advertising, office supplies, cellphone plans, etc.<br/>
                        {this.textStyle("Travel", "orange")} and {this.textStyle("Hospitality", "gold")} expenses make up the smallest portion of expenses across all members.
                    </p>
                </section>
                <section className={"time-section"}>
                    <TimeChartComponent data={this.state.transactions}/>
                    <p className={"info-text"}>Given the <em>hockey stick</em> chart below, we see the vast majority of expense occur mid-pandemic. Most of these contract expenses appear to be related to home improvement activities.
                        Likely the result of parliament members needing to implement a suitable remote work station. Surprisingly, travel expenses are increasing despite federal and provincial restrictions, reaching a quarterly high. </p>
                </section>
                <section className={"hist-section"}>
                    <HistogramComponent data={this.state.transactions.contract} color={"tomato"} bins={12} title={"Contract Transactions"}/>
                    <HistogramComponent data={this.state.transactions.travel} color={"orange"} title={"Travel Transactions"}/>
                    <HistogramComponent data={this.state.transactions.hospitality} color={"gold"} title={"Hospitality Transactions"}/>
                </section>
                <p className={"info-text"}>The frequency of each expense category is proportional to the overall expenditure. As {this.textStyle("contract", "tomato")} expenses account for the vast majority of expenses, they expectedly occur twice as often as {this.textStyle("travel", "orange")} expenses and ten times as often as {this.textStyle("hospitality", "gold")} expenses.</p>
                <section className={"search-section"}>
                    <SearchComponent class={"search"} data={this.state.members}/>
                </section>
                <section className={"info-text"}>
                    <p>
                        The project uses data from <a style={{color: "#bebebe"}} href={"https://www.ourcommons.ca/en/open-data#ExpendituresMembers"}> ourcommons.ca </a> which is then process and displayed using a dockerized MERN stack. The full code-base, documentation and dataset can be found on <a style={{color: "#bebebe"}} href={"https://github.com/jorawarc/expense-data-visualization"}>Github.</a>
                    </p>
                </section>
            </div>
    );
    }
}

export default App