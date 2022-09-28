import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chart from './Chart';
//import faker from 'faker';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //ChartOptions : {},
      //ChartData : {datasets : []},
      apiData : {},
      isLoaded : false,
      page: 0,
      filter: false,
      topic: '',
      endyr: '',
      sector: '',
      pest: '',
      source: '',
      country: '',
      city: '',
      noData: false,
      arrLength: 0
    };
  }

  componentDidMount(){
    //FIRST API HIT ON PAGE LOAD
    fetch(`https://rxyyzqo4dj.execute-api.ap-south-1.amazonaws.com/dev/api`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "XnVprdMJuVuP7B23EfHr7MPmwFOAIrA6lShzZrUg",
        "topic": this.state.topic,
        "endyr": this.state.endyr,
        "sector": this.state.sector,
        "pest": this.state.pest,
        "source": this.state.source,
        "country": this.state.country,
        "city": this.state.city,
        "region": ""
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            apiData: result,
            arrLength: result.length
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

    const api_get = () => {
      //FILTER API HIT
      fetch(`https://rxyyzqo4dj.execute-api.ap-south-1.amazonaws.com/dev/api`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "XnVprdMJuVuP7B23EfHr7MPmwFOAIrA6lShzZrUg",
        "topic": this.state.topic,
        "endyr": this.state.endyr,
        "sector": this.state.sector,
        "pest": this.state.pest,
        "source": this.state.source,
        "country": this.state.country,
        "city": this.state.city,
        "region": ""
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            apiData: result,
            arrLength: result.length
          }
          );
          //console.log(result.noData);
          if (result["noData"] === "true")
            this.setState({noData: true})
          else
            this.setState({noData: false})
          //console.log(this.state.noData)
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

    const nextchart = () => {
      this.setState({page : this.state.page+1})
      //console.log(this.state.page)
    }

    const prevchart = () => {
      this.setState({page : this.state.page-1})
    }

    return (
      <>
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
        {this.state.page === 0 ? (<Button variant="outlined" disabled>Previous</Button>) : (
      <Button variant="outlined" onClick={prevchart}>Previous</Button>
        )}
      <Button variant="outlined" disabled>
        Develped by MelloB
      </Button>
      <Button variant="outlined" onClick={nextchart}>Next</Button>
      </Stack>
      </Box>
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

      <Fab variant="extended" size="medium" onClick={() => this.setState({filter: !this.state.filter})} color={this.state.filter ? "primary" : "white"} aria-label="filter" >
        {this.state.filter ? (<CheckIcon sx={{ mr: 1 }} />) : (<ClearIcon sx={{ mr: 1}} />)}
        Filter
      </Fab>
      { this.state.filter ? 
      ( <>
<TextField
          id="topic"
          label="Topic"
          type="search"
          variant="filled"
          onChange={(event) => this.setState({topic : event.target.value})}
          value={this.state.topic}
        />

<TextField
        id="end_year"
        label="End Year"
        type="search"
        variant="filled"
        onChange={(event) => this.setState({endyr : event.target.value})}
        value={this.state.endyr}
      />

<TextField
        id="sector"
        label="Sector"
        type="search"
        variant="filled"
        onChange={(event) => this.setState({sector : event.target.value})}
        value={this.state.sector}
      />

<TextField
        id="region"
        label="Region"
        type="search"
        variant="filled"
        onChange={(event) => this.setState({region : event.target.value})}
        value={this.state.region}
      />

<TextField
        id="pest"
        label="Pest"
        type="search"
        variant="filled"
        onChange={(event) => this.setState({pest : event.target.value})}
        value={this.state.pest}
      />

<TextField
        id="source"
        label="Source"
        type="search"
        variant="filled"
        onChange={(event) => this.setState({source : event.target.value})}
        value={this.state.source}
      />

<TextField
        id="country"
        label="Country"
        type="search"
        variant="filled"
        onChange={(event) => this.setState({country : event.target.value})}
        value={this.state.country}
      />

<TextField
        id="city"
        label="City"
        type="search"
        variant="filled"
        onChange={(event) => this.setState({city : event.target.value})}
        value={this.state.city}
      />

<Button onClick={api_get} variant="contained">Apply</Button>
      </>
      ) : (
        <p></p>
      )
      }

      </Stack>
      </Box>
      { !this.state.noData && this.state.isLoaded ? (
      <>
      <div>
        <Chart apiData={this.state.apiData} page={this.state.page} noData={this.state.noData}/>
      </div>
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
      <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Variables
        </Typography>
        <Typography variant="body2">
          Topic
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {this.state.apiData[this.state.page]['topic']}
        </Typography>
        <Typography variant="body2">
          Year
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {this.state.apiData[this.state.page]['start_year']} - {this.state.apiData[this.state.page]['end_year']}
        </Typography>
        <Typography variant="body2">
          Country
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {this.state.apiData[this.state.page]['country']}
        </Typography>
        <Typography variant="body2">
          Region
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {this.state.apiData[this.state.page]['region']}
        </Typography>
        <Typography variant="body2">
          Pestle
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {this.state.apiData[this.state.page]['pestle']}
        </Typography>
      </CardContent>
    </Card>
    </Box>
    </div>
    </>
    ): (<p></p>)
      }
      </div>
      </>
    )
  }
}