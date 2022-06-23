import { forwardRef } from 'react';
import { RouterLink, RouterLinkProps } from '@sa/router';

// eslint-disable-next-line react/display-name
const LinkBehavior = forwardRef<any, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  (props, ref) => {
    const { href, ...other } = props;
    // Map href (Material-UI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
  }
);

export default LinkBehavior;
