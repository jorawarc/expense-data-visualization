import React from "react";
import CaucusColours from './CaucusColours';



class CardComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    infoCard = (party, first, second, third) => {
        const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2})
        return (
            <article className="card" key={party}>
                <header className="card-header">
                    <h2>{party}</h2>
                </header>
                <section className="card-content">
                    <h3>1. {first.name}<br/>( {formatter.format(first.total_expense)} )</h3>
                    <p>2. {second.name}<br/>( {formatter.format(second.total_expense)} )</p>
                    <p>3. {third.name}<br/>( {formatter.format(third.total_expense)} )</p>
                </section>
            </article>
        )
    }

    render() {
        const data = this.props.spenders
        const l = data.map(item => (
            <section> {this.infoCard(item.caucus, item.spenders[0], item.spenders[1], item.spenders[2])} </section>
        ))
        return <section className='card-list'>{l}</section>
    }
}


export default CardComponent

