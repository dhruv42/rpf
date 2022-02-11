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
    createListOrganizationResponse
}