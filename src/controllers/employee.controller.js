import Employee from "../models/Employee.js";

export const listEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
};

export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      message: "Employee created successfully.",
      employee_id: employee._id
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.eid);
  if (!employee)
    return res.status(404).json({ status: false, message: "Employee not found" });

  res.status(200).json(employee);
};

export const updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body);
  if (!employee)
    return res.status(404).json({ status: false, message: "Employee not found" });

  res.status(200).json({ message: "Employee details updated successfully." });
};

export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.query.eid);
  res.status(204).send();
};