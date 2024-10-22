import pg from 'pg';
import 'console.table';
const { Client } = pg;
const client = new Client({
    user: 'postgres',
    password: 'pass',
    database: 'winery_app_db'
});
await client.connect();
const sql = `
SELECT
  shops.id AS shop_id,
  name AS shop_name,
  address AS shop_address,
  users.id AS user_id,
  CONCAT(first_name, ' ', last_name) AS user_name,
  email AS user_email,
  wines.id AS wine_id,
  brand AS wine_name,
  type AS wine_type,
  region AS wine_region,
  price AS wine_price
FROM shops
JOIN users
  ON shops.user_id = users.id
JOIN wines
 ON shops.id = wines.shop_id;
`;
const result = await client.query(sql);
console.table(result.rows);
//# sourceMappingURL=index.js.map