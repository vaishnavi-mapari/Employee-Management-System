// frontend/src/components/EmployeeTable.jsx
import React from 'react';
import { Table, Button } from 'react-bootstrap';

const EmployeeTable = ({ employees, onEdit, onDelete }) => (
  <Table striped bordered hover responsive>
    <thead className="table-dark">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Position</th>
        <th>Salary ($)</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.length > 0 ? (
        employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.position}</td>
            <td>{emp.salary}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => onEdit(emp)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(emp.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-center">
            No employees found.
          </td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default EmployeeTable;
