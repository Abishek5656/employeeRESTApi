import { Router } from "express";
import { createEmployee, updateEmployee, deleteEmployee, getAllEmployee, getEmployee} from "../controllers/employee.controller.js";


const router = Router();

router.route("/register").post(createEmployee);

router.route("/update/:employeeId").post(updateEmployee);

router.route("/delete/:employeeId").delete(deleteEmployee);

router.route("/all/:page/:limit").get(getAllEmployee);

router.route("/:employeeId").get(getEmployee);

export default router;