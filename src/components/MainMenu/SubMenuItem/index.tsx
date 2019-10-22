import React, {Fragment, FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {MenuItem, Icon, IconName} from "@blueprintjs/core";
import SubMenu from '../SubMenu';
import {RouteContext} from '../../MainMenu';
import {MainMenuItem} from '../../../types';

export interface SubMenuItemProps extends MainMenuItem {
  path?: string,
  handleItemClick?: () => void,
  categoryIcon: IconName,
};

const SubmenuItem: FunctionComponent<SubMenuItemProps> = ({text, id, href, path, icon, categoryIcon, alert, subMenu, handleItemClick}) => {
  const itemIcon = icon || categoryIcon;
  if (subMenu) {
    return (
      <MenuItem text={text} icon={itemIcon}>
        <SubMenu text={text} path={path} categoryIcon={categoryIcon} subMenu={subMenu} />
      </MenuItem>
    );
  } else {
    return (
      <RouteContext.Consumer>
        {routeContext => (
          <Fragment>
            {href ?
              <MenuItem
              text={text}
              href={href}
              target="_blank"
              icon={<Icon icon={itemIcon} intent={alert ? 'warning' : 'none'} />}
              labelElement={<Icon icon="share" />}
              />
            :
              <Link to={id ? `/${routeContext}/${id}` : `${path}/${text}`} onClick={handleItemClick}>
                <MenuItem
                  tagName="span"
                  text={text}
                  icon={<Icon icon={itemIcon} intent={alert ? 'warning' : 'none'} />}
                />
              </Link>
            }
          </Fragment>
        )}
      </RouteContext.Consumer>
    );
  };
};

export default SubmenuItem;
