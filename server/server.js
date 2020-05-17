const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./app/model');
db.sequelize.sync();

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.json({ message: 'Vue Image Tagger' });
});

require('./app/routes/tag.routes')(app);
require('./app/routes/boundingBox.routes')(app);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
