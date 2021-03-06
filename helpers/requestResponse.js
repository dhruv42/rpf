const {FRESHDESK_TICKET_URL,PIPEDRIVE_DEAL_URL} = require('../config.json');

function createListOrganizationResponse(data) {
    const resp = data.map((item) => {
        const obj = {
            id:item.id,
            name:item.name,
            companyId:item.company_id,
        }
        return obj;
    })
    return resp;
}

function createDealsReponse(data) {
    const resp = data.map((item) => {
        const obj = {
            id:item.id,
            url:`${PIPEDRIVE_DEAL_URL}/${item.id}`,
            ownerName:item.owner_name,
            ownerEmail:item.creator_user_id.email,
            organizationName: item.org_id.name,
            currency: item.currency,
            personName: item?.person_name,
            personEmail:item?.person_id?.email[0]?.value,
            updateTime:item.update_time,
            dealValue:item.value,
            status:item.status
        }
        return obj
    })
    return resp;
}

function createSearchDealsResponse(data) {
    const resp = data.items.map((i) => {
        const obj = {
            id:i.item.id,
            title: i.item.title,
            url:`${PIPEDRIVE_DEAL_URL}/${i.item.id}`,
            currency:i.currency,
            dealStage:i.item.stage.name,
            personName:i.item.person.name,
            organizationId:i.item.organization.id,
            organizationName: i.item.organization.name,
            notes:i.item.notes
        }
        return obj;
    })
    return resp;
}

function createTicketResponse(data) {
    const resp = data.results.map((ticket) => {
        const obj = {
            id: ticket.id,
            ticketUrl:`${FRESHDESK_TICKET_URL}/${ticket.id}`,
            subject: ticket.subject,
            customFields: ticket.custom_fields,
            ccEmails: ticket.cc_emails,
            replyCcEmails:ticket.reply_cc_emails,
            ticketCcEmails:ticket.ticket_cc_emails,
            toEmails:ticket.to_emails,
            priority:ticket.priority
        }
        return obj;
    })
    return resp;
}

function createOrganizationByIdResponse(data) {
    const obj = {
        id:data.id,
        organizationName:data.name,
        ownerName:data.owner_id.name,
        ownerEmail:data.owner_id.email
    }
    return obj
}

const responseHandler = (success, code = 400, message = 'valid', obj) => {
    const response =  {
        success,
        code,
        message
    }
    if(success) response.data = obj
    else response.error = obj
    return response
};

module.exports = {
    responseHandler,
    createListOrganizationResponse,
    createDealsReponse,
    createSearchDealsResponse,
    createTicketResponse,
    createOrganizationByIdResponse
}