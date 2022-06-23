import { forwardRef, useEffect, useMemo, useState } from 'react';

import { ExpandLessOutlined, ExpandMoreOutlined, type SvgIconComponent } from '@mui/icons-material';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  ListItem,
} from '@mui/material';

import { RouterLink, RouterLinkProps, useLocation } from '@sa/router';
import { makeStyles } from '@sa/components';

const useStyles = makeStyles()((theme) => ({
  sideNavMenuItemActive: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    '& *': {
      color: theme.palette.common.white,
    },
  },
}));

export type SideNavMenuItemProps = {
  text: string;
  icon?: SvgIconComponent;
  path?: string;
  minimized?: boolean;
  children?: Array<SideNavMenuItemProps>;
};

const SideNavMenuItem = (props: SideNavMenuItemProps) => {
  const [expand, setExpand] = useState(false);
  const { pathname } = useLocation();

  const renderRouterLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
        function SideNavMenuLink({ className, ...itemProps }, ref) {
          const { classes } = useStyles();

          return (
            <RouterLink
              to={props.path || ''}
              ref={ref}
              {...itemProps}
              className={({ isActive }) =>
                `${className} ${isActive ? classes.sideNavMenuItemActive : ''}`
              }
              role={undefined}
            />
          );
        }
      ),
    [props.path]
  );

  useEffect(() => {
    if (
      Array.isArray(props.children) &&
      pathname.startsWith(props.path ?? '') &&
      pathname != '/' &&
      !expand
    ) {
      setExpand(true);
    }
  }, [pathname]);

  const renderNavIcon = (icon: SvgIconComponent, minimized: boolean) => {
    const Icon = icon;

    return (
      <Icon
        sx={
          minimized
            ? {
                fontSize: (theme) => theme.spacing(4),
                margin: '0 auto',
              }
            : {}
        }
      />
    );
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <>
      {!Array.isArray(props.children) && (
        <ListItem disablePadding>
          <ListItemButton component={renderRouterLink} href={props.path || ''} title={props.text}>
            {props.icon && (
              <ListItemIcon>{renderNavIcon(props.icon, props.minimized ?? false)}</ListItemIcon>
            )}
            {!props.minimized && <ListItemText>{props.text}</ListItemText>}
          </ListItemButton>
        </ListItem>
      )}
      {Array.isArray(props.children) && (
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleExpand} title={props.text}>
              {props.icon && (
                <ListItemIcon>{renderNavIcon(props.icon, props.minimized ?? false)}</ListItemIcon>
              )}
              {!props.minimized && <ListItemText>{props.text}</ListItemText>}
              {Array.isArray(props.children) && !props.minimized && (
                <>{expand ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}</>
              )}
            </ListItemButton>
          </ListItem>
          {!props.minimized && (
            <Collapse in={expand} timeout="auto" unmountOnExit>
              <List component="ul" disablePadding sx={{ pl: 2 }}>
                {Array.isArray(props.children) &&
                  props.children.map((childProps, index) => (
                    <SideNavMenuItem key={index} {...childProps} />
                  ))}
              </List>
            </Collapse>
          )}
        </>
      )}
    </>
  );
};

export default SideNavMenuItem;
