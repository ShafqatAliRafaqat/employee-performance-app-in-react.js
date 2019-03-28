import React, {Component} from "react";

import {
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

class NewsForm extends Component {

  state = {
    ...this.props
  };

  onChange = e => {
    const {onChange} = this.props;
    this.setState({
      [e.target.name]: e.target.value
    });
    onChange(e);
  };

  render(){
    const {news} = this.state;
    return (
      <React.Fragment>

        <FormGroup>
          <Label htmlFor="news">News*</Label>
          <Input type="textarea" name="news" placeholder="News" value={news} onChange={this.onChange} />
        </FormGroup>

      </React.Fragment>
    );
  }
}

export default NewsForm;
