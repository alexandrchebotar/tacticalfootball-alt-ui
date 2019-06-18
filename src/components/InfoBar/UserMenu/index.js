import React, {Fragment} from 'react';
import {
  Menu,
  Popover,
  Icon,
  Button,
} from "@blueprintjs/core";

const UserMenu = ({user}) => {
  return (
    <Fragment>
      {user ?
        <Fragment>
          {user.messages &&
            <Button href="#" icon="envelope" intent="warning" minimal />
          }
          <Popover 
            content={(
              <Menu>
                <Menu.Item href="#" text="settings" icon="cog" />
                <Menu.Item
                  href="#"
                  text="messages" 
                  icon={user.messages ? <Icon icon="envelope" intent="warning" /> : "envelope"}
                  />
                <Menu.Divider />
                <Menu.Item href="#" text="logout" icon="log-out" />
              </Menu>
            )}
            position="bottom-right"
            minimal
          >
            <Button text={user.name} rightIcon="user" />
          </Popover>
        </Fragment>
      :
        <Button text="Login" rightIcon="log-in" />
      }
    </Fragment>
  )
};

export default UserMenu;
