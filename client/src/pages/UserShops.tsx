import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Shop } from '../interfaces';

function UserShops() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    axios.get('/api/shops/user')
      .then(res => {
        setShops([...res.data.shops]);
      })
  }, []);

  return (
    <>
      <h1 className="text-center mt-5">View Your Shops</h1>
      <section className="row">
        {!shops.length && <h4 className="ms-4 mt-3 fw-light">You haven't created any shops.</h4>}

        {shops.map(shop => (
          <article key={shop.id} className="col-4 d-flex flex-column align-items-center">
            <h3>{shop.name}</h3>
            <p>Location: {shop.address}</p>
            <div className="d-flex justify-content-center">
              <NavLink className="btn btn-primary" to={`/shop/${shop.id}`}>View Shop</NavLink>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default UserShops;