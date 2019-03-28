import React, { Component } from "react";

import {
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import monthsAndYears from './MonthsAndYears';

import CompanySelect from "../Company/CompanySelect"


class StatementForm extends Component {

  state = {
    ...this.props
  };

  componentWillMount() {
    this.setState({
      ...monthsAndYears
    });
  }

  onChange = e => {
    const { onChange } = this.props;
    this.setState({
      [e.target.name]: e.target.value
    });
    onChange(e);
  };


  onCompanyChange = companies => {

    const { onChange } = this.props;

    const company_id = companies[0].id;

    this.setState({ company_id });

    onChange({
      target: {
        name: "company_id",
        value: company_id
      }
    });

  }

  render() {

    const { year, years, month, months, company, company_id, file } = this.state;

    return (
      <React.Fragment>

        <FormGroup>
          <Label>Year</Label>
          <Input type="select" value={year} name="year" onChange={this.onChange}>
            <option key="" value="">Select</option>
            {years.map(y => (<option key={y} value={y}>{y}</option>))}
          </Input>
        </FormGroup>


        <FormGroup>
          <Label>Month</Label>
          <Input type="select" value={month} name="month" onChange={this.onChange}>
            <option key="" value="">Select</option>
            {months.map((m, i) => (<option key={m} value={i + 1}>{m}</option>))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="company_id">Company</Label>

          <CompanySelect
            {...this.props}
            onChange={this.onCompanyChange}
            placeholder="Select Company"
          />

        </FormGroup>

        <FormGroup>
          <Label htmlFor="file">File</Label>
          <Input type="file" name="file" placeholder="File" value={file} onChange={this.onChange} />
        </FormGroup>

      </React.Fragment>
    );
  }
}

export default StatementForm;
