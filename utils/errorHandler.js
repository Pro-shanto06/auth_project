const handleErrors = (res, error, template, additionalData) => {
    if (error.errors) {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).render(template, { errors, ...additionalData });
    } else {
        console.error(error);
        return res.status(500).render(template, { errorMessage: 'Server error', ...additionalData });
    }
};

module.exports = handleErrors;
