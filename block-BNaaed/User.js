var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new schema({
    name: {type:String, required:true},
    email: {type:String, unique: true},
    username: {type: String, required: true, unique:true},
    age: Number,
    phone: {type: String, minlength: 10, maxlength: 13}
}, {timestamps: true})

//prehook always before user name

userSchema.pre('save', function(next) {
    if(this.password && this.isModified('password'))   {    //if modified only the capture 
        bcrypt.hash(this.password, 10, (err, hashed) => {
            if(err) return next(err)
            this.password = hashed // will containt a version of the hashed pass
            return next()
        })
    } else {
        next()
    }
})


userSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {   //takes plain pass 
        return cb(err, result) 
    }) 

}
//prior saving, if I use arrow fn it will not use inner scope of this

var User = mongoose.model('User', userSchema)

  
module.exports = User;


// to has a password - bcrypt.genSalt(saltR, function(err,salt) {
//    bcrypt.hash(myPlaintextPassword, salt, fn(err, hash))
//})

//bcrypt.hash(myPass, saltR, fn(err,hash))
