module.exports = {

/*Function to check if the password is valid or not*/
        validatePassword: function(password , minNumberofChars , maxNumberofChars) {

            let errors = [];
              if (password.length < minNumberofChars) {
                  errors.push("Password must contain minimum 8 characters");
              }
              if (password.length > maxNumberofChars) {
                  errors.push("Password must contain maximum 16 characters");
              }
              if (password.search(/[a-z]/) < 0) {
                  errors.push("Password must contain at least one letter in lower case.");
              }
              if (password.search(/[A-Z]/) < 0) {
                  errors.push("Password must contain at least one letter in upper case.");
              }
              if (password.search(/[0-9]/) < 0) {
                  errors.push("Password must contain at least one digit.");
              }
              if (password.search(/[!@#$%^&*]/) < 0) {
                  errors.push("Password must contain at least one special character.");
              }
              if (errors.length > 0) {

                  return {error : true , message : errors};
              }
              return {error : false , message : ['Password Accepted']};
        },

      getDayOfWeekName : function(day){
          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return days[day];
      },
};
