const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLoginInput(data) {
    let errors = {};
    
    
    data.name = !isEmpty(data.name) ? data.name : ''; // Means if the data is not empty then it wil show the data but if it is empty it will show an empty string and will be tested here
     data.email = !isEmpty(data.email) ? data.email : ''; 
      
        
   
   
    if(!Validator.isLength(data.name, { min: 2, max: 30 })){
        errors.name = 'Name must be between 2 and 30 characters';
    }
    
   
    

   if(Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
  }
  
   if(!Validator.isEmpty(data.email)) {
      errors.email = 'Email is invalid';
  }
  
   if(Validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
  }
  
 
  
    return {
        errors,
        isValid: isEmpty(errors)
    }
}