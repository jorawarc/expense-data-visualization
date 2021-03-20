import React from "react";
import {VictoryChart, VictoryGroup, VictoryStack, VictoryBar, VictoryAxis} from "victory"

class BarChartComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    getData(propData){

        let x = Object.entries(propData).map(entry => {
            const [key, value] = entry
            const structure = {x: value.name, y: value.total_contracts, y0: 50}
            return structure
        })
        return x
    }

    render() {
        if(this.props.data.length > 0) {
            let d = Object.values(this.props.data)
            return (
                <div>
                    <VictoryChart domainPadding={{x: 10}} width={750} height={750}>
                        <VictoryAxis
                            style={{
                                tickLabels: {
                                    fontSize: 5,
                                    offset: 15,
                                    tickCount: 20
                                }
                            }}
                        />
                        <VictoryGroup offset={15} horizontal>
                            <VictoryStack colorScale={"red"}>
                                <VictoryBar data={this.getData(this.props.data)} sortOrder="ascending" sortKey="y"></VictoryBar>
                            </VictoryStack>
                        </VictoryGroup>
                    </VictoryChart>
                </div>
            );
        } else {
            return <div> No Data </div>
        }
    }
}

export default BarChartComponent