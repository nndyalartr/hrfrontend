export interface ApiParams {
    type: string,
    getApiEnabled: boolean
}
export interface Events extends ApiParams {
    date: string,
    name: string,
    shift: string,
    eventType: string,

}
export interface ItTicketCreate extends ApiParams {
    created_by: string,
    title: string,
    desc: string
}
export interface PreOnBoard extends ApiParams {
    name: string,
    email: string,
    designation: string,
    dob: string,
    doj: string,
    mobile: string
}
export interface OnBoardUser extends ApiParams {
    name: String,
    email: String,
    doj: String,
    designation: String,
    ctc: String,
    location: String
}
export interface ApplyLeave extends ApiParams {
    userEmail: string,
    leaveType: string,
    leaveReason: string,
    leave_count: number,
    leaves: { date: string, session: string }[]
}
export interface CreateLogs extends ApiParams {
    userEmail: string,
    data: any
}
export interface GetTimeLogs extends ApiParams {
    userEmail: string,
    logsDate: string
}

export interface LeaveApproval extends ApiParams {
    userEmail: string,
    id?: string,
    action?: string
}
export interface AttendanceReg extends ApiParams {
    userEmail: string
}
export interface ProdReportsGet {
    year: string,
    client: string,
    month: string,
    shift: string,
    getApiEnabled: boolean
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
export interface TeamAttendanceType extends ApiParams {
    userEmail: string,
    date?: string
}
export interface ApplyResignation extends ApiParams {
    resignation_date: string,
    personal_phone_no: string,
    personal_mail_id: string,
    resignation_reason: string,
    user_email: string
}
export interface ApplyAdvance extends ApiParams {
    advance_date: string,
    personal_phone_no: string,
    personal_mail_id: string,
    advance_reason: string,
    user_email: string,
    advance_amount: string,
    address: string
}
export interface GetAllRegnations extends ApiParams {
    user_email: string,
    exit_date?: string,
    status?: string,
    record_id?: string
}
export interface GetAllAttendanceDet extends ApiParams {
    toDate: string,
    fromDate: string
}