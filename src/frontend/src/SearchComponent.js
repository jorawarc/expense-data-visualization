

import React from "react";
import Select from "react-select";
import API from "./API"

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {valueSelect: null};
    }

    render() {

        const data = this.props.data.map(item => {
            return {label: `${item.name} (${item.constituency})`, value: item.value}
        })

        let table;
        if (this.state.valueSelect && this.state.member){
            const {total_travel, total_hospitality, total_contracts, name, salaries} = this.state.member

            const tablePrimaryRow = (title, data) => {
                const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2})
                const headStyle = {"text-align": "left", color: "white"}
                const dataStyle = {"text-align": "right", color: "white"}

                return (
                    <tr>
                        <td className={"table-primary"} style={headStyle}> {title} </td>
                        <td className={"table-primary-data"} style={dataStyle}> {formatter.format(data)} </td>
                    </tr>
                )
            }

            const tableSecondaryRow = (title, data) => {
                const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2})
                const headStyle = {"text-align": "left", color: "#bebebe"}
                const dataStyle = {"text-align": "right", color: "#bebebe"}

                return (
                    <tr>
                        <td className={"table-secondary"} style={headStyle}> {title} </td>
                        <td className={"table-secondary-data"} style={dataStyle}> {formatter.format(data)} </td>
                    </tr>
                )
            }

            table = (
            <table className={"mp-table"} color={"white"} width={"100%"}>
                <thead>
                        <tr className={"table-name"}>
                                <th colSpan={2} style={{"text-align":"center", color:"white"}}> {name} </th>
                        </tr>
                </thead>
                <tbody>
                    {tablePrimaryRow("Total Expenditure", total_contracts + total_hospitality + total_travel)}
                    {tableSecondaryRow(" - Travel", total_travel)}
                    {tableSecondaryRow(" - Hospitality", total_hospitality)}
                    {tableSecondaryRow(" - Contracts", total_contracts)}
                    {tablePrimaryRow("Total Salary", salaries)}
                    {tablePrimaryRow("Combined Tax Payer Sum", salaries + total_contracts + total_hospitality + total_travel)}
                </tbody>

                <a style={{color: "#bebebe"}} href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(this.state.member)
                )}`} download={`${name}.json`}> Download Transaction Details </a>
            </table>
            ) } else {table = <p style={{color: "white"}}> Curious about your MP's expense history, search and download their reported finances </p>}

        return (
            <div style={{width: "50%"}}>
                <Select options={data} onChange={this.handleChange} defaultValue={{ label: "Search MP by name or constituency", value: null }}/>
                {table}
            </div>
        )
    }

    handleChange = async opt => {
        const mp = await API.service.fetch(opt.value)
         await this.setState({valueSelect: opt, member: mp})
    }
}

export default SearchComponent