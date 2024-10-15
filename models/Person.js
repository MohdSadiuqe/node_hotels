const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personschema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

// Pre-save hook to hash the password before saving
personschema.pre('save', async function(next) {
    const person = this;

    // If the password has not been modified, don't hash it again
    if (!person.isModified('password')) return next();

    try {
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt); // Use await here
        
        // Set the hashed password
        person.password = hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare entered password with the hashed password
personschema.methods.comparePassword = async function(enteredPassword) {
    try {
        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};

const Person = mongoose.model('Person', personschema);
module.exports = Person;
