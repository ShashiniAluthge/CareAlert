
const nameValidation = (name) => {
    if (!name) {
      return 'Name is required';
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      return 'Name should contain only letters and spaces';
    }
    else if(name.length<4){
        return 'Name should contain atleast 4 characters.'
    }
    return '';
  };
  
  export default nameValidation;
  