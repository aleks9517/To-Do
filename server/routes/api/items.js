const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

router.get('/', async (req, res) => {
  const { id } = req.user;
  const searchObj = { userId: id };

  try {
    let todo = await Item.find(searchObj).sort({ date: -1 });
    res.json(todo);   
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    userId: req.user.id
  });
  try {
    let saveTodo = await newItem.save();
    res.json(saveTodo)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, req.body)
    res.json(req.body);
  } catch (err) {
    res.status(404).json({ success: false });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let removeTodo = await Item.findById(req.params.id);
    removeTodo.remove();
    res.json({ success: true })
  } catch(err) {
    res.status(404).json({ success: false })
  }
});

module.exports = router;
