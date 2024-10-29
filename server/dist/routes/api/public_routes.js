import { Router } from 'express';
import { Shop, User, Wine } from '../../models/index.js';
const router = Router();
// Get the number of shops for the homepage
router.get('/shops', async (_, res) => {
    try {
        // Find all shops and attach the user that created the shop and also all the wines associated with the shop
        // We use the attributes property to select the columns/fields that we want
        const shops = await Shop.findAll({
            include: [
                {
                    model: Wine,
                    attributes: ['brand', 'type']
                },
                {
                    model: User,
                    attributes: ['first_name', 'last_name']
                }
            ]
        });
        res.json({ shops });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while counting shops' });
    }
});
// Get wines for a shop
router.get('/wines', async (req, res) => {
    // Get all wines by shop id and also attach the user that created the shop
    // We use the attributes property to specify the fields we want on the user
    const wines = await Wine.findAll({
        include: {
            model: User,
            attributes: ['first_name']
        },
        where: {
            shop_id: req.body.shop_id
        }
    });
    res.json({
        wines
    });
});
export default router;
