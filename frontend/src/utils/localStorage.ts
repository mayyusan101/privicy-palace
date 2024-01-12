const setToken = (token : string) =>
  localStorage.setItem("token", JSON.stringify(token));

  const getToken = (): string | undefined => {
    return localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token")!)
      : undefined;
  };
  
const removeToken = () =>
  localStorage.getItem("token") ? localStorage.removeItem("token") : null;


export { setToken, removeToken, getToken };
