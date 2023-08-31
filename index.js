const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
