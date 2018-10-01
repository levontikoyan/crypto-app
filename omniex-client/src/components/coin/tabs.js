import React, { Component } from 'react';
import './tabs.scss';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class TabsComponent extends Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    return (
      <div className="tabs-component">
        <AppBar position="static" className="tabs-header">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            classes={{
              indicator: 'red'
            }}
          >
            <Tab label="Info" className="tab" />
            <Tab label="Charts" className="tab" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {
            this.props.tabs.map((v, k) => (
                <div key={k} className='tabs-container'>{v}</div>
            ))
          }
        </SwipeableViews>
      </div>
    );
  }
}

export default TabsComponent;