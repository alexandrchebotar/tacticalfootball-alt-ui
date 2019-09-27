import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {MenuItem, Icon} from "@blueprintjs/core";
import SubMenu from '../SubMenu';

const SubmenuItem = ({id, href, path, icon, categoryIcon, alert, subMenu, handleItemClick}) => {
  const itemIcon = icon || categoryIcon;
  if (subMenu) {
    return (
      <MenuItem text={id} icon={itemIcon}>
        <SubMenu id={id} path={path} categoryIcon={categoryIcon} subMenu={subMenu} />
      </MenuItem>
    );
  } else {
    return (
      <Fragment>
        {href ?
          <MenuItem
          text={id}
          href={href}
          target="_blank"
          icon={<Icon icon={itemIcon} intent={alert ? "warning" : null} />}
          labelElement={<Icon icon="share" />}
          />
        :
          <Link to={`${path}/${id}`} onClick={handleItemClick}>
            <MenuItem
              tagName="span"
              text={id}
              icon={<Icon icon={itemIcon} intent={alert ? "warning" : null} />}
            />
          </Link>
        }
      </Fragment>
    );
  };
};

export default SubmenuItem;
