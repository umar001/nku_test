const Item = require('../models/Item');
const User = require('../models/User');

const getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 }).limit(5).populate('userId', 'name email');

        return res.status(200).json({ items });
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getItemsById = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findById(itemId).populate('userId', 'name email');

        return res.status(200).json({ item });
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createItem = async (req, res) => {
    try {
        const { name, status } = req.body;
        const userId = req.user.sub; // Assuming the user ID is stored in the 'sub' field of the JWT payload

        // Create a new item
        const newItem = new Item({
            name,
            status,
            userId,
        });

        // Save the item to the database
        const savedItem = await newItem.save();
        const item = await Item.findById(savedItem._id).populate('userId', 'name email')
        return res.status(200).json({ item });
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id; // Assuming the item ID is passed as a route parameter
        const { name, status } = req.body;

        // Find the item by ID
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update the item fields
        item.name = name;
        item.status = status;

        // Save the updated item to the database
        const updatedItem = await item.save();

        res.status(200).json({ item: updatedItem });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id; // Assuming the item ID is passed as a route parameter

        // Find the item by ID and delete it
        const deletedItem = await Item.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getItems,
    getItemsById,
    createItem,
    updateItem,
    deleteItem
};
