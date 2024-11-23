// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from './api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAdd = async (employee) => {
    try {
      await addEmployee(employee);
      fetchEmployees();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEdit = async (employee) => {
    try {
      await updateEmployee(editingEmployee.id, employee);
      setEditingEmployee(null);
      fetchEmployees();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Employee Management System</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="text-end">
          <Button variant="primary" onClick={handleShowModal}>
            Add Employee
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <EmployeeTable
            employees={employees}
            onEdit={(employee) => {
              setEditingEmployee(employee);
              handleShowModal();
            }}
            onDelete={handleDelete}
          />
        </Col>
      </Row>

      {/* Modal for Add/Edit Employee */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmployeeForm
            onSubmit={editingEmployee ? handleEdit : handleAdd}
            initialData={editingEmployee}
            onCancel={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
