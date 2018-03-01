const { writeToCsv } = require('./util.js');

document.addEventListener('DOMContentLoaded', () => {
    const csvBtn = document.querySelector('#csv');
    
    csvBtn.addEventListener("click", () => {
        console.log("btn clicked");
        writeToCsv('2018-02-28, 2018-02-28');
    });
});