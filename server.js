const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const mainRoutes = require('./routes/main');

// Serve frontend
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use('/api', mainRoutes);

app.get('/*any', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
