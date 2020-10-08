module.exports = function main(string) {
    if (typeof string !== "string") throw new TypeError("Tiny wants a string!");
    return string.replace(/\s/g, "");
};