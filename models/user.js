const mongoose = require('mongoose');

const User = mongoose.model('User' ,{
   name: {
       type: String
   },
   lastname: {
       type: String
   },
    email: {
       type: String
    },
    telephone: {
       type: String
    },
    password: {
       type: String
    },
    isAdmin: {
       type: Boolean,
       default: true
    }
}
)
module.exports = User;