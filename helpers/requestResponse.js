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
    createDealsReponse
}