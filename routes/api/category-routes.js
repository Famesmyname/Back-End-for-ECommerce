const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
      const cataData = await Category.findAll(
        {
          include: {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
        });
      res.status(200).json(cataData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const cataData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    if (!cataData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status.json(cataData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const cataData = await Category.create({category_name: req.body.category_name});
    res.status(200).json(cataData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const cataData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!cataData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(cataData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const cataData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!cataData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(cataData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
