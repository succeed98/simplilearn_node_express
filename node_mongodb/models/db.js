const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StudentDB', {
  useNewUrlParser: true
}).then(() => {
  console.log('Connection Succeeded !');
}).catch(err => {
  console.log(err);
})

require('./student.model');