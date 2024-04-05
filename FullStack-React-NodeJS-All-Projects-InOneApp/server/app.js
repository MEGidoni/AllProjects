const express = require('express');
require('dotenv').config();
const MainRouter = require('./routes/MainRouts.routes');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookie_parser());
app.use(cors(
    {

      origin : process.env.URLS.split(';') ,

      methods : ["GET", "POST", "PUT", "DELETE", "PATCH"] ,

      credentials : true ,

      allowedHeaders : ['Authorization', 'userId','content-type']

    }
    ));




app.use(MainRouter);


app.listen(process.env.PORT,()=>console.log('listening on port',process.env.PORT));

