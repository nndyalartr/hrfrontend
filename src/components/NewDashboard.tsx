import { Col, Menu, MenuProps, Row, Avatar, message, Card } from "antd";
import { UserInfoStore } from "../utils/useUserInfoStore";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import moment from 'moment';
import Cookies from "js-cookie";
import { useSignOut } from "react-auth-kit";
import { FcSoundRecordingCopyright } from "react-icons/fc";
import { Bar, Line } from "react-chartjs-2"
import "./dashboard.css"
import Calender from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { HomeOutlined, UserOutlined, NotificationOutlined, LogoutOutlined, SettingOutlined, SolutionOutlined, UserSwitchOutlined, BarChartOutlined } from '@ant-design/icons';
import useGetMeDetails from "../QueryApiCalls/useGetMeDetails";
import { AxiosError, AxiosResponse } from "axios";
import useCreateAttendance from "../QueryApiCalls/usePunchIn";
import { Events } from "../interfaces/types";
import useCreateorGetEvents from "../QueryApiCalls/useEventDetails";
import useGetAttendanceDetails from "../QueryApiCalls/useGetAttendanceDetails";
import useGetLeaveDetails from "../QueryApiCalls/useGetLeaveDetails";
import type { ProgressProps } from 'antd';
import { Progress, Popover, Steps } from 'antd';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { StepsProps } from 'antd';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    LineElement,
    PointElement
} from "chart.js"
ChartJS.register(
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
)
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
interface UserData {
    date: string;
    type: string;
}

interface MyCalendarComponentProps {
    userData: UserData[];
}
const NewDashBoard = () => {
    const loggedInUserDetails = UserInfoStore()?.loggedUserInfo.value
    const [mySelfOptions, setMySelfOptions] = useState<{ email: string, getApiEnabled: boolean }>({ email: loggedInUserDetails.user_email, getApiEnabled: false })
    const [userBasicDetails, setUserBasicDetails] = useState<any>({})
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string, type: string }>({ getApiEnabled: false, userEmail: "", type: "" })
    const [leaveOptions, setLeaveOptions] = useState<{ getApiEnabled: boolean, userEmail: string, type: string }>({ getApiEnabled: false, userEmail: loggedInUserDetails.user_email, type: "" })
    const [eventOptions, setEventOptions] = useState<Events>({ date: "", type: "", getApiEnabled: false, name: "", shift: "", eventType: "" })
    const [events, setEvents] = useState<any>([])
    const [userData, setUserData] = useState<any>([])
    const [attendanceOptions, setAttendanceOptions] = useState<{ getApiEnabled: boolean, userEmail: string }>({ getApiEnabled: false, userEmail: "" })
    const currentDate = moment().format('dddd Do MMMM, YYYY');
    useEffect(() => {
        setMySelfOptions({ ...mySelfOptions, getApiEnabled: true })
        setAttendanceOptions({ userEmail: loggedInUserDetails.user_email, getApiEnabled: true })
        setLeaveOptions({ ...leaveOptions, getApiEnabled: true })
    }, [])
    const onAttendanceSuccess = (res: any) => {
        setAttendanceOptions({ ...attendanceOptions, getApiEnabled: false })
        if (res.data) {
            const today = moment()
            const test = res.data.map((x: any) => {
                const date = moment(x.created_at, 'YYYY-MM-DD');
                let type = "";
                if (x.is_present === true) {
                    type = "green_calendar"
                }else if (x.remarks == "Half Day"){
                    type = "blue_calendar"
                }
                 else if (x.remarks === "Holiday") {
                    type = "red_calendar"
                } else if (x.is_present === false && date < today) {
                    type = "orange_calendar"
                }
                if (x.remarks === "leave") {
                    type = "violet_calendar"
                }
                let dataDict = {
                    "date": x.created_at,
                    "type": type
                }
                return dataDict

            })
            setUserData(test)
        }
    }
    const onAttendanceError = (err: any) => {
    }
    const [attendanceData, setAttendanceData] = useState<{ present: string, absent: string, leaves_remaining: number, leaves_utilized: number }>()
    const onLeaveSuccess = (res: any) => {
        setLeaveOptions({ ...leaveOptions, getApiEnabled: false })
        setAttendanceData({ present: res.data.present_days, absent: res.data.absent_days, leaves_remaining: res.data.leaves_remaining, leaves_utilized: res.data.leaves_utilized })
    }
    const onLeaveError = (err: any) => {
        console.log("err")
    }
    useGetLeaveDetails(leaveOptions, onLeaveSuccess, onLeaveSuccess)
    useGetAttendanceDetails(attendanceOptions, onAttendanceSuccess, onAttendanceError)
    const getNextRecentEvent = (events:any) => {
        const today = moment();
      
        // Parse the date strings into moment objects and filter future dates
        const futureEvents = events
          .map((event:any) => ({
            ...event,
            date: moment(event.date)
          }))
          .filter((event:any) => event.date.isSameOrAfter(today));
      
        // Sort events by date
        futureEvents.sort((a:any, b:any) => a.date - b.date);
      
        // Return the next recent event or null if none exist
        return futureEvents.length > 0 ? futureEvents[0] : {name:"",date:""};
      };
    const onEventSuccess = (res: any) => {

        if (eventOptions.type == "GET") {
            const nextEvent = getNextRecentEvent(res.data);
            setEvents(nextEvent)
        }
    }
    const navigate = useNavigate()
    const signOut = useSignOut()
    const [current, setCurrent] = useState<string>("")
    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
        setCurrent(e.key)
    };

    const [mySelfRoles, setMySelfRoles] = useState([{
        label: "My Attendance",
        key: "/user-attendance"
    },
    {
        label: "My Details",
        key: "/user-self"
    },
    {
        label: "My Leave Management",
        key: "/user-leaves"
    },
    {
        label: "Attendance Regularize",
        key: "/attendance-reg"
    },
    {
        label: "Advance",
        key: "/advance"
    },
    {
        label: "Resignation",
        key: "/resignation"
    }
    ])
    const myApplyFor: MenuProps['items'] = [
        {
            label: 'Apply For',
            key: 'self',
            children: [
                {
                    label: "My Leave Management",
                    key: "/user-leaves"
                },
                {
                    label: "Attendance Regularize",
                    key: "/attendance-reg"
                },
                {
                    label: "Advance",
                    key: "/advance"
                },
                {
                    label: "Resignation",
                    key: "/resignation"
                }
            ],
            icon: <UserOutlined />
        }
    ]
    const items: MenuProps['items'] = [
        {
            label: 'My Self',
            key: 'self',
            children: mySelfRoles,
            icon: <UserOutlined />
        },


    ]
    useEffect(() => {
        if (loggedInUserDetails.user_role === "Manager") {
            setMySelfRoles([...mySelfRoles,])
        }
        setEventOptions({ ...eventOptions, type: "GET", getApiEnabled: true })
    }, [])
    if (loggedInUserDetails.user_role === "HR") {
        items.push({
            label: 'Admin',
            key: 'admin',
            icon: <HomeOutlined />,
            children: [
                {
                    label: "User Details",
                    key: "/user-edit"
                },
                {
                    label: "Events",
                    key: "/events"
                },
                {
                    label: "Add User",
                    key: "/add-user"
                }, { label: "Attendance Summary Report", key: "/attendance-all" },
                { label: "User Logs", key: "/user-logs" },
                { label: "Offer Initiation", key: "/offer-initiation" }
            ]
        },)
        items.push(
            {
                label: 'My Team',
                key: 'approvals',
                icon: <SolutionOutlined />,
                children: [
                    { label: "Team Attendance", key: "/team-attendance" },{ label: "Pending Leave Approvals", key: "/leave-approvals" }, { label: "Pending Attendance Approvals", "key": "/attendance-approvals" }, { label: "Pending Resignation Approvals", "key": "/resignation-approvals" }
                ]
            }
        )
        items.push(
            {
                label: 'Reports',
                key: 'reports',
                icon: <BarChartOutlined />,
                children: [
                    { label: "Production Reports", key: "/reports" }
                ]
            }
        )
        items.push({
            label: 'IT Support',
            key: '/it-ticket',
            icon: <UserSwitchOutlined />
        })
    }
    if (loggedInUserDetails.user_role === "Manager") {
        items.push(
            {
                label: 'My Team',
                key: 'approvals',
                icon: <SolutionOutlined />,
                children: [
                    { label: "Pending Leave Approvals", key: "/leave-approvals" }, { label: "Pending Attendance Approvals", "key": "/attendance-approvals" }, { label: "Pending Resignation Approvals", "key": "/resignation-approvals" }
                ]
            }
        )
        items.push({
            label: 'IT Support',
            key: '/it-ticket',
            icon: <UserSwitchOutlined />
        })
    }
    if (loggedInUserDetails.user_role === "IT") {
        items.push({
            label: 'IT Support',
            key: '/it-ticket',
            icon: <UserSwitchOutlined />
        })
    }
    const cookieAllData = Cookies.get()
    const logoutFunction = () => {
        for (let key in cookieAllData) {
            Cookies.remove(key)
        }
        localStorage.clear();
        signOut()
        navigate('/')
    }
    const onSuccess = (res: AxiosResponse) => {
        setMySelfOptions({ ...mySelfOptions, getApiEnabled: false })
        if (res.status === 200) {
            setUserBasicDetails(res.data)
        } else {
            message.success("Invalid User Login")
        }
    }
    const onError = (err: AxiosError) => {
        setMySelfOptions({ ...mySelfOptions, getApiEnabled: false })
    }
    const loginFunction = () => {
        setOptions({ getApiEnabled: true, userEmail: loggedInUserDetails.user_email, type: "POST" })
    }
    const checkOutFunction = () => {
        setOptions({ getApiEnabled: true, userEmail: loggedInUserDetails.user_email, type: "PATCH" })
    }
    const goToAttendance = () => {
        navigate("/user-attendance")
    }
    useGetMeDetails(mySelfOptions, onSuccess, onError)
    const onLoginSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        if (!res.message) {
            message.success(res.data.message)
        } else {
            message.error("First Punch In")
        }

    }
    const onLoginError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
        message.success(err.data.message)
    }
    const getListData = (value: any) => {
        const dateStr = value.format('YYYY-MM-DD');
        return events.filter((event: any) => event.date === dateStr);
    };
    const { refetch } = useCreateAttendance(options, onLoginSuccess, onLoginError)
    const cellRender = (current: any, info: any) => {
        if (info.type === 'date') {
            const listData = getListData(current);
            return (
                <ul className="events">
                    {listData.map((item: any) => (
                        <li key={item.id}>
                            <span className={`event-dot ${item.event_type.toLowerCase()}`} />
                            <span className="event-text">{item.name}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return info.originNode;
    };
    const onEventError = (err: any) => {
        setEventOptions({ ...eventOptions, getApiEnabled: false })
    }
    const { } = useCreateorGetEvents(eventOptions, onEventSuccess, onEventError)
    const [value, onChange] = useState<Value>(new Date());
    const tileClassName = ({ date, view }: { date: Date, view: string }) => {
        if (userData.length) {
            const foundDate = userData.find((x: { date: any, type: string }) => x.date === moment(date).format('YYYY-MM-DD'));
            if (foundDate) {
                return foundDate.type;
            }
        }

        return '';
    };
    const twoColors: ProgressProps['strokeColor'] = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    const conicColors: ProgressProps['strokeColor'] = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7',
    };
    const [brliDataRaw, setBrliDataRaw] = useState<number[]>([0])
    const brliData = {
        labels: ["Production Report"],
        datasets: [
            {
                label: "Target",
                data: [100], // 20% of the total (represents 0.2 as 20%)
                backgroundColor: "#45B39D",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 20
            },
            {
                label: "Acheived",
                data: [90], // 10% of the total (represents 0.1 as 10%)
                backgroundColor: "#AF7AC5",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 20
            },
        ]
    };
    const optionss: any = {
        scales: {
            y: {
                max: 100,
                grid: {
                    display: false // Disable y grid lines
                },
                barPercentage: 1, // Adjust the width of bars
                categoryPercentage: 0.9 // Adjust the gap between bars
            },
            x: {
                grid: {
                    display: false // Disable x grid lines
                },
                barPercentage: 0.2, // Adjust the width of bars
                categoryPercentage: 1.2 // Adjust the gap between bars
            },
        },
        plugins: {
            datalabels: {
                display: true,
                color: 'white',
                align: 'center',
                anchor: 'center',
                font: {
                    weight: 'bold'
                },
                formatter: (value: any, context: any) => {
                    return value + '%'; // Display value with '%' symbol
                },
                clamp: true,
                offset: 8,
            }
        }
    };

    return (
        <>
            <Row gutter={16} className="mt-2 mb-3">
                <Col xs={24} sm={3} md={2}>
                    Logo
                </Col>
                <Col xs={24} sm={10} md={14}>
                    <h6><strong>RCS</strong></h6>
                </Col>
                <Col xs={24} sm={6} md={4}>
                    <span className="me-2">{userBasicDetails.location}</span>
                    <span>{currentDate}</span>
                </Col>
                <Col xs={24} sm={2} md={2}>
                    <span><NotificationOutlined /> Notifications</span>
                </Col>
                <Col xs={24} sm={3} md={2}>
                    <span className="logout" onClick={logoutFunction}><LogoutOutlined className="me-1" />Logout</span>
                </Col>
            </Row>
            <Row gutter={16} className="mt-4">
                <Col xs={24} sm={6} md={4} className="menu_column">
                    <Menu
                        className="new_menu"
                        theme="light"
                        onClick={onClick}
                        mode="inline"
                        items={items || []}
                    />
                </Col>
                <Col xs={24} sm={12} md={10} className="grey_bg">
                    <h4 style={{ textAlign: 'left', color: "#80BCBD" }}>Dashboard</h4>
                    <Row align="middle" className="attendance_data">
                        <Col span={8}>
                            Present Days: <strong>{attendanceData?.present}</strong>
                        </Col>
                        <Col span={8}>
                            Loss Of Pay: <strong>{attendanceData?.absent}</strong>
                        </Col>
                        <Col span={8}>
                            Leaves Remaining: <strong>{attendanceData?.leaves_remaining}</strong>
                        </Col>
                    </Row>

                    {loggedInUserDetails.user_role === "Employee" || loggedInUserDetails.user_role === "Manager" ? (
                        <>
                            <Row gutter={20} className="mt-4">
                                <Col xs={24} sm={12}>
                                    <h6>Production Report</h6>
                                    <div style={{ maxWidth: "400px", minHeight: "100px" }}>
                                        <Bar data={brliData} options={optionss} plugins={[ChartDataLabels]} />
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <h6>Quality Report</h6>
                                    <Progress type="dashboard" percent={95} strokeColor={twoColors} />
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={24}>
                                    <h5 className="mt-3" style={{ textAlign: 'left', color: "#FFC96F" }}>Score Card - 4</h5>
                                    <Row>
                                        <Col span={23}>
                                            <Steps
                                                current={3}
                                                progressDot
                                                items={[
                                                    { title: 'NI' },
                                                    { title: 'PME' },
                                                    { title: 'ME' },
                                                    { title: 'AE' },
                                                    { title: 'EE' },
                                                ]}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Row className="hr_score_card">
                            <Col span={24}>
                                <Card title="Score Card">
                                    <h4>Coming Soon......</h4>
                                </Card>
                            </Col>
                        </Row>
                    )}

                    <Row className="mt-4" gutter={16}>
                        <Col xs={24} sm={12}>
                            <Card title="Quick Links" style={{ textAlign: "left", minHeight: "220px" }}>
                                <ul>
                                    <li>Raise Ticket</li>
                                    <li>Raise Query</li>
                                    <li>Appraisal Rating</li>
                                </ul>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Card title="Wishes" style={{ textAlign: "left", minHeight: "220px" }}>
                                <ul>
                                    <li>Work Anniversary</li>
                                    <li>Birthday Wishes</li>
                                    <li>Promotion Wishes</li>
                                    <li>Wedding Anniversary</li>
                                </ul>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={6} md={5} className="grey_bg">
                    <Card title="Calendar">
                        <Calender
                            onChange={onChange}
                            value={value}
                            tileClassName={tileClassName}
                        />
                        <hr />
                        <span className="green"></span><span className="me-4">Present</span>
                        <span className="orange"></span><span className="me-4">Absent</span>
                        <span className="violet"></span><span>Leave</span><br />
                        <span className="red"></span><span className="me-4">Holiday</span>
                        <span className="blue"></span><span className="me-4">Half Day</span>
                    </Card>
                    <Card className="upcoming_events mt-2" title="Upcoming Events">
                        <h4>{events.name}</h4>
                        <h6>{moment(events.date).format('dddd Do MMMM, YYYY')}</h6>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={5}>
                    <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="mb-4" /><br />
                    <span className="user_det">{userBasicDetails.user_name}</span><br />
                    <span className="user_det">{userBasicDetails.designation}</span><br />
                    <span className="user_det">
                        <strong>My Profile / </strong>
                        <strong className="login_button" onClick={loginFunction}>Check-In</strong>
                        <strong> / </strong>
                        <strong className="login_button" onClick={checkOutFunction}>Check-Out</strong>
                    </span>
                    <span className="user_det">

                        <strong className="login_button" onClick={goToAttendance}>View Attendance</strong>
                    </span>
                    <hr />
                    <Row style={{ textAlign: 'left' }}>
                        <Col span={8}>
                            <span className="user_det">Employee ID :</span><br />
                            <span className="user_det">Department :</span><br />
                            <span className="user_det">Designation :</span><br />
                            <span className="user_det">Location :</span><br />
                            <span className="user_det">Reporting To :</span><br />
                            <span className="user_det">Shift :</span><br />
                            <span className="user_det">Leave Balance :</span><br />
                        </Col>
                        <Col span={16}>
                            <strong className="user_det">{userBasicDetails.empl_id}</strong><br />
                            <strong className="user_det">{userBasicDetails.department}</strong><br />
                            <strong className="user_det">{userBasicDetails.designation}</strong><br />
                            <strong className="user_det">{userBasicDetails.location}</strong><br />
                            <strong className="user_det">{userBasicDetails.reporting_to}</strong><br />
                            <strong className="user_det">{userBasicDetails.shift}</strong><br />
                            <strong className="user_det">{userBasicDetails.leaves_remaining}</strong><br />
                        </Col>
                    </Row>
                    <Menu
                        className={loggedInUserDetails.user_role === "Employee" ? "apply_for_menu" : loggedInUserDetails.user_role === "Manager" || loggedInUserDetails.user_role === "HR" ? "apply_for_menu" : "apply_for_menu"}
                        theme="light"
                        onClick={onClick}
                        mode="inline"
                        items={myApplyFor || []}
                    />
                </Col>
            </Row>
        </>

    )
}
export default NewDashBoard;