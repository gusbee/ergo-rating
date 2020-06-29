import React from 'react'
import { PieChart } from 'react-native-svg-charts'

/**
 * How to use :
 * <Chart 
 *  data = [numbers]
 * />
 */
 
export default class ChartPie extends React.PureComponent {
    
    render() {

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        const fillColors = [
            "#DBFADB",
            "#F6F9D7",
            "#F3DFBC",
            "#F3BCBC"
        ];

        const strokeColors = [
            "#0C5C00",
            "#AA8200",
            "#6B3200",
            "#780101"
        ];

        const pieData = this.props.data
            .map((value, index) => ({
                key: index,
                value: value,
                svg: {
                    fill: fillColors[index],
                    stroke: strokeColors[index],
                }
            }));

        return (
            <PieChart
                style={{ height: 300, marginVertical: 12 }}
                data={pieData}
                outerRadius="100%"
                innerRadius="75%"
                spacing={0}
            />
        )
    }
}