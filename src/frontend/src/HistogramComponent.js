import React from "react";
import {VictoryHistogram, VictoryChart, VictoryGroup, VictoryStack, VictoryBar, VictoryAxis, VictoryLabel} from 'victory'


class HistogramComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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

        const generateHistogram = () => {
            if(this.props.hasOwnProperty("bins")){
                return (<VictoryHistogram
                    data={this.props.data}
                    x={"total"}
                    binSpacing={4}
                    bins={this.props.bins}
                    animate={{
                        duration: 1500,
                        onLoad: { duration: 1000 }
                    }}
                    style={{data: {fill: this.props.color, strokeWidth: 0, width: 1}}}
                />)
            }
            return (<VictoryHistogram
                data={this.props.data}
                x={"total"}
                binSpacing={4}
                animate={{
                    duration: 1500,
                    onLoad: { duration: 1000 }
                }}
                style={{data: {fill: this.props.color, strokeWidth: 0, width: 1}}}
            />)
        }

        return (

            <VictoryChart>

                <VictoryLabel
                    x={225}
                    y={25}
                    textAnchor="middle"
                    style={{fill: "#FFFFFFFF"}}
                    text={this.props.title}
                />

                {generateHistogram()}


                <VictoryAxis
                    style={{axisLabel: style['axisLabel'], tickLabels: style['tickLabels']}}
                />

                <VictoryAxis
                    dependentAxis
                    label="Total # of transaction"
                    style={style}
                />
            </VictoryChart>
        )
    }
}

export default HistogramComponent