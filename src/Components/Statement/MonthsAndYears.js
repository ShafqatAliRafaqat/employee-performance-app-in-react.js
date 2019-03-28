import _ from "lodash";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const current = new Date().getFullYear();

const years = _.range(current, current - 9);

const data = {
    months, years
};

export default data;