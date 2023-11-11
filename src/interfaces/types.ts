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

export interface ListAttendanceRequest extends ApiParams {
    userEmail: string,
}
export interface ApplyResignation extends ApiParams {
    resignation_date: string,
    personal_phone_no: string,
    personal_mail_id: string,
    resignation_reason: string,
    user_email: string
}
export interface GetAllRegnations extends ApiParams {
    user_email: string,
    exit_date?: string,
    status?: string,
    record_id?: string
}