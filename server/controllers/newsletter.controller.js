import NewsletterSubscription from "../models/newsletter.js"; // Often good practice to include .js with ES Modules in Node
 
// q: does this function work?
// a: Yes, this function is designed to handle newsletter signup requests by validating the email, checking for duplicates, and saving new subscriptions.

const signup = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email format
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).send({
                message: 'Please provide a valid email address'
            });
        }

        // Check if the email is already subscribed (Using the correct model name)
        const existing = await NewsletterSubscription.findOne({ email }); // Use newsletterSubscription and simplified findOne
        if (existing) {
            return res.status(409).send({
                message: 'Email already exists'
            });
        }

        // Create a new subscription
        const newSub = new NewsletterSubscription({ email });
        await newSub.save();


        return res.status(201).send({
            message: 'Successfully subscribed to newsletter',
            email: email
        });

    } catch (err) {
        console.error('Newsletter signup error:', err);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
}

module.exports = signup; // Use ES Module export