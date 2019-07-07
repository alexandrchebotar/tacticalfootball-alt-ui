import React, {Component, Fragment} from 'react';
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

import './style.scss';

const mapStateToProps = ({competitions, forums}) => {
  return {competitions, forums};
};

class MainMenu extends Component {
  state = {
    items: [
      {
        id: 'squad',
        subMenu: [
          {id: 'players', icon: 'people'},
          {id: 'training', icon: 'walk'},
          {id: 'prospects', icon: 'new-person'},
          {id: 'statistics', icon: 'timeline-bar-chart'},
          {id: 'tactics', icon: 'layout-group-by'},
        ],
      },
      {
        id: 'office',
        alert: true,
        subMenu: [
          {id: 'news', icon: 'feed', alert: true},
          {id: 'calendar', icon: 'calendar'},
          {id: 'transfers', icon: 'shopping-cart'},
          {id: 'search', icon: 'search'},
          {id: 'finances', icon: 'dollar'},
          {id: 'trophies', icon: 'glass'},
          {id: 'scouting', icon: 'new-person'},
        ],
      },
      {
        id: 'competitions',
        subMenu: [
          {
            id: 'leagues',
            subMenu: [
              {id: 'SuperLeague'},
              {
                id: 'Premiership',
                subMenu: [
                  {id: 'PremiershipA'},
                  {id: 'PremiershipB'},
                ],
              },
              {
                id: 'Division1',
                subMenu: [
                  {id: 'Division1A'},
                  {id: 'Division1B'},
                  {id: 'Division1C'},
                  {id: 'Division1D'},
                ],
              },
              {
                id: 'Division2',
                subMenu: [
                  {
                    id: 'Division2fromAtoB',
                    subMenu: [
                      {id: 'Division2A'},
                      {id: 'Division2B'},
                    ],
                  },
                  {
                    id: 'Division2fromCtoD',
                    subMenu: [
                      {id: 'Division2C'},
                      {id: 'Division2D'},
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'cups',
            subMenu: [
              {id: 'InternationalCup'},
              {id: 'ShadowCup'},
            ],
          },
          {
            id: 'nationat',
            subMenu: [
              {id: 'WorldCup'},
              {id: 'WorldLeague'},
            ],
          },
        ],
      },
      {
        id: 'forum',
        alert: true,
        subMenu: [
          {
            id: 'gameNews',
            href: 'https://tacticalfootball.com/forums/5/overview',
            alert: false,
          },
          {
            id: 'general',
            href: 'https://tacticalfootball.com/forums/1/overview',
            alert: true,
          },
          {
            id: 'national',
            href: 'https://tacticalfootball.com/forums/8/overview',
            alert: true,
          },
        ],

      },
      {
        id: 'help',
        subMenu: [
          {
            id: 'gameManual',
            href: 'https://tacticalfootball.com/rules/0',
          },
          {
            id: 'originalUITours',
            subMenu: [
              {
                id: 'clubPage',
                href: 'https://tacticalfootball.com/tours/1?tour_id=club_overview',
              },
              {
                id: 'playerPage',
                href: 'https://tacticalfootball.com/tours/1?tour_id=player_overview',
              },
            ],
          },
        ],
      },
      {
        id: 'settings',
        subMenu: [
          {id: 'alternateUI'},
          {id: 'user'},
          {id: 'club'},
        ],
      },
    ],
    activeMenuId: null,
  };

  closeMenu = (id) => {
    if (this.state.activeMenuId === id) {
      this.setState({activeMenuId: null});
    }
  };

  getMainMenuItems = () => {
    const icons = {
      squad: SquadIcon,
      office: OfficeIcon,
      competitions: CompetitionsIcon,
      forum: ForumIcon,
      help: HelpIcon,
      settings: SettingsIcon,
    };
    return this.state.items.map(({id, icon, alert, subMenu}) => {
      const MenuIcon = icons[id];
      const categoryIcon = icon ?
        icon :
        (id === 'competitions') ?
          'glass' :
          (id === 'forum') ?
            'comment':
            (id === 'help') ?
              'help' :
              (id === 'settings') ?
                'cog' :
                'dot';
      return (
        <Popover
          key={id}
          content={
            <Menu className="main-menu-submenu">
              <SubMenu id={id} categoryIcon={categoryIcon} subMenu={subMenu} handleItemClick={() => this.closeMenu(id)} />
              {alert && id === 'forum' &&
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
          isOpen={this.state.activeMenuId === id}
          onInteraction={(state)=>{
            if (state) {
              this.setState({activeMenuId: id});
            } else {
              this.closeMenu(id);
            }
          }}
        >
          <Button
            className={'main-menu-item'}
          >
            <Link to={`/${id}`} onClick={() => this.closeMenu(id)}>
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
