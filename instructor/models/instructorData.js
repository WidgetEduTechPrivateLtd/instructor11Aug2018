var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var instructorDetailsSchema = new Schema(
  {
    fullName: {type: String, required: true, trim: true, maxlength: 100},
    email: {}, //possibly an id
    mobileNumber: {type: Number, required: true, trim: true, minlength: 10, maxlength: 13,  },
    address: [], //array of multiple lines
    city: {type: String, required: true, trim: true, maxlength: 50},
    pinCode: {type: Number, required: true, trim: true, min: 000001, max: 999999},
    state: {type: String, required: true, trim: true, maxlenth: 50},
    country: {type: String, required: true, trim: true, maxlength: 50},
    teachExp: {type: Number, required: true, trim: true, min: 0, max: 100},
    subjects: [String], //dynamic fields.
    class: [String], //checkboxes
    language: [String], //checkboxes
    resume: {string: String, required: true, }
  }
);

var instructorData = mongoose.model('instructorData', instructorDetailsSchema);
