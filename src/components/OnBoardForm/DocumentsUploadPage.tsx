import React, { useEffect, useState } from 'react';
import { UploadOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, message, Upload, Row, Col, Tabs } from 'antd';
import "./onboard.css"
import useGetAllFiles from '../../QueryApiCalls/useGetAllFiles';
import { AxiosError, AxiosResponse } from 'axios';
interface Props {
    setActiveTabKey: (key: string) => void;
    id: string,
    setName : (name:string)=>void;
    name:string
}
const DocumentsUploadPage: React.FC<Props> = ({ setActiveTabKey, setName,name, id }) => {
    const mandatoryFields = ["resume", "photo", "PAN", "AADHAR", "passbook", "tenthmarks", "twelth", "underGraduation"]
    
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<{ getApiEnabled: boolean, id: string }>({ getApiEnabled: false, id: id })
    const [files, setFiles] = useState<any>({
        resume: null,
        photo: null,
        PAN: null,
        AADHAR: null,
        passbook: null,
        tenthmarks: null,
        twelth: null,
        underGraduation: null
    });
    useEffect(() => {
        setOptions({ ...options, getApiEnabled: true })
    }, [])
    const onSuccess = (res: AxiosResponse) => {
        if (res.status === 200) {
            setName(res.data.name)
            const allPresent = mandatoryFields.every((item:string) => res.data.data.includes(item));
            if(allPresent){
                setIsComplete(true)
            }
            setUploadedFiles(res.data.data)
        } else {
            message.error("Something Went Wrong")
        }
    }
    const onError = (err: AxiosError) => {
        message.error("Something Went Wrong")
    }
    useGetAllFiles(options, onSuccess, onError)
    const handleUpload = (name: string) => {
        const formData = new FormData();
        let is_valid = false
        Object.keys(files).forEach(key => {
            if (files[key]) {
                formData.append(key, files[key]);
                is_valid = true
            }
        });
        setIsLoading(true)
        if (is_valid) {
            formData.append("id", id)
            formData.append("file_name", name)
            // Send formData to your backend API endpoint using fetch or Axios
            fetch('http://127.0.0.1:8000/test/', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        return response.json(); // parse the JSON from the response
                    } else {
                        throw new Error('Failed to upload files'); // handle the error
                    }
                })
                .then(data => {
                    setUploadedFiles(data.data);
                    setName(data.name)
                    const allPresent = mandatoryFields.every((item:string) => data.data.includes(item));
                    if(allPresent){
                        setIsComplete(true)
                    }
                    message.success('Files uploaded successfully');
                    setIsLoading(false)
                })
                .catch(error => {
                    message.error(`Upload failed: ${error.message}`);
                    setIsLoading(false)
                });
        } else {
            setIsLoading(false)
            message.error("Please Upload a file")
        }

    };
    console.log(isLoading)
    return (<>
        <div>
            <h5 className='text_left'>Hi {name} , Upload Documents</h5>
            <Row gutter={16} className='m-4'>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Row gutter={12}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, resume: file });
                                    return false;
                                }}
                                fileList={files.resume ? [files.resume] : []}
                            >
                                <Button className='ms-3 me-3'>Select Resume<span className='red_clr'>*</span></Button>
                            </Upload></Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {uploadedFiles.includes("resume") ? <span className='green_tik'><CheckOutlined /> Uploaded</span>:<Button onClick={() => handleUpload("resume")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>}</Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Row gutter={12}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}><Upload
                            beforeUpload={(file) => {
                                setFiles({ ...files, photo: file });
                                return false;
                            }}
                            fileList={files.photo ? [files.photo] : []}
                        >
                            <Button className='ms-3 me-3' >Select Photo<span className='red_clr'>*</span></Button>

                        </Upload></Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Button onClick={() => handleUpload("photo")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("photo") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Row gutter={12}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, PAN: file });
                                    return false;
                                }}
                                fileList={files.PAN ? [files.PAN] : []}
                            >
                                <Button className='ms-3 me-3' >Select PAN Card<span className='red_clr'>*</span></Button>

                            </Upload>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Button onClick={() => handleUpload("PAN")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("PAN") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>
                </Col>

            </Row>
            <Row gutter={16} className='m-4'>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, AADHAR: file });
                                    return false;
                                }}
                                fileList={files.AADHAR ? [files.AADHAR] : []}
                            >
                                <Button className='ms-3 me-3'>Select AADHAR Card<span className='red_clr'>*</span></Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("AADHAR")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("AADHAR") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, passbook: file });
                                    return false;
                                }}
                                fileList={files.passbook ? [files.passbook] : []}
                            >
                                <Button className='me-1'>Select Passbook / Cheque<span className='red_clr'>*</span></Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("passbook")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("passbook") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, tenthmarks: file });
                                    return false;
                                }}
                                fileList={files.tenthmarks ? [files.tenthmarks] : []}
                            >
                                <Button className='ms-3 me-3' >Select 10th marks Sheet<span className='red_clr'>*</span></Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("tenthmarks")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("tenthmarks") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>


                </Col>
            </Row>
            <Row gutter={16} className='m-4'>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, twelth: file });
                                    return false;
                                }}
                                fileList={files.twelth ? [files.twelth] : []}
                            >
                                <Button className='ms-3 me-3' >Select 12th Marks Sheet<span className='red_clr'>*</span></Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("twelth")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("twelth") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>


                </Col>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, underGraduation: file });
                                    return false;
                                }}
                                fileList={files.underGraduation ? [files.underGraduation] : []}
                            >
                                <Button className='ms-3 me-3' >Select UG Marks Sheet<span className='red_clr'>*</span></Button>
                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("underGraduation")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("underGraduation") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>

                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, reliving: file });
                                    return false;
                                }}
                                fileList={files.reliving ? [files.reliving] : []}
                            >
                                <Button className='ms-3 me-3'>Select Reliving Letter</Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("reliving")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("reliving") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>


                </Col>
            </Row>
            <Row gutter={16} className='m-4'>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, paySlips: file });
                                    return false;
                                }}
                                fileList={files.paySlips ? [files.paySlips] : []}
                            >
                                <Button className='ms-3 me-3'>Select Last 3 Month Payslips</Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("paySlips")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("paySlips") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, expCert: file });
                                    return false;
                                }}
                                fileList={files.expCert ? [files.expCert] : []}
                            >
                                <Button className='ms-3 me-3'>Select Experience Letter</Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("expCert")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("expCert") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, pg: file });
                                    return false;
                                }}
                                fileList={files.pg ? [files.pg] : []}
                            >
                                <Button className='ms-3 me-3'>Select PG Marks Sheet</Button>
                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("pg")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("pg") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={16} className='m-4'>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, driving: file });
                                    return false;
                                }}
                                fileList={files.driving ? [files.driving] : []}
                            >
                                <Button className='ms-3 me-3'>Select Driving License</Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("driving")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("driving") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, passport: file });
                                    return false;
                                }}
                                fileList={files.passport ? [files.passport] : []}
                            >
                                <Button className='ms-3 me-3'>Select Passport</Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("passport")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("passport") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>


                </Col>
                <Col span={8}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Upload
                                beforeUpload={(file) => {
                                    setFiles({ ...files, technical: file });
                                    return false;
                                }}
                                fileList={files.technical ? [files.technical] : []}
                            >
                                <Button className='ms-3 me-3'>Select Any Technical Course</Button>

                            </Upload>
                        </Col>
                        <Col span={12}>
                            <Button onClick={() => handleUpload("technical")} icon={<UploadOutlined />} disabled={isLoading}>Upload</Button>
                            {uploadedFiles.includes("technical") && <span className='green_tik'><CheckOutlined /> Uploaded</span>}
                        </Col>
                    </Row>
                </Col>
            </Row>
            {!isComplete?<h5 className='warning'>Not All Mandatory Files Are uploaded</h5>:<h5 className='text_left'>All Mandatory Fields are uploaded <Button onClick={()=>setActiveTabKey("2")}>Click for next form</Button> </h5>}
        </div>
    </>)
}
export default DocumentsUploadPage