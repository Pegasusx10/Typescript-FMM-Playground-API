"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryCondition = (queryParams) => {
    let queryCondition = {};
    for (const [key, value] of Object.entries(queryParams)) {
        if (['firstName', 'lastName', 'age', 'passportNo', 'country', 'flightNumber', 'delayCode'].includes(key)) {
            queryCondition[key] = value;
        }
    }
    return queryCondition;
};
exports.default = queryCondition;
