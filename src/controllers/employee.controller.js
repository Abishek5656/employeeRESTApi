import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../model/employee.model.js";

export const getAllEmployee = asyncHandler(async (req, res) => {


  const { page, limit } = req.params;

  console.log("Page",page);
  console.log("limit-.", limit)

  // Convert page and limit to numbers and set defaults if necessary
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;

  const skip = (pageNum - 1) * limitNum;

  const allEmployee = await Employee.find({})
    .skip(skip)
    .limit(limitNum);

  if (allEmployee.length === 0) {
    return res.status(400).json(new ApiError(400, "No employees found"));
  }

  const totalEmployees = await Employee.countDocuments({});
  const totalPages = Math.ceil(totalEmployees / limitNum);

  return res.status(200).json(
    new ApiResponse(200, {
      employees: allEmployee,
      totalEmployees,
      totalPages,
      currentPage: pageNum,
    }, "Retrieved all employees with pagination")
  );
});

export const getEmployee = asyncHandler(async (req, res) => {
  const employeeId = req.params.employeeId;

  if (!employeeId) {
    return res.state(400).json(new ApiError(400, "Employee Id required"));
  }

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    return res.status(400).json(new ApiError(400, "Employee not found"));
  }

  return res
    .status(400)
    .json(new ApiResponse(200, employee, "Retrive the employee "));
});

export const createEmployee = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    position,
    department,
    dateOfJoining,
    phoneNumber,
    skills,
    employmentType,
    salary,
    emergencyContact,
    address: { street, city, state, postalCode, country },
  } = req.body;


  if (
    [
      firstName,
      lastName,
      email,
      position,
      department,
      dateOfJoining,
      phoneNumber,
      employmentType,
      street,
      city,
      state,
      postalCode,
      country,
    ].some((field) => !field || field.trim() === "")
  ) {
    return res
      .status(400)
      .json(new ApiError(400, "All required fields must be provided"));
  }

  const existingEmployee = await Employee.findOne({ email });

  console.log("existingEmployee", existingEmployee);

  if (existingEmployee) {
    return res.status(400).json(new ApiError(400, "Employee Already Created"));
  }

  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    position,
    department,
    dateOfJoining,
    phoneNumber,
    employmentType,
    address: {
      street,
      city,
      state,
      postalCode,
      country,
    },
    salary,
    skills,
    emergencyContact,
  });

  if (!employee) {
    throw res.status(400).json(new ApiError(400, "Employee not created"));
  }

  return res
    .status(201)
    .json(new ApiResponse(200, employee, "Employee registered Successfully"));
});

export const updateEmployee = asyncHandler(async (req, res) => {


  const employeeId = req.params.employeeId;

  console.log(employeeId);


  if (!employeeId) {
    return res.state(400).json(new ApiError(400, "Employee Id required"));
  }

  const {
    firstName,
    lastName,
    email,
    position,
    department,
    dateOfJoining,
    phoneNumber,
    skills,
    employmentType,
    salary,
    emergencyContact,
    address: { 
      street, city, state, postalCode, country },
    managerId
  } = req.body;

  const updateEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    {
      $set: {
        firstName,
        lastName,
        email,
        position,
        department,
        dateOfJoining,
        phoneNumber,
        skills,
        employmentType,
        salary,
        address: {
          street,
          city,
          state,
          postalCode,
          country,
        },
        emergencyContact,
        managerId,
      },
    },
    {
      new: true,
    }
  );

  if (!updateEmployee) {
    return res.state(400).json(new ApiError(400, "Update Employee Failed"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateEmployee, "updated employee details"));
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const employeeId = req.params.employeeId;

  if (!employeeId) {
    return res.state(400).json(new ApiError(400, "Employee Id required"));
  }

  const deleteEmployee = await Employee.findByIdAndDelete(employeeId);

  if (!deleteEmployee) {
    return res.state(400).json(new ApiError(400, "Delete Failed"));
  }

  return res.status(200).json(new ApiResponse(200, "employee deleted"));
});
