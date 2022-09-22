class EmployeeController {
  index(req, res) {
    res.json({ teste: '123131' });
  }
}

export default new EmployeeController();
