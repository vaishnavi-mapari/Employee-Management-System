const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // Replace 5173 with Vite’s port

app.use(cors());
app.use(express.json());
app.use('/api', employeeRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
