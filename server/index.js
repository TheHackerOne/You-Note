const mongoose = require('mongoose');
const express = require('express');
const auth = require('./middleware/auth');
const path = require('path');
const app = express();

const API_PORT = process.env.PORT || 8080;

app.use(express.json());


//app.use(express.static(path.join(__dirname, '..', 'you-note', 'build')));
const dbPath = 'DB PATH HERE'
mongoose
  .connect(dbPath, {
    dbName: 'you_note',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected'))
  .catch((error) => console.log(error));

app.all('/api/*', auth)

app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));
/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
*/

app.listen(API_PORT, () => console.log(`Listening at http://localhost:${API_PORT}`));
