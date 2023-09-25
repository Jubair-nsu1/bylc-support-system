const { text } = require('body-parser');
const mongoose = require('mongoose')

const Ticket = mongoose.Schema(
    {
        department: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        problem_type: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
        },
        support_needed_on: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        requestDate:{
            type: Date,
            required:true,
        },
        rowClicked: {
            type: Boolean,
            default: false,
        }
    },
    { collection: 'ticket-data' }
);

const model = mongoose.model('TicketData', Ticket)

module.exports = model