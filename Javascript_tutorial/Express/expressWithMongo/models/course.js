const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // course code
    _id: {
        type: String,
        uppercase: true,
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: 'This is default info',
    },
    __v: {
        type: Number,
        select: false,
    },
}, {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true
  });

schema.virtual('virtual').get(function() {
    return Math.random(this._id);
});

const model = mongoose.model('Course', schema);

module.exports = model;