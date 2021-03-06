const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validations/profile')
const validateExperienceInput = require('../../validations/experience')
const validateEducationInput = require('../../validations/education')


// Load Profile model
const Profile = require('../models/Profile');
// Load User Profile
const User = require('../models/User');



// @routes GET api/profile/test
// @desc Tests profile route
// @access Public


router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

// @routes GET api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public

router.get('/handle/:handle', (req, res) => {
    Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile =>  {
          if(!profile) {
          errors.noprofile = 'There is no profile for this user';
           res.status(404).json(errors);
         }
         res.json(profile)
      })
      .catch(err => res.status(404).json(err));
});



router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile =>  {
          if(!profile) {
          errors.noprofile = 'There is no profile for this user';
           res.status(404).json(errors);
         }
         res.json(profile)
      })
      .catch(res.status(404).json({profile: 'There is no profile for this user' }));
});


// @routes GET api/profile/all
// @desc   Get all profiles
// @access Public
router.get('/all', (req, res) => {
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = 'There are no profiles';
            return res.status(404).json(errors);
        }
         res.json(profiles);
    })
    (res.status(404).json({profile: 'There is no profile for this user' }))
})

// @routes GET api/profile
// @desc   Get current uers profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
   Profile.findOne({ user: req.user.id })
   .then(profile => {
       if(!profile) {
           errors.noprofile = 'There is no profile for this user'
           return res.status(404).json(errors)
       }
       res.json(profile);
   })
   .catch(err => res.status(404).json(err));
 }
);

// @routes POST api/profile
// @desc   Create or Edit Profile
// @access Privates
// Update profile
router.post(
    '/', 
     passport.authenticate('jwt', { session: false }), 
     (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);      
        
    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors)
;    }
        
     // Get Fields
     const profileFields = {};
     profileFields.user = req.user.id;
     if(req.body.handle) profileFields.handle = req.body.handle; // checking if this sent in from the form and if so it will be sent to profileFields.handle
     if(req.body.company) profileFields.handle = req.body.company;
     if(req.body.website) profileFields.handle = req.body.website;
     if(req.body.location) profileFields.location = req.body.location;
     if(req.body.bio) profileFields.bio = req.body.bio;
     if(req.body.status) profileFields.status = req.body.status;
     if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
     // Skills - Split into array
     if(typeof req.body.skills !== 'undefined') {
         profileFields.skills = req.body.skills.split(',')
     }
     
     // Social 
     profileFields.social = {};
     
     if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
     if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
     if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
     if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
     if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
     
     Profile.findOne({ user: req.user.id })
     .populate('user', ['name', 'avatar'])
      .then(profile => {
          if(profile) {
              // Update
              Profile.findOneAndUpdate(
                  { user: req.user.id }, 
                  { $set: profileFields }, 
                  { new: true }
                )
                 .then(profile => res.json(profile))
                  
          }else {
              // Create
              
              
              // Check if handle exists
              Profile.findOne({ handle: profileFields.handle }).then(profile => {
                  if(profile) {
                      errors.handle = 'That handle already exists';
                      res.status(400).json(errors);
                  }
                  
                  // Save profile
                  new Profile(profileFields).save().then(profile => res.json(profile));
              })
          }
      })
 }
);


// @routes GET api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post('/.experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    const { errors, isValid } = validateExperienceInput(req.body);      
        
    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors)
;    }
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        
        // Add to exp array
        profile.experience.unshift(newExp);
        
        profile.save().then(profile => res.json(profile));
    })
});

// @routes GET api/profile/education
// @desc   Add experience to profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    const { errors, isValid } = validateEducationInput(req.body);      
        
    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors)
;    }
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldOfstudy: req.body.fieldOfstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        
        // Add to edu array
        profile.education.unshift(newEdu);
        
        profile.save().then(profile => res.json(profile));
    })
});

// @routes DELETE api/profile/experience/:exp_id
// @desc   Delete experience to profile
// @access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    const { errors, isValid } = validateExperienceInput(req.body);      
        
    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors)
;    }
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
       // Get remove index
       const removeIndex = profile.experience
       .map(item => item.id)
       .indexOf(req.params.exp_id);
       
       // Splice Array
       profile.experience.splice(removeIndex, 1);
       
       // Save
       profile.save()
       .then(profile => {
           res.send(profile);
       })
       .catch(err => res.status(404).json(profile));
    })
});

// @routes DELETE api/profile/education/:edu_id
// @desc   Delete education to profile
// @access Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    const { errors, isValid } = validateEducationInput(req.body);      
        
    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors)
;    }
    
    Profile.findOne({ user: req.user.id })
    .then(profile => {
       // Get remove index
       const removeIndex = profile.education
       .map(item => item.id)
       .indexOf(req.params.exp_id);
       
       // Splice Array
       profile.education.splice(removeIndex, 1);
       
       // Save
       profile.save()
       .then(profile => {
           res.send(profile);
       })
       .catch(err => res.status(404).json(profile));
    })
});


// @routes DELETE api/profile/experience/:exp_id
// @desc   Delete experience to profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
          User.findOneAndRemove({ _id: req.user.id })
          .then(() => {
              res.json({ success: true });
          })
      })
});


module.exports = router;