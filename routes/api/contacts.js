const express = require("express");
const { joiSchema } = require("../../models/contact");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const ctrl = require("../../controllers/contacts");
const validationMiddleware = validation(joiSchema);
const router = express.Router();

router.get("/", controllerWrapper(authenticate), ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post(
  "/",
  controllerWrapper(authenticate),
  validationMiddleware,
  ctrl.add
);

router.delete("/:contactId", ctrl.delById);

router.put("/:contactId", validationMiddleware, ctrl.updateById);

router.patch("/:contactId", ctrl.updateStatusContact);

module.exports = router;
