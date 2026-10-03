import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="shell">
      <header className="topbar">
        <Link className="brand" to="/settings">
          Fanum Tax CV
        </Link>
        <nav>
          <Link to="/settings">Profile settings</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
