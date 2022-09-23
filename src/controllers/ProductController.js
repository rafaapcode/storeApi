import Product from '../models/Product.js';

class ProductController {
  async index(req, res) {
    try {
      const allProducts = await Product.findAll({
        attributes: ['id', 'name', 'price', 'description', 'quantity'],
        order: [['id', 'DESC']],
      });

      return res.json(allProducts);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID required.'],
        });
      }

      const product = await Product.findByPk(id, {
        attributes: ['id', 'name', 'price', 'description', 'quantity'],
        order: [['id', 'DESC']],
      });

      if (!product) {
        res.status(400).json({
          errors: ['Product not Found.'],
        });
      }

      return res.json(product);
    } catch (e) {
      return res.status(401).json(null);
    }
  }

  async storage(req, res) {
    try {
      const createProduct = await Product.create(req.body);

      return res.json(createProduct);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID required.'],
        });
      }

      const product = await Product.findByPk(id);

      if (!product) {
        res.status(400).json({
          errors: ['Product not Found.'],
        });
      }

      const newProduct = await product.update(req.body);

      return res.json(newProduct);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID required.'],
        });
      }

      const product = await Product.findByPk(id);

      if (!product) {
        res.status(400).json({
          errors: ['Product not Found.'],
        });
      }

      await product.destroy();
      return res.json({ removed: true });
    } catch (e) {
      return res.status(400).json(null);
    }
  }
}

export default new ProductController();
