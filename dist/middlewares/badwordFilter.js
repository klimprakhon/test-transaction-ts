"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badwordFilter = void 0;
const badwords = ["Bloody", "Hell", "Shit", "Fuck", "Damn", "Cunt", "Bitch"];
const badwordFilter = (req, res, next) => {
    const filterText = (text) => {
        return badwords.reduce((acc, word) => {
            const regex = new RegExp(word, "gi");
            return acc.replace(regex, "***");
        }, text);
    };
    if (req.body.note) {
        req.body.note = filterText(req.body.note);
    }
    next();
};
exports.badwordFilter = badwordFilter;
