const queryCondition = (queryParams: any) => {
    let queryCondition: any = {}
    for (const [key, value] of Object.entries(queryParams)) {
    if (['code','firstName','lastName','age','passportNo','country','flightNumber'].includes(key)) {
    queryCondition[key] = value
    }
    }
    return queryCondition
    }
    
    export default queryCondition;
