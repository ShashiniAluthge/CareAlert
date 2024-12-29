
const passwordValidation = (password) => {
    if (!password) {
      return 'Password is required';
    } else if (password.length < 8) {
      return 'Password should be at least 8 characters long';
    } else if (!/[a-z]/.test(password)) {
      return 'Password should contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(password)) {
      return 'Password should contain at least one uppercase letter';
    } else if (!/[0-9]/.test(password)) {
      return 'Password should contain at least one number';
    }
    return '';
  };
  
  export default passwordValidation;
  