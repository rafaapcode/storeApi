class EmployeeController {
  index(req, res) {
    res.json({ name: 'Everaldo' });
  }
}

export default new EmployeeController();
