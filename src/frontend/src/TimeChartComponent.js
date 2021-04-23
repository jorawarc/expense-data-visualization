import React from "react";
import {VictoryChart, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis, VictoryLegend} from 'victory'


class TimeChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    convertToDate(dataItem) {
        const [year, month, day] = dataItem._id.split('/');
        return {date: new Date(year, month, day), total: dataItem.total};
    }


    render() {

        const style={
            axisLabel: {fontSize: 10, fill: '#bebebe', padding: 25},
            tickLabels: {
                fontSize: 7,
                fill: "#bebebe",
                padding: 10
            },
            grid: {stroke: "#bebebe"}
        }

        const travel = this.props.data.travel.map(this.convertToDate);
        const hospitality = this.props.data.hospitality.map(this.convertToDate);
        const contract = this.props.data.contract.map(this.convertToDate);
        return (
            <VictoryChart width={700} height={220} scale={{x: "time"}}>
                <VictoryAxis style={style} tickFormat={(x) => `${x.toLocaleString('default', { month: 'short' })} ${x.getFullYear()}`}/>
                <VictoryAxis style={style} dependentAxis/>
                <VictoryLine style={{data: {stroke: "orange"}}} data={travel} x="date" y="total"/>
                <VictoryLine style={{data: {stroke: "gold"}}} data={hospitality} x="date" y="total"/>
                <VictoryLine style={{data: {stroke: "tomato"}}} data={contract} x="date" y="total"/>
            </VictoryChart>

        )
    }
}

export default TimeChartComponent