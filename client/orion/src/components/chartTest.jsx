import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [44, 55],
        options: {
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false,
                // position: 'bottom'
              },
              labels: {
                show: false,
              }
            }
          }]
        }
      };
    }

    render() {
      return (
        <div>
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
          </div>
          <div id="html-dist"></div>
        </div>
      );
    }
  }

  export default ApexChart;