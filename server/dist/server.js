import express from 'express';
import client from './models/index.js';
const app = express();
const PORT = process.env.PORT || 3333;
// app.get('/api/shops', async (_, res) => {
//   const shops = await Shop.findAll(); 
//   res.json(shops);
// });
// await User.sync({force: true});
try {
    await client.sync({ force: true });
}
catch (error) {
    console.log(error);
}
app.listen(PORT, () => console.log('Express server started'));
