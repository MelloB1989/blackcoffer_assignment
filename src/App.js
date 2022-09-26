import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chart from './Chart';
//import faker from 'faker';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //ChartOptions : {},
      //ChartData : {datasets : []},
      apiData : {},
      isLoaded : false,
      page: 0
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

    const nextchart = () => {
      this.setState({page : this.state.page+1})
      console.log(this.state.page)
    }

    const prevchart = () => {
      this.setState({page : this.state.page-1})
    }

    return (
      <>
      { this.state.isLoaded ? (
      <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
      <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={prevchart}>Previous</Button>
      <Button variant="outlined" disabled>
        Develped by MelloB
      </Button>
      <Button variant="outlined" onClick={nextchart}>Next</Button>
      </Stack>
      </Box>
  
      <div>
        <Chart apiData={this.state.apiData} page={this.state.page}/>
      </div>
      </div>
      )
      :
      (<p></p>)
      }
      </>
    )
  }
}