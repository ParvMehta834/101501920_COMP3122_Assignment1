export const success = (res, data) => res.status(200).json(data);
export const error = (res, message, code = 500) => res.status(code).json({ status: false, message });