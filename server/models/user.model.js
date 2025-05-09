const mongoose = require('mongoose')
/** the id is generated automatically */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    avatar_url: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'inactive'
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'editor'],
        default: 'user'
    },
    email_address: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    teams: [{
        badge: {
            type: String,
            required: true
        },
        memberCount: {
            type: Number,
            default: 0,
            min: 0
        }
    }]
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User