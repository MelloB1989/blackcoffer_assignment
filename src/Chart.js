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
          /*
          {
            label: result.title,
            data: [result.relevance, result.intensity, result.likelihood],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.4)",
          },
          {
            label: result.title,
            data: [3, 2, 4],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: result.title,
            data: [2, 4, 1],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          
         result.map((dataset) => {
          return {
            label: dataset.title,
            data: [dataset.relevance, dataset.intensity, dataset.likelihood],
            boderColor: this.getRandomColor(),
            backgroundColor: this.getRandomColor,
          }
         }),
         */
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
