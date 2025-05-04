export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const login = (email, password) => {
    const registered = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const match = registered.find(u => u.email === email && u.password === password);
    if (match) {
      localStorage.setItem('user', JSON.stringify(match));
      return true;
    }
    return false;
  };
  
  export const register = (email, password) => {
    const registered = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    if (registered.find(u => u.email === email)) return false;
    registered.push({ email, password });
    localStorage.setItem('registeredUsers', JSON.stringify(registered));
    return true;
  };
  
  export const logout = () => {
    localStorage.removeItem('user');
  };
  