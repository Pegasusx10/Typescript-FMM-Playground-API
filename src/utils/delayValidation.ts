const queryCondition = (queryParams: any) => {
    let queryCondition: any = {}
    for (const [key, value] of Object.entries(queryParams)) {
    if (['delayCode'].includes(key)) {
    queryCondition[key] = value
    }
    }
    return queryCondition
    }
    
    export default queryCondition;