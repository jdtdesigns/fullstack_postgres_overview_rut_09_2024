import { NavLink } from 'react-router-dom';

function Landing() {
  return (
    <>
      <section className="d-flex flex-column justify-content-center align-items-center mt-5">
        <h1>Wine Shop Tracker</h1>
        <p>Your one stop <i>shop</i> for all of your wine shop tracking needs</p>
        <NavLink to="/register" className="btn btn-primary btn-lg px-5">Start Now!</NavLink>
      </section>
    </>
  )
}

export default Landing;