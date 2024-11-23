// frontend/src/components/EmployeeForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const EmployeeForm = ({ onSubmit, initialData, onCancel }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setEmployee({
        name: initialData.name || '',
        email: initialData.email || '',
        position: initialData.position || '',
        salary: initialData.salary || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!employee.name) {
      valid = false;
      newErrors.name = 'Name is required.';
    }

    if (!employee.email) {
      valid = false;
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      valid = false;
      newErrors.email = 'Email is invalid.';
    }

    if (!employee.position) {
      valid = false;
      newErrors.position = 'Position is required.';
    }

    if (!employee.salary) {
      valid = false;
      newErrors.salary = 'Salary is required.';
    } else if (isNaN(employee.salary) || Number(employee.salary) <= 0) {
      valid = false;
      newErrors.salary = 'Salary must be a positive number.';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(employee);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPosition">
        <Form.Label>Position</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter position"
          name="position"
          value={employee.position}
          onChange={handleChange}
          isInvalid={!!errors.position}
        />
        <Form.Control.Feedback type="invalid">
          {errors.position}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSalary">
        <Form.Label>Salary ($)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter salary"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          isInvalid={!!errors.salary}
        />
        <Form.Control.Feedback type="invalid">
          {errors.salary}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end">
        {onCancel && (
          <Button variant="secondary" className="me-2" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="primary" type="submit">
          {initialData ? 'Update' : 'Add'}
        </Button>
      </div>
    </Form>
  );
};

export default EmployeeForm;
