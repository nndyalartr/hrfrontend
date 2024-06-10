import { useEffect, useState, useRef } from "react"
import TopMenu from "../TopMenu"
import useGetUserTimeLogs from "../../QueryApiCalls/useGetUserTimeLogs"
import { UserInfoStore } from "../../utils/useUserInfoStore"
// import Chart from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { Button, Col, DatePicker, Form, Row, Select, Table, message } from "antd";
import useUserOptionList from "../../QueryApiCalls/useUserOptionList";
import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
const UserDailyLogs = () => {
    const [userLogs] = Form.useForm()
    const loggedInUserDetails = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string, type: string, logsDate: string }>({ getApiEnabled: false, userEmail: "", type: "", logsDate: "" })
    const [apiOptions, setaApiOptions] = useState<{ getApiEnabled: boolean, userEmail: string, type: string }>({ getApiEnabled: false, userEmail: "", type: "" })
    const [logs, setLogs] = useState<any>([])
    const chartContainer = useRef<any>(null);
    const chartInstance = useRef<any>(null);
    const [userOptions, setuserOptions] = useState<any>([])
    const [totalTime, setTotalTime] = useState<{ totalActiveTime: string, totalLockTime: string, userName: string }>({ totalActiveTime: "", totalLockTime: "", userName: "" })
    useEffect(() => {
        setaApiOptions({ ...options, getApiEnabled: true })
    }, [])
    function formatDuration(minutes: number) {
        if (typeof minutes !== 'number' || isNaN(minutes)) {
            return 'Invalid input';
        }

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours === 0) {
            return `${remainingMinutes} Minutes`;
        } else if (remainingMinutes === 0) {
            return `${hours} Hr`;
        } else {
            return `${hours} Hr ${remainingMinutes} Minutes`;
        }
    }
    const durationInMinutes = 100;
    const formattedDuration = formatDuration(durationInMinutes);
    const onLogsSuccess = (res: any) => {
        setLogs(res.data.logs_data)
        let totalActiveTimeMap = 0
        setOptions({ ...options, getApiEnabled: false })
        if (res.data && res.data.logs_data.length) {
            res.data.logs_data.forEach((x: any) => {
                totalActiveTimeMap += parseInt(x.duration)
            })
            totalActiveTimeMap = totalActiveTimeMap / 60
            let pp = totalActiveTimeMap.toFixed(2)
            setTotalTime({ ...totalTime, userName: res.data.user_name, totalActiveTime: formatDuration(parseInt(pp)) })

        } else {
            setTotalTime({ ...totalTime, userName: "", totalActiveTime: "" })
            setLogs([])
            message.error("No Logs For this User")
        }


    }
    useEffect(() => {
        Chart.register(...registerables); // Register necessary components (if using Chart.js v3)

        if (logs && logs.length > 0 && chartContainer.current) {
            if (chartInstance.current) {
                // Destroy the previous chart instance if it exists
                chartInstance.current.destroy();
            }

            const ctx = chartContainer.current.getContext('2d');

            const chartData = {
                labels: logs.map((item: any) => item.application),
                datasets: [{
                    data: logs.map((item: any) => item.duration),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        // Add more colors if needed
                    ],
                }],
            };

            // Create a new chart instance
            chartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    // Add other chart options if needed
                },
            });
        }else{
            if (chartInstance.current) {
                // Destroy the previous chart instance if it exists
                chartInstance.current.destroy();
            }
        }
    }, [logs])

    const onLogsError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
        console.log("err")
    }
    const { refetch } = useGetUserTimeLogs(options, onLogsSuccess, onLogsError)
    const onUserOptionsSuccess = (response: AxiosResponse) => {
        setuserOptions(response.data)
    }
    const onUserOptionsFailure = (err: AxiosError) => {

    }
    useUserOptionList(apiOptions, onUserOptionsSuccess, onUserOptionsFailure)
    const columns = [
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
            render: (duration: string) => {
                let minutes = parseInt(duration) / 60
                let minutesTotal = minutes.toFixed(2)
                let final = formatDuration(parseInt(minutesTotal))
                return (
                    <span>{final} </span>
                )
            }
        },
        {
            title: "Application Name",
            dataIndex: "application",
            key: "application",
        }
    ]

    const checkLogs = (values: any) => {
        let logDate = moment(values.date.$d).format("YYYY-MM-DD")
        setOptions({ ...options, getApiEnabled: true, userEmail: values.user, logsDate: logDate })
    }
    return <>
        {/* <TopMenu /> */}
        <Form
            className=""
            form={userLogs}
            onFinish={checkLogs}
        >
            <h4>Check User Logs</h4>
            <Row gutter={8} className="ms-2 me-2">
                <Col span={8}>
                    <Form.Item name="user" label="User" rules={[{ required: true }]}>
                        <Select placeholder="Please Select Type" options={userOptions} showSearch filterOption={(input, option: any) => {
                            return (option.label.toLowerCase().includes(input.toLowerCase()))
                        }} />
                    </Form.Item>

                </Col>
                <Col span={6}>
                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                        <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select log Date" />
                    </Form.Item>
                </Col>
                <Col><Button htmlType="submit">Submit</Button></Col>
            </Row>

        </Form>
        <Row gutter={16}>
            <Col span={12}>
                <h6>User Name : {totalTime.userName}</h6>
                <h6>Active Time :- {totalTime.totalActiveTime}</h6>
                <Table rowKey={(record: any) => record} dataSource={logs || []} columns={columns} scroll={{ x: 'max-content' }}/>
            </Col>
            <Col span={12}>
                <div>
                    <canvas ref={chartContainer} width="400" height="400" />
                </div>
            </Col>
        </Row>


    </>
}
export default UserDailyLogs