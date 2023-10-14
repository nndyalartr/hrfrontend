interface ApiParams {
    type: string,
    getApiEnabled: boolean
}
export interface Events extends ApiParams {
    date: string,
    name: string,
    shift: string,
    eventType: string,

}
export interface ApplyLeave extends ApiParams {
    userEmail: string,
    leaveType: string,
    leaveReason: string,
    leaves: { date: string, session: string }[]
}

export interface LeaveApproval extends ApiParams {
    userEmail: string,
    id?: string,
    action?: string
}
export interface AttendanceReg extends ApiParams {
    userEmail: string
}
export interface AttendanceRegRequst extends ApiParams {
    userEmail: string,
    attendance_id: string,
    date: string,
    login_time: string,
    logout_time: string,
    working_hours: string,
    reason: string,
    status: string
}

export interface ListAttendanceRequest extends ApiParams{
    userEmail: string,
}