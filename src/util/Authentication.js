export const getAuth = () => {
  const login = localStorage.getItem("token");
  return login;
};
