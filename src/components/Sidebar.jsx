import { NavLink } from 'react-router';
import '@/styles/Sidebar.css';
import trainerRed from '@/assets/trainer-red.webp';

const NAV_ITEMS = [
  { to: '/', label: 'Pokemons', end: true },
  { to: '/items', label: 'Items' },
  { to: '/moves', label: 'Moves' },
  { to: '/map', label: 'Map' },
];

function navLinkClass({ isActive }) {
  return isActive
    ? 'sidebar__nav-link sidebar__nav-link--active'
    : 'sidebar__nav-link';
}

function SidebarNavLink({ to, end, children }) {
  return (
    <NavLink to={to} end={end} className={navLinkClass}>
      {children}
    </NavLink>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <header className="sidebar__profile">
        <div className="sidebar__profile-info">
          <img
            src={trainerRed}
            alt="Trainer Red avatar"
            className="sidebar__avatar"
            width="64"
            height="64"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div>
            <h3 className="sidebar__trainer-name">Trainer_red</h3>
            <p className="sidebar__trainer-id">Id: 00491</p>
          </div>
        </div>
        <button type="button" className="sidebar__scan-btn">
          Scan Area
        </button>
      </header>
      <nav className="sidebar__nav">
        {NAV_ITEMS.map(item => (
          <SidebarNavLink key={item.to} to={item.to} end={item.end}>
            {item.label}
          </SidebarNavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
