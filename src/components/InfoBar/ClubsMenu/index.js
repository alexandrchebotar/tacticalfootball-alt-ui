import React, {Fragment} from 'react';
import {
  Menu,
  Popover,
  Icon,
  Button,
} from "@blueprintjs/core";

import './style.scss';

const ClubsMenu = ({user, currentClub}) => {
  const clubsList = user.clubs.map(({name, id, news}) => (
    <Menu.Item
      key={name}
      text={name}
      href={id}
      icon={news ? <Icon icon="feed" intent="warning" /> : "badge"}
    />
  ));
  const firstClubWithNews = user.clubs.find(({news}) => news);

  return (
    <Fragment>
      {clubWithNews &&
        <Button href={firstClubWithNews.id} icon="feed" intent="warning" minimal />
      }
      <Popover
        content={(
          <Menu className="clubs-menu">
            {clubsList}
          </Menu>
        )}
        position="bottom-left"
        interactionKind="hover"
        minimal
      >
        <Button href={currentClub.id} text={currentClub.name} rightIcon="caret-down" />
      </Popover>
    </Fragment>
  )
}

export default ClubsMenu;
