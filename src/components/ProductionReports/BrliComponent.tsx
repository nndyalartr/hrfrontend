import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
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
import { Bar, Line } from "react-chartjs-2"
import { useState } from 'react';
import { BRLIDATA } from './data';
ChartJS.register(
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
)
function BrliReports() {
    const [filterForm] = Form.useForm()
    const [brliTargetDataRaw, setBrliTargetDataRaw] = useState<number[]>([BRLIDATA.March.targetVsAchieved.target.creditBalence, BRLIDATA.March.targetVsAchieved.target.dataEntry, BRLIDATA.March.targetVsAchieved.target.paymentPosting])
    const [brliAchievedDataRaw, setBrliAchievedDataRaw] = useState<number[]>([BRLIDATA.March.targetVsAchieved.achieved.creditBalence, BRLIDATA.March.targetVsAchieved.achieved.dataEntry, BRLIDATA.March.targetVsAchieved.achieved.paymentPosting])
    const [productionSlaMet, setproductionSlaMet] = useState<number[]>([BRLIDATA.March.productionSlaMetNotMet.met.creditBalence, BRLIDATA.March.productionSlaMetNotMet.met.dataEntry, BRLIDATA.March.productionSlaMetNotMet.met.paymentPosting])
    const [productionSlaNotMet, setproductionSlaNotMet] = useState<number[]>([BRLIDATA.March.productionSlaMetNotMet.notMet.creditBalence, BRLIDATA.March.productionSlaMetNotMet.notMet.dataEntry, BRLIDATA.March.productionSlaMetNotMet.notMet.paymentPosting])
    const [audit, setaudit] = useState<number[]>([BRLIDATA.March.auditVsErrors.audit.creditBalence, BRLIDATA.March.auditVsErrors.audit.dataEntry, BRLIDATA.March.auditVsErrors.audit.paymentPosting])
    const [auditErrors, setauditErrors] = useState<number[]>([BRLIDATA.March.auditVsErrors.errors.creditBalence, BRLIDATA.March.auditVsErrors.errors.dataEntry, BRLIDATA.March.auditVsErrors.errors.paymentPosting])
    const [qualitySlaMet, setqualitySlaMet] = useState<number[]>([BRLIDATA.March.qualitySlaMetNotMet.met.creditBalence, BRLIDATA.March.qualitySlaMetNotMet.met.dataEntry, BRLIDATA.March.qualitySlaMetNotMet.met.paymentPosting])
    const [qualitySlaNotMet, setqualitySlaNotMet] = useState<number[]>([BRLIDATA.March.qualitySlaMetNotMet.notMet.creditBalence, BRLIDATA.March.qualitySlaMetNotMet.notMet.dataEntry, BRLIDATA.March.qualitySlaMetNotMet.notMet.paymentPosting])
    const [brliDataRaw, setBrliDataRaw] = useState<number[]>([BRLIDATA.March.productionByProcess.creditBalence, BRLIDATA.March.productionByProcess.dataEntry, BRLIDATA.March.productionByProcess.paymentPosting])
    const [accuracyByProcess, setaccuracyByProcess] = useState<number[]>([BRLIDATA.March.accuracyByProcess.creditBalence, BRLIDATA.March.accuracyByProcess.dataEntry, BRLIDATA.March.accuracyByProcess.paymentPosting])
    const [mainData, setMainData] = useState<any>(BRLIDATA.March.mainData)
    const brliQAData = {
        labels: ["Payment Posting", "AR", "Charge Entry"],
        datasets: [
            {
                label: 'Target',
                backgroundColor: '#566573',
                data: brliTargetDataRaw // Example data for no of tested for each process name
            },
            {
                label: 'Achieved',
                backgroundColor: '#CA6F1E',
                data: brliAchievedDataRaw // Example data for no of errors for each process name
            }
        ]
    };
    const productionSlaData = {
        labels: ["Credit Balence", "Data Entry", "Payment Posting"],
        datasets: [
            {
                label: 'Met',
                backgroundColor: '#1A5276',
                data: productionSlaMet // Example data for no of tested for each process name
            },
            {
                label: 'Not Met',
                backgroundColor: '#EB984E ',
                data: productionSlaNotMet // Example data for no of errors for each process name
            }
        ]
    };
    const qualitySlaData = {
        labels: ["Credit Balence", "Data Entry", "Payment Posting"],
        datasets: [
            {
                label: 'Met',
                backgroundColor: '#1A5276',
                data: qualitySlaMet // Example data for no of tested for each process name
            },
            {
                label: 'Not Met',
                backgroundColor: '#EB984E ',
                data: qualitySlaNotMet // Example data for no of errors for each process name
            }
        ]
    };
    // Calculate the percentage values dynamically based on the total
    const brliData = {
        labels: ["BRLI Production Report"],
        datasets: [
            {
                label: "Credit Balence",
                data: [brliDataRaw[0]], // 20% of the total (represents 0.2 as 20%)
                backgroundColor: "#45B39D",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 20
            },
            {
                label: "Data Entry",
                data: [brliDataRaw[1]], // 10% of the total (represents 0.1 as 10%)
                backgroundColor: "#AF7AC5",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 20
            },
            {
                label: "Payment Posting",
                data: [brliDataRaw[2]], // 30% of the total (represents 0.3 as 30%)
                backgroundColor: "#2980B9",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 20
            }
        ]
    };
    const accuracyByProcessData = {
        labels: ["Accuracy By Process"],
        datasets: [
            {
                label: "Credit Balence",
                data: [accuracyByProcess[0]], // 20% of the total (represents 0.2 as 20%)
                backgroundColor: "#45B39D",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 20
            },
            {
                label: "Data Entry",
                data: [accuracyByProcess[1]], // 10% of the total (represents 0.1 as 10%)
                backgroundColor: "#AF7AC5",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 20
            },
            {
                label: "Payment Posting",
                data: [accuracyByProcess[2]], // 30% of the total (represents 0.3 as 30%)
                backgroundColor: "#2980B9",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 20
            }
        ]
    };

    const achevedProduction: any = {
        scales: {
            x: {
                grid: {
                    display: false // Disable x grid lines
                }
            },
            y: {
                grid: {
                    display: false // Disable y grid lines
                }
            }
        },
        plugins: {
            datalabels: {
                display: true,
                color: 'white',
                align: 'center',
                anchor: 'center', // Position labels at the end of each bar
                font: {
                    weight: 'bold'
                },
                formatter: (value: any, context: any) => {
                    return value; // Display value with '%' symbol
                },
                clamp: true, // Ensure labels are fully visible
                offset: 8,
            }
        }
    };
    const options: any = {
        scales: {
            y: {
                max: 100,
                grid: {
                    display: false // Disable y grid lines
                } // Set the maximum value of the y-axis to 100
            },
            x: {
                grid: {
                    display: false // Disable y grid lines
                } // Set the maximum value of the y-axis to 100
            },
        },
        plugins: {
            datalabels: {
                display: true,
                color: 'white',
                align: 'center',
                anchor: 'center', // Position labels at the end of each bar
                font: {
                    weight: 'bold'
                },
                formatter: (value: any, context: any) => {
                    return value + '%'; // Display value with '%' symbol
                },
                clamp: true, // Ensure labels are fully visible
                offset: 8,
            }
        }
    };
    const prductionSlaMetOptions: any = {
        indexAxis: 'y',
        scales: {
            y: {
                max: 100,
                grid: {
                    display: false // Disable y grid lines
                } // Set the maximum value of the y-axis to 100
            },
            x: {
                grid: {
                    display: false // Disable y grid lines
                } // Set the maximum value of the y-axis to 100
            },
        },
        plugins: {
            datalabels: {
                display: true,
                color: 'white',
                align: 'center',
                anchor: 'center', // Position labels at the end of each bar
                font: {
                    weight: 'bold'
                },
                formatter: (value: any, context: any) => {
                    return value + '%'; // Display value with '%' symbol
                },
                clamp: true, // Ensure labels are fully visible
                offset: 8,
            }
        }
    };
    const yearOptions = [{ "lable": "2024", "key": "2024", "value": "2024"}]
    const monthOptions = [{ "lable": "January", "key": "JAN", "value": "January" }, { "lable": "February", "key": "FEB", "value": "February" }, { "lable": "March", "key": "March", "value": "March" }]
    const filterSearch = (values: any) => {
        if (values.Month === "January") {
            setBrliTargetDataRaw([BRLIDATA.January.targetVsAchieved.target.creditBalence, BRLIDATA.January.targetVsAchieved.target.dataEntry, BRLIDATA.January.targetVsAchieved.target.paymentPosting])
            setBrliAchievedDataRaw([BRLIDATA.January.targetVsAchieved.achieved.creditBalence, BRLIDATA.January.targetVsAchieved.achieved.dataEntry, BRLIDATA.January.targetVsAchieved.achieved.paymentPosting])
            setproductionSlaMet([BRLIDATA.January.productionSlaMetNotMet.met.creditBalence, BRLIDATA.January.productionSlaMetNotMet.met.dataEntry, BRLIDATA.January.productionSlaMetNotMet.met.paymentPosting])
            setproductionSlaNotMet([BRLIDATA.January.productionSlaMetNotMet.notMet.creditBalence, BRLIDATA.January.productionSlaMetNotMet.notMet.dataEntry, BRLIDATA.January.productionSlaMetNotMet.notMet.paymentPosting])
            setaudit([BRLIDATA.January.auditVsErrors.audit.creditBalence, BRLIDATA.January.auditVsErrors.audit.dataEntry, BRLIDATA.January.auditVsErrors.audit.paymentPosting])
            setauditErrors([BRLIDATA.January.auditVsErrors.errors.creditBalence, BRLIDATA.January.auditVsErrors.errors.dataEntry, BRLIDATA.January.auditVsErrors.errors.paymentPosting])
            setqualitySlaMet([BRLIDATA.January.qualitySlaMetNotMet.met.creditBalence, BRLIDATA.January.qualitySlaMetNotMet.met.dataEntry, BRLIDATA.January.qualitySlaMetNotMet.met.paymentPosting])
            setqualitySlaNotMet([BRLIDATA.January.qualitySlaMetNotMet.notMet.creditBalence, BRLIDATA.January.qualitySlaMetNotMet.notMet.dataEntry, BRLIDATA.January.qualitySlaMetNotMet.notMet.paymentPosting])
            setBrliDataRaw([BRLIDATA.January.productionByProcess.creditBalence, BRLIDATA.January.productionByProcess.dataEntry, BRLIDATA.January.productionByProcess.paymentPosting])
            setaccuracyByProcess([BRLIDATA.January.accuracyByProcess.creditBalence, BRLIDATA.January.accuracyByProcess.dataEntry, BRLIDATA.January.accuracyByProcess.paymentPosting])
            setMainData(BRLIDATA.January.mainData)
        }
        if (values.Month === "February") {
            setBrliTargetDataRaw([BRLIDATA.February.targetVsAchieved.target.creditBalence, BRLIDATA.February.targetVsAchieved.target.dataEntry, BRLIDATA.February.targetVsAchieved.target.paymentPosting])
            setBrliAchievedDataRaw([BRLIDATA.February.targetVsAchieved.achieved.creditBalence, BRLIDATA.February.targetVsAchieved.achieved.dataEntry, BRLIDATA.February.targetVsAchieved.achieved.paymentPosting])
            setproductionSlaMet([BRLIDATA.February.productionSlaMetNotMet.met.creditBalence, BRLIDATA.February.productionSlaMetNotMet.met.dataEntry, BRLIDATA.February.productionSlaMetNotMet.met.paymentPosting])
            setproductionSlaNotMet([BRLIDATA.February.productionSlaMetNotMet.notMet.creditBalence, BRLIDATA.February.productionSlaMetNotMet.notMet.dataEntry, BRLIDATA.February.productionSlaMetNotMet.notMet.paymentPosting])
            setaudit([BRLIDATA.February.auditVsErrors.audit.creditBalence, BRLIDATA.February.auditVsErrors.audit.dataEntry, BRLIDATA.February.auditVsErrors.audit.paymentPosting])
            setauditErrors([BRLIDATA.February.auditVsErrors.errors.creditBalence, BRLIDATA.February.auditVsErrors.errors.dataEntry, BRLIDATA.February.auditVsErrors.errors.paymentPosting])
            setqualitySlaMet([BRLIDATA.February.qualitySlaMetNotMet.met.creditBalence, BRLIDATA.February.qualitySlaMetNotMet.met.dataEntry, BRLIDATA.February.qualitySlaMetNotMet.met.paymentPosting])
            setqualitySlaNotMet([BRLIDATA.February.qualitySlaMetNotMet.notMet.creditBalence, BRLIDATA.February.qualitySlaMetNotMet.notMet.dataEntry, BRLIDATA.February.qualitySlaMetNotMet.notMet.paymentPosting])
            setBrliDataRaw([BRLIDATA.February.productionByProcess.creditBalence, BRLIDATA.February.productionByProcess.dataEntry, BRLIDATA.February.productionByProcess.paymentPosting])
            setaccuracyByProcess([BRLIDATA.February.accuracyByProcess.creditBalence, BRLIDATA.February.accuracyByProcess.dataEntry, BRLIDATA.February.accuracyByProcess.paymentPosting])
            setMainData(BRLIDATA.February.mainData)
        }
        if (values.Month === "March") {
            setBrliTargetDataRaw([BRLIDATA.March.targetVsAchieved.target.creditBalence, BRLIDATA.March.targetVsAchieved.target.dataEntry, BRLIDATA.March.targetVsAchieved.target.paymentPosting])
            setBrliAchievedDataRaw([BRLIDATA.March.targetVsAchieved.achieved.creditBalence, BRLIDATA.March.targetVsAchieved.achieved.dataEntry, BRLIDATA.March.targetVsAchieved.achieved.paymentPosting])
            setproductionSlaMet([BRLIDATA.March.productionSlaMetNotMet.met.creditBalence, BRLIDATA.March.productionSlaMetNotMet.met.dataEntry, BRLIDATA.March.productionSlaMetNotMet.met.paymentPosting])
            setproductionSlaNotMet([BRLIDATA.March.productionSlaMetNotMet.notMet.creditBalence, BRLIDATA.March.productionSlaMetNotMet.notMet.dataEntry, BRLIDATA.March.productionSlaMetNotMet.notMet.paymentPosting])
            setaudit([BRLIDATA.March.auditVsErrors.audit.creditBalence, BRLIDATA.March.auditVsErrors.audit.dataEntry, BRLIDATA.March.auditVsErrors.audit.paymentPosting])
            setauditErrors([BRLIDATA.March.auditVsErrors.errors.creditBalence, BRLIDATA.March.auditVsErrors.errors.dataEntry, BRLIDATA.March.auditVsErrors.errors.paymentPosting])
            setqualitySlaMet([BRLIDATA.March.qualitySlaMetNotMet.met.creditBalence, BRLIDATA.March.qualitySlaMetNotMet.met.dataEntry, BRLIDATA.March.qualitySlaMetNotMet.met.paymentPosting])
            setqualitySlaNotMet([BRLIDATA.March.qualitySlaMetNotMet.notMet.creditBalence, BRLIDATA.March.qualitySlaMetNotMet.notMet.dataEntry, BRLIDATA.March.qualitySlaMetNotMet.notMet.paymentPosting])
            setBrliDataRaw([BRLIDATA.March.productionByProcess.creditBalence, BRLIDATA.March.productionByProcess.dataEntry, BRLIDATA.March.productionByProcess.paymentPosting])
            setaccuracyByProcess([BRLIDATA.March.accuracyByProcess.creditBalence, BRLIDATA.March.accuracyByProcess.dataEntry, BRLIDATA.March.accuracyByProcess.paymentPosting])
            setMainData(BRLIDATA.March.mainData)
        } else {
            setBrliTargetDataRaw([1800, 3000, 1356])
            setBrliAchievedDataRaw([1500, 2540, 1100])
            setBrliDataRaw([56, 98, 78])
        }
    }
    const auditVsErrorsData: any = {
        labels: ["Payment Posting", "Data Entry", "Credit Balence"],
        datasets: [
            {
                type: 'line',
                label: 'Errors',
                data: auditErrors,
                fill: false,
                borderColor: '#E74C3C',
                borderWidth: 1,
                yAxisID: 'y1'
            },
            {
                type: 'bar',
                label: 'Audit',
                data: audit,
                backgroundColor: "#1F618D ",
                borderColor: "black",
                borderWidth: 0,
            }
        ]
    };

    const auditVsErrorsOptions: any = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                position: 'left', // Position Y-axis on the left side
                min: 0, // Set the minimum value of the Y-axis for bars
                max: 100, // Set the maximum value of the Y-axis for bars
                grid: {
                    display: false
                },
                ticks: {
                    callback: function (value: any, index: any, values: any) {
                        return value + '%';
                    }
                }
            },
            y1: {
                position: 'right', // Position Y-axis on the right side
                min: 0, // Set the minimum value of the Y-axis for errors
                max: 1.5, // Set the maximum value of the Y-axis for errors
                grid: {
                    display: false
                },
                ticks: {
                    color: "#E74C3C",
                    callback: function (value: any, index: any, values: any) {

                        return value; // You can format the error values here if needed
                    }
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            datalabels: {
                display: true,
                color: 'white',
                align: 'center',
                anchor: 'left',
                font: {
                    weight: 'bold'
                },
                formatter: (value: any, context: any) => {
                    return value + "%";
                },
                clamp: true,
                offset: 8
            }
        }
    };

    return (
        <div className='mt-4'>
            <Form
                className=""
                form={filterForm}
                onFinish={filterSearch}
                initialValues={{ "Year": 2024, "Month": "March" }}
            >
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item name="Year" label="Select Year" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Year" options={yearOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="Month" label="Select Month" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Month" options={monthOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button htmlType="submit" type="primary">Submit</Button>
                    </Col>

                </Row>
            </Form>
            <Row gutter={16} justify="space-between" className='mb-4'>
                <Col>
                    <div className='prod_count'>
                        <span>Production</span><br></br><span>{mainData.production}</span>
                    </div>
                </Col>
                <Col>
                    <div className='prod_count'>
                        <span>Achieved %</span><br></br><span>{mainData.achieved}</span>
                    </div>
                </Col>
                <Col>
                    <div className='prod_count'>
                        <span>Audited </span><br></br><span>{mainData.audited}</span>
                    </div>
                </Col>
                <Col>
                    <div className='prod_count'>
                        <span>Audit % </span><br></br><span>{mainData.audit}</span>
                    </div>
                </Col>
                <Col>
                    <div className='prod_count'>
                        <span>Errors % </span><br></br><span>{mainData.errors}</span>
                    </div>
                </Col>
                <Col>
                    <div className='prod_count'>
                        <span>Users </span><br></br><span>{mainData.users}</span>
                    </div>
                </Col>
                <Col span={3}></Col>
            </Row>
            <Row>
                <Col span={12}>
                    <h6>Production By Process</h6>
                    <div style={{ maxWidth: "500px" }}>
                        <Bar
                            data={brliData}
                            options={options}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </Col>
                <Col span={12}>

                    <h6>Target VS Achieved</h6>
                    <div style={{ maxWidth: "500px" }}>
                        <Bar
                            data={brliQAData}
                            options={achevedProduction}
                            plugins={[ChartDataLabels]}
                        />
                    </div>

                </Col>
            </Row>
            <Row gutter={16} className='mt-4'>

                <Col span={12}>
                    <h6>Production SLA Met And Not Met</h6>
                    <div style={{ maxWidth: "500px" }}>
                        <Bar
                            data={productionSlaData}
                            options={prductionSlaMetOptions}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </Col>
                <Col span={12}>

                    <h6>Quality SLA Met And Not Met</h6>
                    <div style={{ maxWidth: "500px" }}>
                        <Bar
                            data={qualitySlaData}
                            options={prductionSlaMetOptions}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={16} className='mt-3'>
                <Col span={12}>
                    <h6>Audit VS Errors</h6>
                    <div style={{ maxWidth: "500px", minHeight: "240px" }}>
                        <Bar
                            data={auditVsErrorsData}
                            options={auditVsErrorsOptions}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <h6>Accuracy By Process</h6>
                    <div style={{ maxWidth: "500px" }}>
                        <Bar
                            data={accuracyByProcessData}
                            options={options}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </Col>

            </Row>



        </div>
    )
}
export default BrliReports