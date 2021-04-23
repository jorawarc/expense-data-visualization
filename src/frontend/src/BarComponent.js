import React from "react";
import {VictoryChart, VictoryGroup, VictoryStack, VictoryBar, VictoryAxis, VictoryLabel} from 'victory'


class BarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const generateBars = (data, key) => {
            const x = data.map((data, index) => {
                return {x: data._id, y: data[key], total: data.total_contracts + data.total_travel + data.total_hospitality};
            })
            return <VictoryBar data={x} sortOrder="ascending" sortKey='total'/>;
        }

        const style={
            axisLabel: {fontSize: 10, fill: '#bebebe', padding: 25},
            tickLabels: {
                fontSize: 7,
                    fill: "#bebebe",
                    padding: 10
            },
            grid: {stroke: "#bebebe"}
        }
        return (
            <VictoryChart height={250} horizontal className="expense-chart" padding={{top: 75, bottom: 75, left: 85, right: 45}}>
                <VictoryLabel text="Expenditures by Caucus" x={225} y={50} textAnchor="middle" style={{fill: "#FFFFFFFF"}}/>

                <VictoryAxis style={style}/>
                <VictoryAxis dependentAxis style={style} label={"Canadian Dollars"}/>

                <VictoryGroup style={{data: {width: 10}}}>
                    <VictoryStack colorScale={["tomato", "orange", "gold"]} title={"Expenditures by Caucus"} animate={{
                        duration: 1500,
                        onLoad: { duration: 1000 }
                    }}>
                        {generateBars(this.props.groups, "total_contracts")}
                        {generateBars(this.props.groups, "total_travel")}
                        {generateBars(this.props.groups, "total_hospitality")}
                    </VictoryStack>
                </VictoryGroup>
            </VictoryChart>)
    }
}

export default BarComponent