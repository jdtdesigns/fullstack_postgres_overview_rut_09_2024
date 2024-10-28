import express from 'express';
import client from './config/connection.js';
const app = express();
const PORT = process.env.PORT || 3333;
// app.get('/api/shops', async (_, res) => {
//   const shops = await Shop.findAll(); 
//   res.json(shops);
// });
// await User.sync({force: true});
await client.sync({ force: true });
app.listen(PORT, () => console.log('Express server started'));
