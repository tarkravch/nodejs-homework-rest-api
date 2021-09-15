const express = require("express");

const { joiSchema } = require("../../models/user");
const {
  upload,
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
router.patch(
  "/avatars",
  upload.single("image"),
  controllerWrapper(ctrl.updateImg)
);

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verify));

router.post("/verify", controllerWrapper(ctrl.reverify));

module.exports = router;
