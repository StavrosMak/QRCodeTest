const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'qr_code_db'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Endpoint to check if the ID has been used
app.get('/api/check/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT used FROM qr_codes WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    if (results.length > 0) {
      console.log(results);
      res.json({ used: results[0].used });
    } else {
      res.status(404).json({ message: 'ID not found' });
    }
  });
});

// Endpoint to mark the ID as used
app.post('/api/use/:id', (req, res) => {
  const id = req.params.id;
  const query = 'UPDATE qr_codes SET used = TRUE WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'ID marked as used' });
    } else {
      res.status(404).json({ message: 'ID not found' });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
