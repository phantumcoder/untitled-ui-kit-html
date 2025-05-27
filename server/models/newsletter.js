const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsletterSubscription = new Schema ({
    email: {
        type: String,
        required: [true, 'email address is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'please enter a valid email address'
        ]
    },
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        trim: true,
        maxlength: [50,'first name must be less than 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
        trim: true,
        maxlength: [50,'last name must be less than 50 characters']
    },

    consentGiven: {
        type: Boolean,
        required: [true, 'consent is required'],
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

    source: {
        type: String,
        trim: true,
        required: [true, 'source is required'],
    }
})

// create the write method


module.exports = mongoose.model('NewsletterSubscription', NewsletterSubscription);