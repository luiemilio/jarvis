const axios = require('axios');

const email = 'luis@openfin.co';
const token = 'token:yjnh6Eo7ja2K0y3fuS2bIQzU229QNMtZVTmDoqOM';
const options = {
    headers: {
        'Authorization': 'Basic ' + new Buffer(email + '/' + token).toString('base64')
    }
};

async function getTicketsInRange(startDate, endDate) {
    url = `https://openfin.zendesk.com/api/v2/search.json?query=created>=${startDate} created<=${endDate} type:ticket`;
    try {
        const response = await axios.get(url, options);
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}

async function getMetrics(ticketId) {
    url = `https://openfin.zendesk.com/api/v2/tickets/${ticketId}/metrics.json`
    try {
        const response = await axios.get(url, options);
        return response.data.ticket_metric;
    } catch (error) {
        console.error(error);
    }
}

async function getUserFromId(userId) {
    url = `https://openfin.zendesk.com/api/v2/users/${userId}.json`
    try {
        const response = await axios.get(url, options);
        return response.data.user.name;
    } catch (error) {
        console.error(error);
    }
}

async function getOrganizationFromId(organizationId) {
    url = `https://openfin.zendesk.com/api/v2/organizations/${organizationId}.json`
    try {
        const response = await axios.get(url, options);
        return response.data.organization.name;
    } catch (error) {
        console.error(error);
    }
}

async function getGroupFromId(groupId) {
    url = `https://openfin.zendesk.com/api/v2/groups/${groupId}.json`
    try {
        const response = await axios.get(url, options);
        return response.data.group.name;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getTicketsInRange: getTicketsInRange,
    getMetrics: getMetrics,
    getUserFromId: getUserFromId,
    getOrganizationFromId: getOrganizationFromId,
    getGroupFromId: getGroupFromId
};