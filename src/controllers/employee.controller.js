import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../model/employee.model.js";

export const getAllEmployee = asyncHandler(async (req, res) => {
  const allEmployee = await Employee.find({});

  if (allEmployee.length === 0) {
    return res.status(400).json(new ApiError(400, "No employee found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allEmployee, "Retrive all Employees"));
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
    emergencyContactNumber,
    emergencyContactRelation,
    emergencyContactName,
    country,
    postalCode,
    state,
    city,
    street,
  } = req.body;

  console.log("createEmployee");

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
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactNumber,
    ].some((field) => field?.trim() === "")
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
    emergencyContact: {
      name: emergencyContactName,
      relationship: emergencyContactRelation,
      phoneNumber: emergencyContactNumber,
    },
  });

  console.log("employee", employee);

  if (!employee) {
    throw res.status(400).json(new ApiError(400, "Employee not created"));
  }

  return res
    .status(201)
    .json(new ApiResponse(200, employee, "Employee registered Successfully"));
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const employeeId = req.params.employeeId;

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
    emergencyContactNumber,
    emergencyContactRelation,
    emergencyContactName,
    country,
    postalCode,
    state,
    city,
    street,
    managerId,
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
        emergencyContactNumber,
        emergencyContactRelation,
        emergencyContactName,
        country,
        postalCode,
        state,
        city,
        street,
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
