import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
  Alignment,
  Button,
  Navbar,
  Switch,
  Breadcrumbs,
  Breadcrumb,
  Icon,
  CollapsibleList,
  MenuItem,
  Classes,
} from "@blueprintjs/core";

import './style.sass';

const BREADCRUMBS = [
  { href: "/users", icon: "folder-close", text: "Users" },
  { href: "/users/janet", icon: "folder-close", text: "Janet" },
  { icon: "document", text: "image.jpg" },
];

const mapStateToProps = ({user, currentClub}) => {
  return {user, currentClub};
};

class PageMenu extends Component {
  state = {
    // authorized: true,
    // user: 'ArmagedOFF',
    visibleClubList: false,
  };

  renderBreadcrumb(props) {
    if (props.href != null) {
        return <a className={Classes.BREADCRUMB}>{props.text}</a>;
    } else {
        return <span className={Classes.BREADCRUMB + ' ' + Classes.BREADCRUMB_CURRENT}>{props.text}</span>;
    }
  }

  renderCurrentBreadcrumb = ({ text, ...restProps }) => {
    // customize rendering of last breadcrumb
    return <Breadcrumb {...restProps}>{text} <Icon icon="star" /></Breadcrumb>;
  };

  render() {
    // const {user, currentClub} = this.props;
    // const {visibleClubList} = this.state;
    return (
      <div className="header">
        <Navbar className="bp3-dark">
          <Navbar.Group align={Alignment.LEFT}>
            {/* <Breadcrumbs
                currentBreadcrumbRenderer={this.renderCurrentBreadcrumb}
                items={BREADCRUMBS}
             /> */}
            <CollapsibleList
                // {...this.state}
                className={Classes.BREADCRUMBS}
                dropdownTarget={<span className={Classes.BREADCRUMBS_COLLAPSED} />}
                visibleItemRenderer={this.renderBreadcrumb}
            >
              <MenuItem icon="folder-close" text="Squad" href="#" />
              <MenuItem icon="folder-close" text="Senior" href="#" />
              <MenuItem icon="document" text="Traning" />
            </CollapsibleList>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
              <Switch label="Show results" inline/>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
              <Navbar.Heading>Blueprint</Navbar.Heading>
              <Navbar.Divider />
              <Button className="bp3-minimal" icon="home" text="Home" />
              <Button className="bp3-minimal" icon="document" text="Files" />
          </Navbar.Group>

        </Navbar>
      </div>
    )
  };
}

export default connect(mapStateToProps)(PageMenu);
