import { Card, Menu, MenuProps, theme } from "antd";
import TopMenu from "./TopMenu";
import { useEffect, useState } from "react";

import useGetLeaveDetails from "../QueryApiCalls/useGetLeaveDetails";
import { UserInfoStore } from "../utils/useUserInfoStore";
import { useNavigate } from "react-router-dom";
import useCreateorGetEvents from "../QueryApiCalls/useEventDetails";
import { Events } from "../interfaces/types";
import './dashboard.css'
import { Calendar, Badge } from 'antd';
import moment from 'moment';
import { Container, Col, Row } from "react-bootstrap";

const Dashboard = () => {
    const loggedInUserDetails = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string }>({ getApiEnabled: false, userEmail: "" })
    const [eventOptions, setEventOptions] = useState<Events>({ date: "", type: "", getApiEnabled: false, name: "", shift: "", eventType: "" })
    const [events, setEvents] = useState<any>([])
    useEffect(() => {
        setOptions({ userEmail: loggedInUserDetails.user_email, getApiEnabled: true })
        setEventOptions({ ...eventOptions, type: "GET", getApiEnabled: true })

    }, [])
    const [attendanceData, setAttendanceData] = useState<{ present: string, absent: string, leaves_remaining: number, leaves_utilized: number }>()
    const onSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        setAttendanceData({ present: res.data.present_days, absent: res.data.absent_days, leaves_remaining: res.data.leaves_remaining, leaves_utilized: res.data.leaves_utilized })
    }
    const onError = (err: any) => {
        console.log("err")
    }
    const { refetch } = useGetLeaveDetails(options, onSuccess, onError)
    const navigate = useNavigate()
    const [current, setCurrent] = useState<string>("")
    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
        setCurrent(e.key)
    };

    const [eventCalender, setEventCalender] = useState<any>({ jan: [], feb: [], mar: [], april: [], may: [], june: [], july: [], aug: [], sep: [], oct: [], nov: [], dec: [] })
    const onEventSuccess = (res: any) => {

        if (eventOptions.type == "GET") {
            setEvents(res.data)
            if (res.data.length) {
                const januaryDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 0; // January is month 0
                });
                const febDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 1; // January is month 0
                });
                const marchDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 2; // January is month 0
                });
                const aprilDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 3; // January is month 0
                });
                const mayDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 4; // January is month 0
                });
                const juneDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 5; // January is month 0
                });
                const julyDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 6; // January is month 0
                });
                const augDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 7; // January is month 0
                });
                const sepDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 8; // January is month 0
                });
                const octDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 9; // January is month 0
                });
                const novDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 10; // January is month 0
                });
                const decDates = res.data.filter((item: any) => {
                    const dateObject = new Date(item.date);
                    return dateObject.getMonth() === 11; // January is month 0
                });
                setEventCalender({
                    jan: januaryDates,
                    feb: febDates,
                    mar: marchDates,
                    april: aprilDates,
                    may: mayDates, june: juneDates,
                    july: julyDates, aug: augDates,
                    sep: sepDates, oct: octDates, nov: novDates, dec: decDates
                })

            }
        }
        setEventOptions({ ...eventOptions, type: "", getApiEnabled: false })

    }
    const onEventError = (err: any) => {
        setEventOptions({ ...eventOptions, getApiEnabled: false })
        console.log("err")
    }
    const { } = useCreateorGetEvents(eventOptions, onEventSuccess, onEventError)
    const items: MenuProps['items'] = [
        {
            label: 'HR Policies',
            key: '/hrpolicy',
        },
        {
            label: 'Events',
            key: '/events',
        },
        {
            label: 'My Organization',
            key: '/about-Org',
        },
        {
            label: 'My Leaves',
            key: '/user-leaves',
        },
        {
            label: 'My Details',
            key: '/user-self',
        },
    ]
    const getListData = (value: any) => {
        const dateStr = value.format('YYYY-MM-DD');
        return events.filter((event: any) => event.date === dateStr);
    };

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
    const background: string = loggedInUserDetails.user_role == "Employee" ? "bg" : loggedInUserDetails.user_role == "Manager" || "HR" ? "bg_manager" : "bg"
    const { token } = theme.useToken();
    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        // borderRadius: token.borderRadiusLG,
        backgroundColor: "transparent"
    };
    return (
        <div className={background}>
            <TopMenu />
            <Container fluid style={{ margin: 0, padding: 0 }}>
                <Row justify="space-between" align='top'>
                    <Col xs={12} sm={6} md={4} lg={2} className="p-0 float-start">
                        <Menu className="card_new" theme="light" style={{ textAlign: 'left' }} onClick={onClick} mode="inline" items={items || []} />

                    </Col>
                    <Col lg={1} md={1}></Col>
                    <Col xs={12} sm={16} md={7} lg={9} className="p-0 float-end">
                        <Card size="small" style={{ maxWidth: "370px", backgroundColor: 'transparent', border: 'none' }} className={loggedInUserDetails.user_role == "Executive" ? "float-end card_executive p-0" : loggedInUserDetails.user_role == "Manager" ? "float-end card_manager p-0" : "float-end card p-0"} title="My Details">
                            <Row>
                                <Col>
                                    <h6 style={{ textAlign: "left" }}><span>LOP  :<strong>{attendanceData?.absent}</strong></span></h6>
                                    <h6 style={{ textAlign: "left" }}><span>Number of days present :<strong>{attendanceData?.present}</strong></span></h6>
                                    <h6 style={{ textAlign: "left" }}><span>Leaves remaining :<strong>{attendanceData?.leaves_remaining}</strong></span></h6>
                                    <h6 style={{ textAlign: "left" }}><span>Leaves Utilized :<strong>{attendanceData?.leaves_utilized}</strong></span></h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card className="mt-5" size="small" title="Events Calender" style={{ maxWidth: "400px", backgroundColor: 'transparent', border: 'none' }}>
                                        <span className="green"></span><span className="me-4">Holiday</span>
                                        <span className="orange"></span><span>Event</span>
                                        <div className="mt-3" style={wrapperStyle}>
                                            <Calendar fullscreen={false} className="custom-calendar" cellRender={cellRender} />
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                {/* <Row className="mt-2">
                    <Col span={6}>
                        <Card size="small" className="m-1 january" title="January">
                            {eventCalender.jan.length ? <div >
                                {eventCalender.jan.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </div> : <p>No Events</p>}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small" className="m-1 february" title="February">
                            {eventCalender.feb.length ? <>
                                {eventCalender.feb.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small" className="m-1 march" title={<span style={{ color: "white" }}>March</span>}>
                            {eventCalender.mar.length ? <>
                                {eventCalender.mar.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small" className="m-1 april" title={<span style={{ color: "white" }}>April</span>}>
                            {eventCalender.april.length ? <>
                                {eventCalender.april.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col span={6}>
                        <Card size="small" className="m-1 may" title="May">
                            {eventCalender.may.length ? <>
                                {eventCalender.may.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small" className="m-1 june" title={<span style={{ color: "white" }}>June</span>}>
                            {eventCalender.june.length ? <>
                                {eventCalender.june.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small" className="m-1 july" title="July">
                            {eventCalender.july.length ? <>
                                {eventCalender.july.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small" className="m-1 august" title="August">
                            {eventCalender.aug.length ? <>
                                {eventCalender.aug.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col span={6}>
                        <Card size="small" className="m-1 september" title={<span style={{ color: "white" }}>September</span>}>
                            {eventCalender.sep.length ? <>
                                {eventCalender.sep.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small" className="m-1 october" title="October">
                            {eventCalender.oct.length ? <>
                                {eventCalender.oct.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small" className="m-1 november" title={<span style={{ color: "white" }}>November</span>}>
                            {eventCalender.nov.length ? <>
                                {eventCalender.nov.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card size="small" className="m-1 december" title={<span style={{ color: "red" }}>December</span>}>
                            {eventCalender.dec.length ? <>
                                {eventCalender.dec.map((x: any) => {
                                    return (<div key={Math.random()}>
                                        <p>{x.date} - {x.event_type} :- {x.name}</p>
                                    </div>)
                                })}
                            </> : <p>No Events</p>}
                        </Card>
                    </Col>
                </Row> */}
            </Container>

        </div>
    )
}
export default Dashboard;