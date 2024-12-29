
const emailValidation = (email) => {
    if (!email) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address';
    }
    return ''; 
  };
  
  export default emailValidation;
  