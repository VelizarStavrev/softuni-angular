const Order = require('../models/Order');

const create = (orderData) => {
    let order = new Order({ ...orderData });

    return order.save(); // save to the DB
}
const getOrders = (id) => {
    return Order
        .find({ userid: { "$regex": id, "$options": "i" } })
        .sort({ price: 'asc' })
        // .limit(limit*1)
        .lean()
        .then((products) => {
            return products;
        });
}

module.exports = {
    create,
    getOrders,
}