var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    todo: {type: String, required: true},
    isCompleted: {type: Boolean, required: true, default: false}
});


// Export the model
module.exports = mongoose.model('task', taskSchema);