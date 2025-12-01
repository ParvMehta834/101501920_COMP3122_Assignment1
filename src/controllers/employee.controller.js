import Employee from "../models/Employee.js";


export const listEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ created_at: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const createEmployee = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    } = req.body;

    const payload = {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    };

    if (req.file) {
      payload.profile_picture = `/uploads/${req.file.filename}`;
    }

    const employee = await Employee.create(payload);

    res.status(201).json({
      status: true,
      message: "Employee created successfully.",
      employee
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};


export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    } = req.body;

    const payload = {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    };

    if (req.file) {
      payload.profile_picture = `/uploads/${req.file.filename}`;
    }

    const employee = await Employee.findByIdAndUpdate(req.params.eid, payload, {
      new: true
    });

    if (!employee) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    res.status(200).json({
      status: true,
      message: "Employee details updated successfully.",
      employee
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.eid);
    if (!employee) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (position) filter.position = position;

    const employees = await Employee.find(filter);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
