const mongoose = require('mongoose');

//database connection
mongoose.connect("mongodb://localhost:27017/students-api",{
    useCreateIndex : true,
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useFindAndModify : false
})
.then((data)=>{console.log('Database successfully connected')})
.catch((err)=>{ console.log(err)})