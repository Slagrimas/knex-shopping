require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8030
const bodyParser = require('body-parser');
this.knex = require('./knex/knex.js');


const userRoutes = require('./routes/users');

// app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);
// app.use('/products', productsRoutes)
// app.use('/cart', cartRoutes);


app.listen(8030, () => {
  console.log(`listening on port: ${PORT}`);
})