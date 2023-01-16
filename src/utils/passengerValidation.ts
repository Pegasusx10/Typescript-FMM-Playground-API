const queryCondition = (queryParams: any) => {
    let queryCondition: any = {}
    for (const [key, value] of Object.entries(queryParams)) {
    if (['firstName','lastName','age','passportNo','country'].includes(key)) {
    queryCondition[key] = value
    }
    }
    return queryCondition
    }
    
    export default queryCondition;