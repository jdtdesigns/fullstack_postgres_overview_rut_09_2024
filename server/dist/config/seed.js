import { faker } from '@faker-js/faker';
import { client } from '../models/index.js';
import { User, Shop, Wine } from '../models/index.js';
await client.sync({ force: true });
async function seedUsers() {
    const userData = [];
    let amount = 10;
    while (amount--) {
        userData.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: 'password123',
            // Generate a number between 15 and 100 for the age
            age: Math.floor(Math.random() * (100 - 15 + 1)) + 15
        });
    }
    // @ts-ignore
    await User.bulkCreate(userData);
}
async function seedShops() {
    const users = await User.findAll();
    const shopData = [];
    let amount = 15;
    while (amount--) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        shopData.push({
            name: faker.company.name() + ' Winery',
            address: faker.location.streetAddress(),
            user_id: randomUser.id
        });
    }
    // @ts-ignore
    await Shop.bulkCreate(shopData);
}
async function seedWines() {
    const shops = await Shop.findAll();
    const wineData = [];
    let amount = 30;
    const types = ['rose', 'pinot noir', 'red', 'sauvignon', 'cabernet'];
    while (amount--) {
        const randomShop = shops[Math.floor(Math.random() * shops.length)];
        wineData.push({
            brand: faker.company.name(),
            type: types[Math.floor(Math.random() * types.length)],
            region: faker.location.country(),
            price: faker.finance.amount(),
            shop_id: randomShop.id,
            // @ts-ignore
            user_id: randomShop.UserId
        });
    }
    // @ts-ignore
    await Wine.bulkCreate(wineData);
}
try {
    await seedUsers();
    await seedShops();
    await seedWines();
    console.log('Tables seeded successfully!');
}
catch (error) {
    console.log('SEED ERROR', error);
}
process.exit();
