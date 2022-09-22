import Employee from '../models/Employee';

class TokenController {
  async storage(req, res) {
    try {
      const { email, password } = req.body;

      const employee = Employee.findOne({ where: { email } });

      if (!employee) {
        return res.status(400).json({ errors: ['Employee not found.'] });
      }

      const checkPassword = await Employee.checkPassword(password);

      if (!checkPassword) {
        return res.status(400).json({ errors: ['Password incorrect.'] });
      }
    } catch (e) {
      return res.status(400).json(null);
    }
  }
}
export default new TokenController();
