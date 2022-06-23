import { List } from '@mui/material';
import SideNavMenuItem, { type SideNavMenuItemProps } from './SideNavMenuItem';

type SideNavMenuProps = {
  items: Array<SideNavMenuItemProps>;
  minimized?: boolean;
};

const SideNavMenu = (props: SideNavMenuProps) => {
  return (
    <List component="ul">
      {props.items.map((item, index) => (
        <SideNavMenuItem key={index} {...item} minimized={props.minimized} />
      ))}
    </List>
  );
};

export default SideNavMenu;
