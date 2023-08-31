const emailRegex = /\w+(\w|\d)*@\w+(\w|\d)*\.\w+(\w|\d)/;

exports.isEmailValid = (email) => {
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    const valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    const parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    const domainParts = parts[1].split(".");
    if (domainParts.some((part) => { return part.length > 63; }))
        return false;

    return true;
}

exports.createPasswordStrengthValidator = (valuePassword) => {

    const value = valuePassword;

    if (!value) {
        return false;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return passwordValid;
}


exports.checkYoutubeShortLink = (link) => {

    const value = link;

    if (!value) {
        return false;
    }

    const hasOnlyValidChars = /^[\w_-]*$/.test(value);

    return hasOnlyValidChars;
}
