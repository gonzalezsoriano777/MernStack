const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateEducationInput(data) {
    let errors = {};
    
    
    data.school= !isEmpty(data.school) ? data.school : ''; // Means if the data is not empty then it wil show the data but if it is empty it will show an empty string and will be tested here
    data.degree = !isEmpty(data.degree) ? data.degree : ''; 
    data.fieldOfstudy = !isEmpty(data.fieldOfstudy) ? data.fieldOfstudy : ''; 
    data.from = !isEmpty(data.from) ? data.from : ''; 

        
    
   if(Validator.isEmpty(data.school)) {
       errors.school = 'School field is required';
   }
   
   if(Validator.isEmpty(data.degree)) {
       errors.degree = 'Degree field is required';
   }
   
   if(Validator.isEmpty(data.fieldOfstudy)) {
       errors.fieldOfstudy = 'Field of study field is required';
   }
   
   if(Validator.isEmpty(data.from)) {
       errors.from = 'from date field is required';
   }

 
 
  
    return {
        errors,
        isValid: isEmpty(errors)
    }
}