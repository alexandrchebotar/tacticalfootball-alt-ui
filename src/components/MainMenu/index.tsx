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

const mapStateToProps = ({competitions, forums}: {competitions: MainMenuItem[], forums: MainMenuItem[]}) => {
  return {competitions, forums};
};

class MainMenu extends Component {
  state = {
    activeMenuId: null,
  };

  items: MainMenuItemWithSubMenu[] = [
    {
      text: 'office',
      alert: true,
      subMenu: [
        {text: 'home', icon: 'feed', alert: true},
        {text: 'calendar', icon: 'calendar'},
        {text: 'transfers', icon: 'shopping-cart'},
        {text: 'search', icon: 'search'},
        {text: 'finances', icon: 'dollar'},
        {text: 'trophies', icon: 'glass'},
        {text: 'scouting', icon: 'new-person'},
      ],
    },
    {
      text: 'squad',
      subMenu: [
        {text: 'players', icon: 'people'},
        {text: 'training', icon: 'walk'},
        {text: 'prospects', icon: 'new-person'},
        {text: 'statistics', icon: 'timeline-bar-chart'},
        {text: 'tactics', icon: 'layout-group-by'},
      ],
    },
    {
      text: 'competitions',
      subMenu: [
        {
          text: 'leagues',
          subMenu: [
            {text: 'SuperLeague'},
            {
              text: 'Premiership',
              subMenu: [
                {text: 'PremiershipA'},
                {text: 'PremiershipB'},
              ],
            },
            {
              text: 'Division1',
              subMenu: [
                {text: 'Division1A'},
                {text: 'Division1B'},
                {text: 'Division1C'},
                {text: 'Division1D'},
              ],
            },
            {
              text: 'Division2',
              subMenu: [
                {
                  text: 'Division2fromAtoB',
                  subMenu: [
                    {text: 'Division2A'},
                    {text: 'Division2B'},
                  ],
                },
                {
                  text: 'Division2fromCtoD',
                  subMenu: [
                    {text: 'Division2C'},
                    {text: 'Division2D'},
                  ],
                },
              ],
            },
          ],
        },
        {
          text: 'cups',
          subMenu: [
            {text: 'InternationalCup'},
            {text: 'ShadowCup'},
          ],
        },
        {
          text: 'nationat',
          subMenu: [
            {text: 'WorldCup'},
            {text: 'WorldLeague'},
          ],
        },
      ],
    },
    {
      text: 'forum',
      alert: true,
      subMenu: [
        {
          text: 'gameNews',
          href: 'https://tacticalfootball.com/forums/5/overview',
          alert: false,
        },
        {
          text: 'general',
          href: 'https://tacticalfootball.com/forums/1/overview',
          alert: true,
        },
        {
          text: 'national',
          href: 'https://tacticalfootball.com/forums/8/overview',
          alert: true,
        },
      ],

    },
    {
      text: 'help',
      subMenu: [
        {
          text: 'gameManual',
          href: 'https://tacticalfootball.com/rules/0',
        },
        {
          text: 'originalUITours',
          subMenu: [
            {
              text: 'clubPage',
              href: 'https://tacticalfootball.com/tours/1?tour_id=club_overview',
            },
            {
              text: 'playerPage',
              href: 'https://tacticalfootball.com/tours/1?tour_id=player_overview',
            },
          ],
        },
      ],
    },
    {
      text: 'settings',
      subMenu: [
        {text: 'alternateUI'},
        {text: 'user'},
        {text: 'club'},
      ],
    },
  ];

  closeMenu = (id: number|string) => {
    if (this.state.activeMenuId === id) {
      this.setState({activeMenuId: null});
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
    return this.items.map(({text, icon = null, alert, subMenu}) => {
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
          isOpen={this.state.activeMenuId === text}
          onInteraction={(state)=>{
            if (state) {
              this.setState({activeMenuId: text});
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
