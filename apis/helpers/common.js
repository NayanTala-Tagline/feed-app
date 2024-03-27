export const response = (flag, res, status, message, data) => {
  if (flag) return res.status(status).json({ message, data });
  return res.status(status).json({ error: message });
};
