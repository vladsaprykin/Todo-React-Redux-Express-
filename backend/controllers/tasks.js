const Task = require('../models/task');

exports.task_create = function (req, res, next) {
	const task = new Task(
		{
			todo: req.body.todo
		}
	);
	task.save(function (err, result) {
		if (err) {
			return next(err);
		}
		res.send(result)
	})
};
exports.task_getAll = function (req, res, next) {
    Task.find({}, function (err, tasks) {
        if (err) return next(err)
        res.send(tasks)
    })
};
exports.task_update = function (req, res, next) {
    Task.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, task) {
        if (err) return next(err);
        res.send('Update');
    });
};

exports.task_delete = function (req, res, next) {
    Task.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
exports.tasks_setCompleted = function (req, res, next) {
	Task.updateMany({}, {isCompleted: true},{}, function (err){
		if (err) return next(err);
		res.send('all Completed');
	})
};

exports.tasks_bulk_delete = function (req, res, next) {
	Task.deleteMany({isCompleted: true}, function (err) {
		if (err) return next(err);
		res.send('Deleted successfully!');
	})
};
