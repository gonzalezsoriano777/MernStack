const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateExperienceInput(data) {
    let errors = {};
    
    
    data.title= !isEmpty(data.title) ? data.title : ''; // Means if the data is not empty then it wil show the data but if it is empty it will show an empty string and will be tested here
     data.company = !isEmpty(data.company) ? data.company : ''; 
     data.from = !isEmpty(data.from) ? data.from : ''; 

        
    
   if(Validator.isEmpty(data.title)) {
       errors.title = 'Job title field is required';
   }
   
   if(Validator.isEmpty(data.company)) {
       errors.company = 'Company field is required';
   }
   
   if(Validator.isEmpty(data.from)) {
       errors.from = 'from date field is required';
   }

 
 
  
    return {
        errors,
        isValid: isEmpty(errors)
    }
}