import React, {Fragment, FunctionComponent} from 'react';
import {MenuDivider} from "@blueprintjs/core";
import SubMenuItem, {SubMenuItemProps} from '../SubMenuItem';
import {MainMenuItem} from '../../../types';

export interface SubMenuProps extends SubMenuItemProps {
  subMenu: MainMenuItem[],
};

const SubMenu: FunctionComponent<SubMenuProps> = ({text, path, categoryIcon, subMenu, handleItemClick}) => {
  const submenuItems = subMenu.map((item) => {
    return (
      <SubMenuItem 
        {...item} 
        key={item.text}
        categoryIcon={categoryIcon}
        path={path ? `${path}/${text}` : `/${text}`} 
        handleItemClick={handleItemClick}
      />
    );
  });
  return (
    <Fragment>
      <MenuDivider title={text} />
      {submenuItems}
    </Fragment>
  );
};

export default SubMenu;
