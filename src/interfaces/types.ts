interface ApiParams{
    type:string,
    getApiEnabled:boolean
}
export interface Events extends ApiParams{
    date:string,
    name:string,
    shift:string,
    eventType:string,

}
export interface ApplyLeave extends ApiParams{
    userEmail:string,
    leaveType:string,
    leaveReason:string,
    leaves:{date:string,session:string}[]
}

export interface LeaveApproval extends ApiParams{
    userEmail:string,
    id?:string,
    action?:string
}