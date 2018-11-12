const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateProfileInput(data) {
    let errors = {};
    
    
    data.handle = !isEmpty(data.handle) ? data.handle : ''; // Means if the data is not empty then it wil show the data but if it is empty it will show an empty string and will be tested here
    data.status = !isEmpty(data.status) ? data.status : ''; 
    data.skills = !isEmpty(data.skills) ? data.skills : ''; 
      
   
    if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 4 characters';
    }

   if(Validator.isEmpty(data.handle)) {
       errors.handle = 'Profile handle is required';
   }
   
   if(Validator.isEmpty(data.status)) {
       errors.handle = 'Status field is required';
   }
 
   if(Validator.isEmpty(data.skills)) {
       errors.handle = 'Skills field is required';
   }
   
   if(!isEmpty(data.website)){
       if(!Validator.isURL(data.website)) {
           errors.website = 'Not valid URL';
       }
   }
   if(!isEmpty(data.youtube)){
       if(!Validator.isURL(data.youtube)) {
           errors.youtube = 'Not valid URL';
       }
   }   
   if(!isEmpty(data.twitter)){
       if(!Validator.isURL(data.twitter)) {
           errors.twitter = 'Not valid URL';
       }
   }
       
   if(!isEmpty(data.facebook)){
       if(!Validator.isURL(data.facebook)) {
           errors.facebook = 'Not valid URL';
       }
   }
   
   if(!isEmpty(data.linkedin)){
       if(!Validator.isURL(data.linkedin)) {
           errors.linkedin = 'Not valid URL';
       }
   }
    
   if(!isEmpty(data.instagram)){
       if(!Validator.isURL(data.instagram)) {
           errors.instagram = 'Not valid URL';
       
   }
 }
  
    return {
        errors,
        isValid: isEmpty(errors)
    }
}