import Employee from '../models/Employee';
import Photo from '../models/Photo.js';

class EmployeeController {
  async index(req, res) {
    try {
      const allEmployees = await Employee.findAll({
        attributes: ['id', 'name', 'email', 'monthly_billing', 'fee', 'position'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });

      return res.json(allEmployees);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['ID is required.'] });
      }

      const employee = await Employee.findByPk(id, {
        attributes: ['id', 'name', 'email', 'monthly_billing', 'fee', 'position'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });

      if (!employee) {
        return res.status(400).json({ errors: ['Emoployee not found.'] });
      }

      return res.json(employee);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async storage(req, res) {
    try {
      const createEmployee = await Employee.create(req.body);

      return res.json(createEmployee);
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
        return res.status(400).json({ errors: ['ID is required.'] });
      }

      const employee = await Employee.findByPk(id);
      const { cpf } = employee;

      if (!employee) {
        return res.status(400).json({ errors: ['Employee not found.'] });
      }

      const newEmployee = await employee.update({ ...req.body, cpf });
      return res.json(newEmployee);
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
        return res.status(400).json({ errors: ['ID is required.'] });
      }

      const employee = await Employee.findByPk(id);

      if (!employee) {
        return res.status(400).json({ errors: ['Employee not found.'] });
      }

      await employee.destroy();
      return res.json({ removed: true });
    } catch (e) {
      return { errors: e.errors.map(err => err.message) };
    }
  }
}
export default new EmployeeController();
