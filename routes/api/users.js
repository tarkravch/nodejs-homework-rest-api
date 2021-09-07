const express = require("express");

const { joiSchema } = require("../../models/user");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const ctrl = require("../../controllers/users");

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post(
  "/signup",
  userValidationMiddleware,
  controllerWrapper(ctrl.signup)
);

router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));

router.get(
  "/logout",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.logout)
);

router.get(
  "/current",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.showCurrentUser)
);
module.exports = router;