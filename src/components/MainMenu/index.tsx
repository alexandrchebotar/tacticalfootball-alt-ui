import React, {Component, Fragment, FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  Icon,
  Button,
} from "@blueprintjs/core";
import SubMenu from './SubMenu';
import { ReactComponent as SquadIcon } from '../../assets/squad.svg';
import { ReactComponent as OfficeIcon } from '../../assets/office.svg';
import { ReactComponent as CompetitionsIcon } from '../../assets/competitions.svg';
import { ReactComponent as ForumIcon } from '../../assets/forum.svg';
import { ReactComponent as HelpIcon } from '../../assets/help.svg';
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg';
import {MainMenuItem, MainMenuItemWithSubMenu} from '../../types';

import './style.scss';

export interface MainMenuProps {
  menu: MainMenuItemWithSubMenu[],
};
export interface MainMenuState {
  activeMenuItem: string|null,
};

const mapStateToProps = ({menu}: {menu: MainMenuItemWithSubMenu[]}) => {
  return {menu};
};

class MainMenu extends Component<MainMenuProps> {
  state = {
    activeMenuItem: null,
  };

  closeMenu = (id: number|string) => {
    if (this.state.activeMenuItem === id) {
      this.setState({activeMenuItem: null});
    }
  };

  getMainMenuItems = () => {
    const icons: {
      [key: string]: FunctionComponent<React.SVGProps<SVGSVGElement>>,
    } = {
      squad: SquadIcon,
      office: OfficeIcon,
      competitions: CompetitionsIcon,
      forum: ForumIcon,
      help: HelpIcon,
      settings: SettingsIcon,
    };
    return this.props.menu.map(({text, icon = null, alert, subMenu}) => {
      const MenuIcon = icons[text];
      const categoryIcon = icon ?
        icon :
        (text === 'competitions') ?
          'glass' :
          (text === 'forum') ?
            'comment':
            (text === 'help') ?
              'help' :
              (text === 'settings') ?
                'cog' :
                'dot';
      return (
        <Popover
          key={text}
          content={
            <Menu className="main-menu-submenu">
              <SubMenu text={text} categoryIcon={categoryIcon} subMenu={subMenu} handleItemClick={() => this.closeMenu(text)} />
              {alert && text === 'forum' &&
                <Fragment>
                  <MenuDivider />
                  <MenuItem text="mark all read" labelElement={<Icon icon="eye-on" />} />
                </Fragment>
              }
            </Menu>
          }
          position="right-top"
          interactionKind="hover"
          minimal
          autoFocus={false}
          popoverClassName="main-menu-submenu"
          isOpen={this.state.activeMenuItem === text}
          onInteraction={(state)=>{
            if (state) {
              this.setState({activeMenuItem: text});
            } else {
              this.closeMenu(text);
            }
          }}
        >
          <Button
            className={'main-menu-item'}
          >
            <Link to={`/${text}`} onClick={() => this.closeMenu(text)}>
              <MenuIcon className={alert ? 'main-menu-icon warning' : 'main-menu-icon'} />
            </Link>
          </Button>
        </Popover>
      );
    });
  };

  render() {
    return (
        <div className="main-menu">
          {this.getMainMenuItems()}
        </div>
    );
  }
}

export default connect(mapStateToProps)(MainMenu);
