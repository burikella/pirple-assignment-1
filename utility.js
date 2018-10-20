/*
 * Contains some widely used functions which should
 * reduce duplications and make code more clear and self-documenting.
 */

const utils = {};

utils.getOfTypeOrDefault = function (original, type, def) {
    return typeof(original) === type ? original : def;
};

utils.getNumberOrDefault = function (original, def) {
    return utils.getOfTypeOrDefault(original, 'number', def);
};

utils.getObjectOrDefault = function (original, def) {
    return utils.getOfTypeOrDefault(original, 'object', def);
};

utils.getCaseInsensitiveOrDefault = function (obj, property, def) {

    const lookingForProperty = (property + '').toLowerCase();
    for (const propertyName in obj) {

        const lowercaseProperty = (propertyName + '').toLowerCase();

        if (Object.prototype.hasOwnProperty.call(obj, propertyName) &&
            lowercaseProperty === lookingForProperty) {

            return obj[propertyName];
        }
    }
    return def;
};

utils.getCaseInsensitive = function (obj, property) {
    return utils.getCaseInsensitiveOrDefault(obj, property, undefined);
};

module.exports = utils;