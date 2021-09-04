const express = require("express");
const { joiSchema } = require("../../models/contact");
const { validation } = require("../../middlewares");
const ctrl = require("../../controllers");
const validationMiddleware = validation(joiSchema);
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validationMiddleware, ctrl.add);

router.delete("/:contactId", ctrl.delById);

router.put("/:contactId", validationMiddleware, ctrl.updateById);

router.patch("/:contactId", ctrl.updateStatusContact);

module.exports = router;
