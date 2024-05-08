import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
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
import { useEffect, useState } from 'react';
import { BRLIDATA } from './data';
import { AxiosError, AxiosResponse } from 'axios';
import { ProdReportsGet } from '../../interfaces/types';
import useGetProdReports from '../../QueryApiCalls/useGetProdReports';
ChartJS.register(
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
)
function BrliProductionReports() {
    const [filterForm] = Form.useForm()
    const [brliTargetDataRaw, setBrliTargetDataRaw] = useState<number[]>([0])
    const [brliAchievedDataRaw, setBrliAchievedDataRaw] = useState<number[]>([0])
    const [productionSlaMet, setproductionSlaMet] = useState<number[]>([0])
    const [productionSlaNotMet, setproductionSlaNotMet] = useState<number[]>([0])
    const [audit, setaudit] = useState<number[]>([0])
    const [auditErrors, setauditErrors] = useState<number[]>([0])
    const [qualitySlaMet, setqualitySlaMet] = useState<number[]>([0])
    const [qualitySlaNotMet, setqualitySlaNotMet] = useState<number[]>([0])
    const [brliDataRaw, setBrliDataRaw] = useState<number[]>([0])
    const [accuracyByProcess, setaccuracyByProcess] = useState<number[]>([0])
    const [mainData, setMainData] = useState<any>(BRLIDATA.March.mainData)
    const [fetchApiOptions, setFetchApiOptions] = useState<ProdReportsGet>({ client: "BRLI", getApiEnabled: false, month: "March", year: "2024", shift: "Day" })
    const brliQAData = {
        labels: ["Data Entry"],
        datasets: [
            {
                label: 'Target',
                backgroundColor: '#566573',
                // barThickness: 50, 
                data: brliTargetDataRaw // Example data for no of tested for each process name
            },
            {
                label: 'Achieved',
                backgroundColor: '#CA6F1E',
                // barThickness: 50, 
                data: brliAchievedDataRaw // Example data for no of errors for each process name
            }
        ]
    };
    const productionSlaData = {
        labels: ["Data Entry"],
        datasets: [
            {
                label: 'Met',
                backgroundColor: '#1A5276',
                // barThickness: 50, 
                data: productionSlaMet // Example data for no of tested for each process name
            },
            {
                label: 'Not Met',
                backgroundColor: '#EB984E ',
                // barThickness: 50, 
                data: productionSlaNotMet // Example data for no of errors for each process name
            }
        ]
    };
    const qualitySlaData = {
        labels: ["Data Entry"],
        datasets: [
            {
                label: 'Met',
                backgroundColor: '#1A5276',
                // barThickness: 50, 
                data: qualitySlaMet // Example data for no of tested for each process name
            },
            {
                label: 'Not Met',
                backgroundColor: '#EB984E ',
                // barThickness: 50, 
                data: qualitySlaNotMet // Example data for no of errors for each process name
            }
        ]
    };
    // Calculate the percentage values dynamically based on the total
    const brliData = {
        labels: ["BRLI Production Report"],
        datasets: [
            {
                label: "Data Entry",
                data: [brliDataRaw[0]], // 10% of the total (represents 0.1 as 10%)
                backgroundColor: "#AF7AC5",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 50
            }
        ]
    };
    const accuracyByProcessData = {
        labels: ["Accuracy By Process"],
        datasets: [
            {
                label: "Data Entry",
                data: [accuracyByProcess[0]], // 10% of the total (represents 0.1 as 10%)
                backgroundColor: "#AF7AC5",
                borderColor: "black",
                borderWidth: 0,
                // barThickness: 50
                // barThickness: 20
            }
        ]
    };

    const achevedProduction: any = {
        scales: {
            x: {
                barPercentage: 0.8, // Adjust the width of bars
                categoryPercentage: 0.9, // Adjust the gap between bars
                grid: {
                    display: false // Disable x grid lines
                }
            },
            y: {
                barPercentage: 0.8, // Adjust the width of bars
                categoryPercentage: 0.9, // Adjust the gap between bars
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
            },
            barPercentage:1, // Adjust the width of bars
            categoryPercentage: 0.9 // Adjust the gap between bars
          },
          x: {
            grid: {
              display: false // Disable x grid lines
            },
            barPercentage: 0.2, // Adjust the width of bars
            categoryPercentage: 0.9 // Adjust the gap between bars
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
      
    const prductionSlaMetOptions: any = {
        indexAxis: 'y',
        scales: {
            y: {
                max: 100,
                categoryPercentage: 0.6,
                grid: {                    
                    display: false // Disable y grid lines
                } // Set the maximum value of the y-axis to 100
            },
            x: {
                categoryPercentage: 0.6,
                grid: {
                    display: false, // Disable y grid lines
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
    const yearOptions = [{ "lable": "2024", "key": "2024", "value": "2024" }]
    const monthOptions = [{ "lable": "January", "key": "JAN", "value": "January" }, { "lable": "February", "key": "FEB", "value": "February" }, { "lable": "March", "key": "March", "value": "March" }]
    const shiftOptions = [{ "lable": "All", "key": "All", "value": "All" }, { "lable": "Day", "key": "Day", "value": "Day" }, { "lable": "Night", "key": "Night", "value": "Night" }]
    const filterSearch = (values: any) => {
        setFetchApiOptions({...fetchApiOptions,getApiEnabled:true, year:values.Year, month:values.Month, shift:values.Shift})
    }
    const auditVsErrorsData: any = {
        labels: ["Data Entry"],
        datasets: [
            {
                type: 'line',
                label: 'Errors',
                data: auditErrors,
                fill: false,
                borderColor: '#E74C3C',
                // barThickness: 50, 
                borderWidth: 1,
                yAxisID: 'y1'
            },
            {
                type: 'bar',
                label: 'Audit',
                data: audit,
                backgroundColor: "#1F618D ",
                // barThickness: 50, 
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
                barPercentage: 0.8,
                categoryPercentage: 0.6,
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
                barPercentage: 0.8,
                categoryPercentage: 0.6,
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
                barPercentage: 0.8,
                categoryPercentage: 0.6,
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
    useEffect(()=>{
        setFetchApiOptions({...fetchApiOptions,getApiEnabled:true})
    },[])
    const onSuccess = (res: AxiosResponse) => {
        setFetchApiOptions({...fetchApiOptions,getApiEnabled:false})
        if (res.status === 200){
            setBrliTargetDataRaw([res.data.report.targetVsAchieved.target.dataEntry])
            setBrliAchievedDataRaw([res.data.report.targetVsAchieved.achieved.dataEntry])
            setproductionSlaMet([res.data.report.productionSlaMetNotMet.met.dataEntry])
            setproductionSlaNotMet([res.data.report.productionSlaMetNotMet.notMet.dataEntry])
            setaudit([res.data.report.auditVsErrors.audit.dataEntry])
            setauditErrors([res.data.report.auditVsErrors.errors.dataEntry])
            setqualitySlaMet([res.data.report.qualitySlaMetNotMet.met.dataEntry])
            setqualitySlaNotMet([res.data.report.qualitySlaMetNotMet.notMet.dataEntry])
            setBrliDataRaw([res.data.report.productionByProcess.dataEntry])
            setaccuracyByProcess([res.data.report.accuracyByProcess.dataEntry])
            setMainData(res.data.report.mainData)
        }else{
            message.error("No Data Founf For This Combination")
        }
    }
    const onError = (err: AxiosError) => {
        setFetchApiOptions({...fetchApiOptions,getApiEnabled:false})
    }
    useGetProdReports(fetchApiOptions, onSuccess, onError)
    return (
        <div className='mt-4'>
            <Form
                className=""
                form={filterForm}
                onFinish={filterSearch}
                initialValues={{ "Year": 2024, "Month": "March", "Shift": "All" }}
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
                    <Col span={6}>
                        <Form.Item name="Shift" label="Select Shift" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Shift" options={shiftOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button htmlType="submit" type="primary">Submit</Button>
                    </Col>

                </Row>
            </Form>
            <Row gutter={16} justify="space-between" className='mb-4 me-4'>
                <Col>
                    <div className='prod_count'>
                        <span>Production</span><br></br><span>{mainData.production}</span>
                    </div>
                </Col>
                <Col>
                    <div className='prod_count'>
                        <span>Target</span><br></br><span>{mainData.target}</span>
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
                {/* <Col span={3}></Col> */}
            </Row>
            <Row>
                <Col span={8}>
                    <h6>Production By Process</h6>
                    <div style={{ maxWidth: "400px" }}>
                        <Bar
                            data={brliData}
                            options={options}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </Col>
                <Col span={8}>

                    <h6>Target VS Achieved</h6>
                    <div style={{ maxWidth: "400px" }}>
                        <Bar
                            data={brliQAData}
                            options={achevedProduction}
                            plugins={[ChartDataLabels]}
                        />
                    </div>

                </Col>
                <Col span={8}>
                    <h6>Production SLA Met And Not Met</h6>
                    <div style={{ maxWidth: "400px" }}>
                        <Bar
                            data={productionSlaData}
                            options={prductionSlaMetOptions}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={16} className='mt-4'>

                
                <Col span={8}>

                    <h6>Quality SLA Met And Not Met</h6>
                    <div style={{ maxWidth: "400px" }}>
                        <Bar
                            data={qualitySlaData}
                            options={prductionSlaMetOptions}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <h6>Audit VS Errors</h6>
                    <div style={{ maxWidth: "400px", minHeight: "240px" }}>
                        <Bar
                            data={auditVsErrorsData}
                            options={auditVsErrorsOptions}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <h6>Accuracy By Process</h6>
                    <div style={{ maxWidth: "400px" }}>
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
export default BrliProductionReports