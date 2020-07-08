const express = require(`express`);

const userController = require(`../controllers/userController`);
const authController = require(`../controllers/authController`);

const router = express.Router();

router.route(`/`).get(userController.getUsers).post(userController.createUser);
router.post(`/import`, userController.createUsers);

router.post(`/login`, authController.login);
router.get(`/logout`, authController.logout);

router
  .route(`/:id`)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
