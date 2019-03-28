import React, { Component } from "react";
import { connect } from "react-redux";
import AsyncSelect from 'react-select/lib/Async';
import * as actions from "../../../Store/Actions/Employee/ProjectActions";

class ProjectSelect extends Component {

  onChange = (m) => {

    let models = m;

    if (!Array.isArray(m)) {
      models = [m];
    }

    let modelIds = models.map(m => ({ id: m.value, name: m.label }));

    let { onChange } = this.props;

    onChange(modelIds);
  };

  get = (value, callback) => {

    let { get, user, alertify, autoSelect, withAllOption, errorHandler } = this.props;

    let search = "?name=" + value;

    get(user.accessToken, search).then(res => {

      let models = res.data.data.map(m => ({ value: m.id, label: m.name }));

      if (withAllOption) {
        models.unshift({ value: "", label: "All Projects" });
      }

      callback(models);

      if (autoSelect) {
        if (models.length > 0) {
          this.onChange(models[0]);
        }
      }

    }).catch(errorHandler);
  };

  render() {

    const { projects } = this.props;

    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        defaultValue={(projects) ? projects.map(m => ({ value: m.id, label: m.name })) : []}
        loadOptions={this.get}
        {...this.props}
        onChange={this.onChange}
      />
    );

  }
}

const mapDispatchToProps = () => {
  return {
    get: (token, search) => actions.getProjects(token, search),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProjectSelect);
