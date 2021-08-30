const express = require("express");
let router = express.Router();
const tasks_controller = require("../controllers/tasks");

router.post("/", tasks_controller.task_create);
router.put("/:id", tasks_controller.task_update);
router.patch("/bulk_update", tasks_controller.tasks_setCompleted);
router.delete("/bulk_delete", tasks_controller.tasks_bulk_delete);
router.delete("/:id", tasks_controller.task_delete);
router.get("/", tasks_controller.task_getAll);

module.exports = router;
