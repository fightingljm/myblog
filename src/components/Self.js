import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import image from '../image/background.jpg'

class Self extends React.Component {
  constructor() {
    super();
    this.state={
      expanded:false
    }
  }
  handleExpandChange (expanded) {
    return this.setState({expanded: expanded});
  }
  handleToggle (event, toggle) {
    return this.setState({expanded: toggle});
  }
  handleExpand () {
    return this.setState({expanded: true});
  }
  handleReduce () {
    return this.setState({expanded: false});
  }
  render(){
    const style = {float:'left',margin:'20px'};
    return(
      <MuiThemeProvider>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange.bind(this)}>
          <Avatar size={30} style={style}>M</Avatar>
          <CardHeader title="Self-Assessment" subtitle="Jinmeng Liu" actAsExpander={true} showExpandableButton={true}/>
          <CardText>
            <Toggle toggled={this.state.expanded} onToggle={this.handleToggle.bind(this)} labelPosition="right" label="This toggle controls the expanded state of the component."/>
          </CardText>
          <CardMedia expandable={true} overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
            <img src={image} />
          </CardMedia>
          <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </CardText>
          <CardActions>
            <FlatButton label="Open" onTouchTap={this.handleExpand.bind(this)} />
            <FlatButton label="Close" onTouchTap={this.handleReduce.bind(this)} />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    )
  }
}

export default Self;
