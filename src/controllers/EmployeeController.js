import Employee from '../models/Employee.js';

class EmployeeController {
  async index(req, res) {
    try {
      const allEmployees = await Employee.findAll({
        attributes: ['name', 'cpf', 'faturamentomes', 'comissao', 'cargo'],
      });

      res.json(allEmployees);
    } catch (e) {
      res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID is required.'],
        });
      }

      const employee = await Employee.findByPk(id, {
        attributes: ['name', 'cpf', 'faturamentomes', 'comissao', 'cargo'],
      });

      if (!employee) {
        res.status(400).json({
          errors: ['Employee not found.'],
        });
      }

      res.json(employee);
    } catch (e) {
      res.json(null);
    }
  }

  async storage(req, res) {
    try {
      const employee = await Employee.create(req.body);

      res.json(employee);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: 'Error' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID is required.'],
        });
      }

      const employee = await Employee.findByPk(id);

      if (!employee) {
        res.status(400).json({
          errors: ['Employee not found.'],
        });
      }

      const newEmployee = await employee.update(req.body);

      res.json(newEmployee);
    } catch (e) {
      res.status(400).json({ error: 'ERROR' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          errors: ['ID is required.'],
        });
      }

      const employee = await Employee.findByPk(id);

      if (!employee) {
        res.status(400).json({
          errors: ['Employee not found.'],
        });
      }

      await employee.destroy();

      res.json({ deleted: true });
    } catch (e) {
      res.status(400).json({ error: 'ERROR' });
    }
  }
}

export default new EmployeeController();
