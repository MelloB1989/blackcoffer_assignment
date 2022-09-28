import React, { Component } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
    

export default class Chart extends Component {

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    componentDidMount(){
        
    }

  render() {

    var ChartData = {
        labels: ["Relevance", "Intensity", "Likelihood"],
        datasets: [
        {
            label: this.props.apiData[this.props.page].title,
            fill: true,
            data: [this.props.apiData[this.props.page].relevance, this.props.apiData[this.props.page].intensity, this.props.apiData[this.props.page].likelihood],
            boderColor: this.getRandomColor(),
            backgroundColor: this.getRandomColor(),
            //backgroundColor: "rgba(75,192,192,0.2)",
            //borderColor: "rgba(75,192,192,1)"
        }
        ],
      };
      var ChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "BlackCoffer Assignment",
          },
        },
      };

    return (
      <div>
        <Line options={ChartOptions} data={ChartData} />
      </div>
    )
  }
}
