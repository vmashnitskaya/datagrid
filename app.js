const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());


app.use('/api/auth/', require('./routes/auth.routes'));
app.use('/api/users/', require('./routes/userData.routes'));
app.use('/api/apps/', require('./routes/appData.routers'));
app.use('/api/locations/', require('./routes/locationData.routes'));

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port') || 5000;

const start = async () => {
    try {
        console.log(config.get('mongoUri'));
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start();