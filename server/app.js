const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
const activitiesRoutes = require('./routes/activitiesRoutes');
// const submitRoutes = require('./routes/submitRoutes'); 

const dataRetriveRoutes = require('./routes/dataRetriveRoutes');
const productionDataRoutes = require('./routes/productionData.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/products', productRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/activities', activitiesRoutes);
// app.use('/api/submit', submitRoutes);
// Use the data retrieve routes
app.use('/api', dataRetriveRoutes);

// Routes
app.use('/api/submit', productionDataRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
