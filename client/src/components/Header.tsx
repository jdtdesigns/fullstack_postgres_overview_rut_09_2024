import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Wine Shop Tracker</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/shops">Shops</NavLink>
            <NavLink className="nav-link" to="/shops/create">Create Shop</NavLink>
            <NavLink className="nav-link" to="/wines/add">Add a Wine</NavLink>
            <NavLink className="nav-link" to="/register">Sign Up</NavLink>
            <NavLink className="nav-link" to="/login">Sign In</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;