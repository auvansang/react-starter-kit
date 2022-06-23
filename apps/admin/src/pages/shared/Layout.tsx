import { Box, Toolbar } from '@mui/material';
import {
  ArticleOutlined,
  CategoryOutlined,
  CommentOutlined,
  DashboardOutlined,
  ManageAccountsOutlined,
  NewspaperOutlined,
  PostAddOutlined,
  RuleOutlined,
  SettingsOutlined,
  TagOutlined,
  TuneOutlined,
} from '@mui/icons-material';

import Header from './components/Header';
import SideNav from './components/SideNav';
import { SideNavMenuItemProps } from './components/SideNavMenuItem';
import { Outlet } from '@sa/router';

const SideNavMenuItems: Array<SideNavMenuItemProps> = [
  {
    text: 'Dashboard',
    icon: DashboardOutlined,
    path: '/',
  },
  {
    text: 'Categories',
    icon: CategoryOutlined,
    path: '/categories',
  },
  {
    text: 'Tags',
    icon: TagOutlined,
    path: '/home2',
  },
  {
    text: 'Posts',
    icon: NewspaperOutlined,
    path: '/posts',
    children: [
      {
        text: 'List Posts',
        icon: ArticleOutlined,
        path: '/posts',
      },
      {
        text: 'New Post',
        icon: PostAddOutlined,
        path: '/posts/new',
      },
    ],
  },
  {
    text: 'Comments',
    icon: CommentOutlined,
    path: '/comments',
  },
  {
    text: 'Settings',
    icon: SettingsOutlined,
    path: '/settings',
    children: [
      {
        text: 'Users',
        icon: ManageAccountsOutlined,
        path: '/settings/users',
      },
      {
        text: 'Roles',
        icon: RuleOutlined,
        path: '/settings/roles',
      },
      {
        text: 'Configurations',
        icon: TuneOutlined,
        path: '/settings/configurations',
      },
    ],
  },
];

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav open items={SideNavMenuItems} version="1.0.0" />
      <Header />
      <Box component="main">
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
