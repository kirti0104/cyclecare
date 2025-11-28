export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  // Simple check: does the token exist?
  // You might want to add more sophisticated checks here,
  // like verifying the token's expiration date.
  return !!token;
};
