import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Card, CardSubtitle, CardHeader, CardBody, Button } from 'reactstrap';
import { STATS } from './data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      stats: STATS
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick() {
    if(this.state.startDate != '' && this.state.endDate != '') {
      var newStats = STATS.filter(obj => {
        var d = new Date(obj.date)
        var s = new Date(this.state.startDate)
        var e = new Date(this.state.endDate);
        if(d>=s && d<=e) {
          return obj
        }
      })
      this.setState({
        stats: newStats
      })
    }
  }

  render() {
    const websites = this.state.stats.map(res => res.websiteId)
    const uniqueWebsite = [...new Set(websites)];
    var ans_Chats = {};
    var ans_MissedChats = {}
    var ans = []
    for (var i = 0; i < uniqueWebsite.length; i++) {
      ans_Chats[uniqueWebsite[i]] = 0;
      ans_MissedChats[uniqueWebsite[i]] = 0;
    }
    for (var i = 0; i < this.state.stats.length; i++) {
      ans_Chats[this.state.stats[i].websiteId] += this.state.stats[i].chats;
      ans_MissedChats[this.state.stats[i].websiteId] += this.state.stats[i].missedChats
    }

    const withoutDate = uniqueWebsite.map(id => {
      return (
        <Card className="m-3">
          <CardHeader>
            WebsiteID: {id}
          </CardHeader>
          <CardBody>
            <div className="row">
              <CardSubtitle className="col-3" >Chats Sum</CardSubtitle>
              <CardSubtitle className="col-3">{ans_Chats[id]}</CardSubtitle>
            </div>
            <div className="row">
              <CardSubtitle className="col-3">Missed Chats Sum</CardSubtitle>
              <CardSubtitle className="col-3">{ans_MissedChats[id]}</CardSubtitle>
            </div>
          </CardBody>
        </Card>
      );
    })
    return (
      <div>
        <Form>
          <Row style={{ marginTop: 40, marginLeft: 40, marginBottom: 20, marginRight: 40 }}>
            <Col md={6}>
              <FormGroup>
                <Label for="StartDate">Start Date</Label>
                <Input type="date" name="startDate" id="StartDate" placeholder="Start Date" value={this.state.startDate} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="EndDate">End Date</Label>
                <Input type="date" name="endDate" id="EndDate" placeholder="End Date" value={this.state.endDate} onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            <Button outline color="primary" style={{ width: 100, }} onClick={this.handleClick}>Apply</Button>{' '}
          </Row>
        </Form>
          {withoutDate}
      </div>
    );
  }
}

export default App;
