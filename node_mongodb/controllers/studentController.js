const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
  res.render('student/addOrEdit', {
    viewTitle: 'Insert Student',
  })
})

router.post('/', (req, res) => {
  if (req.body._id == '') {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  var student = new Student()
  student.fullName = req.body.fullName;
  student.email = req.body.email;
  student.mobile = req.body.mobile;
  student.city = req.body.city;
  student.save()
    .then((doc) => {
      res.redirect('student/list');
    })
    .catch((err) => {
      console.log('Error during insert: ' + err);
    });
}

function updateRecord(req, res) {
  Student.findOneAndUpdate({ _id: req.body_id }, req.body, { new: true })
    .then(doc => {
      res.redirect('student/list');
    })
    .catch(err => {
      console.log('Error during insert: ' + err);
    });
}

router.get('/list', (req, res) => {
  Student.find().then(docs => {
    res.render('student/list', {
      list: docs
    });
  }).catch(err => console.log('Error during insert: ' + err));
});

router.get('/:id', (req, res) => {
  Student.findById(req.params.id).then(doc => {
    res.render('student/addOrEdit', {
      viewTitle: 'Updates Student',
      student: doc,
    });
  }).catch(err => console.log('Error during insert: ' + err));
  // Student.findById(req.params.id, (err, doc)  => {
  //   if (!err) {
  //     res.render('student/addOrEdit', {
  //       viewTitle: 'Updates Student',
  //       student: doc,
  //     });
  //   }
  // });
});

router.delete('/:id', (req, res) => {
  Student.findByIdAndRemove(req.params.id).then(doc => {
    res.redirect('student/list');
  }).catch(err => console.log('Error during insert: ' + err));
  // Student.findByIdAndRemove(req.params.id, (err, doc) => {
  //   if (!err) {
  //     res.redirect('student/list');
  //   } else {
  //     console.log('Error during insert: ' + err);
  //   }
  // });
});

module.exports = router;