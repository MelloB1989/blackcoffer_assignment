import React, { Component } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ChartOptions : {},
      ChartData : {datasets : []},
      apiData : {},
      isLoaded : false
    };
  }

  componentDidMount(){
    fetch(`https://rxyyzqo4dj.execute-api.ap-south-1.amazonaws.com/dev/api`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "XnVprdMJuVuP7B23EfHr7MPmwFOAIrA6lShzZrUg",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            apiData: result,
            ChartData : {
              labels: ["Relevance", "Intensity", "Likelihood"],
              datasets: [
                {
                  label: result.title,
                  data: [result.relevance, result.intensity, result.likelihood],
                  borderColor: "rgb(53, 162, 235)",
                  backgroundColor: "rgba(53, 162, 235, 0.4)",
                },
              ],
            },
            ChartOptions : {
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: this.state.apiData['title'],
                },
              },
            }
          }
          );
          //console.log(this.state.apiData.title);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    
    return (
      <>
      { this.state.isLoaded ? (
      <div>
        <Bar options={this.state.ChartOptions} data={this.state.ChartData} />
      </div>
      )
      :
      (<p></p>)
      }
      </>
    )
  }
}