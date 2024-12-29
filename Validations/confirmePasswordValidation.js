
const confirmPasswordValidation = (confirmPassword, password) => {
    if (!confirmPassword) {
      return 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return ''; // No error
  };
  
  export default confirmPasswordValidation;
  