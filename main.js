const zendesk = require('node-zendesk');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const client = zendesk.createClient({
    username: 'luis@openfin.co',
    token: 'yjnh6Eo7ja2K0y3fuS2bIQzU229QNMtZVTmDoqOM',
    remoteUri: 'https://openfin.zendesk.com/api/v2',
    disableGlobalState: true
});

// original ticket columns: 
// id, created_at, updated_at, type, priority, status, 
// requester_id, submitter_id, organization_id, group_id, tags 

// ticket metric columns:
// group_stations, assignee_stations, replies, assignee_updated_at, 
// requester_updated_at, status_updated_at, initially_updated_at, assigned_at, 
// solved_at, first_resolution_in_minutes, reply_time_in_minutes

const columns = [
    'id', 'type', 'priority', 'status', 'from', 'requester_id',
    'submitter_id', 'group_id', 'organization_id', 'tags', 'created_at',
    'updated_at', 'group_stations', 'assignee_stations', 'replies',
    'assignee_updated_at', 'requester_update_at', 'status_updated_at',
    'initially_assigned_at', 'assigned_at', 'solved_at',
    'first_resolution_time_in_minutes', 'reply_time_in_minutes'
];

function getAllTickets() {
    return new Promise((resolve, reject) => {
        client.tickets.list((err, req, result) => {
            resolve(result);
            reject(err);
        });
    });
}

function getMetrics(ticketId) {
    return new Promise((resolve, reject) => {
        client.ticketmetrics.list(ticketId, (err, req, result) => {
            resolve(result);
            reject(err);
        });
    });
}

function getTicketsInRange(tickets, startDate, endDate) {
    let ticketsInRange = [];
    tickets.forEach((ticket) => {
        ticketDate = new Date(ticket.created_at);
        if (ticketDate >= startDate && ticketDate <= endDate) {
            let filteredTicket = filterTicket(ticket);
            
            ticketsInRange.push(filterTicket(ticket));
        }
    });
    return ticketsInRange;
}

function filterTicket(ticket) {
    let filteredTicket = {};
    Object.keys(ticket).forEach((column) => {
        if (columns.includes(column)) {
            filteredTicket[column] = ticket[column];
        }
    });
    return filteredTicket;
}

function addMetricsToSingleTicket(ticket) {
    let ticketWithMetrics = ticket;
    getMetrics(ticket.id).then((metrics) => {
        Object.keys(metrics).forEach((column) => {
            if (columns.includes(column)) {
                ticketWithMetric[column] = metrics[column];
            }
        });
    });
    return ticketWithMetrics;
}

function writeToCsv(tickets) {
    writer.pipe(fs.createWriteStream('out.csv'));
    tickets.forEach((ticket) => {
        writer.write(ticket);
    });
    writer.end();
}
getAllTickets().then((tickets) => {
    const ticketsInRange = getTicketsInRange(tickets, sDate, eDate);
    console.log(ticketsInRange[0]);
    writeToCsv(ticketsInRange);
});

const sDate = new Date('2018/2/20');
const eDate = new Date('2018/2/23');