import {NavLink} from "react-router-dom";
import links from "../utils/links.jsx";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";

// eslint-disable-next-line react/prop-types
const NavLinks = ({ isBigSidebar }) => {
    const { user, toggleSidebar } = useDashboardContext();

    return (
        <div className='nav-links'>
            {links.map((link) => {
                const { text, path, icon } = link;
                // admin user
                const { role } = user;
                if (role !== 'admin' && path === 'admin') return;
                return (
                    <NavLink
                        to={path}
                        key={text}
                        onClick={isBigSidebar ? null : toggleSidebar}
                        className='nav-link'
                        end
                    >
                        <span className='icon'>{icon}</span>
                        {text}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default NavLinks;