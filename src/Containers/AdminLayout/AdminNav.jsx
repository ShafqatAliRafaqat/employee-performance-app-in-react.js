import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminNav extends Component {


  renderSubMenu = (nav) => {
    const { items } = nav;
    if (items) {
      return (
        <ul>
          {items.map((n, i) => (
            <li key={i}><Link to={n.url}>{n.name}</Link></li>
          ))}
        </ul>
      );
    }
  }

  renderDownIcon = (nav) => {
    const { items } = nav;
    if (items) {
      return (
        <span className="label label-important">
          <i className="down"></i>
        </span>
      );
    }
  }


  render() {

    const { nav } = this.props;

    return (
      <div id="sidebar">
        <Link to="dashboard" className="visible-phone"><i className="icon icon-home"></i> Dashboard</Link>
        <ul>

          {nav.items.map((n, i) => (

            <li key={i} className={(n.items) ? "submenu" : ""}>
              <Link to={n.url}>
                <i className={n.icon} />
                <span>{n.name}</span>
                {this.renderDownIcon(n)}
              </Link>
              {this.renderSubMenu(n)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AdminNav;
