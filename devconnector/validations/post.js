const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validatPostInput(data) {
    let errors = {};
    
    
    data.text = !isEmpty(data.text) ? data.text : ''; // Means if the data is not empty then it wil show the data but if it is empty it will show an empty string and will be tested here

        
    if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }    
    
   if(Validator.isEmpty(data.text)) {
      errors.text = 'Text field is required';
  }
  
  
 
  
    return {
        errors,
        isValid: isEmpty(errors)
    }
}