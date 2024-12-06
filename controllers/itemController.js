const Item = require("../models/itemModel");

const createItem = async (req, res, io) => {
  const item = new Item(req.body);
  await item.save();
  io.emit("itemCreated", item);
  res.status(201).send(item);
};

const getItems = async (req, res, io) => {
  const items = await Item.find();
  io.emit("itemsFetched", items);
  res.send(items);
};

const updateItem = async (req, res, io) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  io.emit("itemUpdated", item);
  res.send(item);
};

const deleteItem = async (req, res, io) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  io.emit("itemDeleted", item);
  res.send(item);
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};