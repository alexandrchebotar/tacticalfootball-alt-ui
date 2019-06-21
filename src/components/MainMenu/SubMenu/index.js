import React, {Fragment} from 'react';
import {MenuDivider} from "@blueprintjs/core";
import SubMenuItem from '../SubMenuItem';

const SubMenu = ({id, path, categoryIcon, subMenu, handleItemClick}) => {
  const submenuItems = subMenu.map((item) => {
    return (
      <SubMenuItem 
        {...item} 
        key={item.id}
        categoryIcon={categoryIcon}
        path={path ? `${path}/${id}` : `/${id}`} 
        handleItemClick={handleItemClick}
      />
    );
  });
  return (
    <Fragment>
      <MenuDivider title={id} />
      {submenuItems}
    </Fragment>
  );
};

export default SubMenu;
