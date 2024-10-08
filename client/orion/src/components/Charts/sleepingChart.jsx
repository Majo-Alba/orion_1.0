import React from "react";
import ReactApexChart from "react-apexcharts";

class SleepingChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [0,0, 44, 100],
        options: {
          chart: {
            type: 'donut',
          },
          legend: {
            show: false
          },
          dataLabels: {
            enabled: false
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

  export default SleepingChart;