
import Newsletter from '../models/newsletter'
const newSub = new Newsletter({});

// rewrite the above code with the changes mentioned above
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

        // Check if the email is already subscribed
        const existing = await Newsletter.findOne({ email }, null, null);
        if (existing) {
            return res.status(409).send({
                message: 'Email already exists'
            });
        }

        // Create a new subscription
        const newSub = new Newsletter({ email });
        await newSub.write();

        // Placeholder for sending confirmation email
        // await sendConfirmationEmail(email);

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

module.exports = signup;