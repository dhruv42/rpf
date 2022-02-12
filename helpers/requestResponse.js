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
            ownerName:item.owner_name,
            ownerEmail:item.creator_user_id.email,
            organizationName: item.org_id.name,
            currency: item.currency,
            personName: item.person_name,
            personEmail:item.person_id.email[0].value
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
    createSearchDealsResponse
}