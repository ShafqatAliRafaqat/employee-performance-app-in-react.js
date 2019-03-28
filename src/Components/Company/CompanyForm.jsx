import React, {Component} from "react";

import {
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

class CompanyForm extends Component {

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
    const {name,description} = this.state;
    return (
      <React.Fragment>
        
        <FormGroup>
          <Label htmlFor="name">Name*</Label>
          <Input type="text" name="name" placeholder="Name" value={name} onChange={this.onChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description*</Label>
          <Input type="textarea" name="description" placeholder="Description" value={description} onChange={this.onChange} />
        </FormGroup>

      </React.Fragment>
    );
  }
}

export default CompanyForm;
