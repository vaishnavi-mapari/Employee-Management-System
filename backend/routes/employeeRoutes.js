const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all employees
router.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add an employee
router.post('/employees', (req, res) => {
  const { name, email, position, salary } = req.body;
  db.query('INSERT INTO employees SET ?', { name, email, position, salary }, (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name, email, position, salary });
  });
});

// Update an employee
router.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, position, salary } = req.body;
  db.query('UPDATE employees SET ? WHERE id = ?', [{ name, email, position, salary }, id], (err) => {
    if (err) throw err;
    res.send('Employee updated');
  });
});

// Delete an employee
router.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.send('Employee deleted');
  });
});

module.exports = router;
