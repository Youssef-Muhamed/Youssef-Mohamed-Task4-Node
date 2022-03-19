const router = require("express").Router()
const userController = require('../app/controllers/user.controller')

router.get("/", userController.showAll)
router.get("/add", userController.addUser)
router.post("/add", userController.addLogic)
router.get("/edit/:accNum", userController.editUser)
router.post("/edit/:accNum", userController.editUserLogic)
router.get("/show/:accNum", userController.show)
router.get("/delete/:accNum", userController.deleteUser)

router.get("/addOp/:accNum", userController.addOp)
// router.get("/addOp/:accNum", userController.showOp)
router.post("/addOp/:accNum", userController.addOpLogic)
module.exports = router