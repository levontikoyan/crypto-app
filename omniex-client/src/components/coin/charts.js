import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Loader from '../common/Loader';
import { fetchCoinChartData } from '../../actions';

class Charts extends Component{

  componentDidMount() {
    this.props.fetchCoinChartData(this.props.slug)
  }
  
  render() {
    const coinData = (this.props.coins.data || []).find((v) => v.website_slug === this.props.slug);
    return(
      <div style={{ width: '100%'}}>
        <Loader loading={this.props.chartData.loading}>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={{
              title: {
                text: coinData && coinData.name
              },
              series: [{
                data: this.props.chartData.data
              }]
            }}
          />
        </Loader>
       </div>
    )
  }
}

const mapStateToProps = state => ({
  chartData: state.chartData,
  coins: state.coins
});

const mapDispatchToProps = dispatch => ({
 fetchCoinChartData: (data) => dispatch(fetchCoinChartData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
