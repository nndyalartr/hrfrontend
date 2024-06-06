import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Row, Col } from 'antd';
const OnBoardForm = () => {
    const [files, setFiles] = useState<any>({
        marks10th: null,
        marksInter: null,
        otherPDF: null,
        additionalFile: null,
    });
    const handleUpload = () => {
        const formData = new FormData();
        Object.keys(files).forEach(key => {
            if (files[key]) {
                formData.append(key, files[key]);
            }
        });
        // Send formData to your backend API endpoint using fetch or Axios
        fetch('http://35.154.66.101/:8000/api/curie/test/', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                // Handle response
                console.log(response);
                message.success('Files uploaded successfully');
            })
            .catch(error => {
                // Handle error
                console.error('Error uploading files:', error);
                message.error('File upload failed');
            });
    };
    return (<>
        <div className='m-4'>
            <Row gutter={16}>
                <Col span={6}>
                    <Upload
                        beforeUpload={(file) => {
                            setFiles({ ...files, marks10th: file });
                            return false;
                        }}
                        fileList={files.marks10th ? [files.marks10th] : []}
                    >
                        Please Upload Marks List 
                        <Button className='ms-3' icon={<UploadOutlined />}>10th Marks Sheet</Button>
                    </Upload>
                </Col>
                <Col span={6}>
                    <Upload
                        beforeUpload={(file) => {
                            setFiles({ ...files, marksInter: file });
                            return false;
                        }}
                        fileList={files.marksInter ? [files.marksInter] : []}
                    >
                        Please Upload Marks List
                        <Button className='ms-3' icon={<UploadOutlined />}>Inter Marks Sheet</Button>
                    </Upload>
                </Col>
                <Col span={6}>
                    <Upload
                        beforeUpload={(file) => {
                            setFiles({ ...files, otherPDF: file });
                            return false;
                        }}
                        fileList={files.otherPDF ? [files.otherPDF] : []}
                    >
                        Please Upload AADHAR Card
                        <Button className='ms-3' icon={<UploadOutlined />}>AADHAR</Button>
                    </Upload>
                </Col>
                <Col span={6}>
                    <Upload
                        beforeUpload={(file) => {
                            setFiles({ ...files, additionalFile: file });
                            return false;
                        }}
                        fileList={files.additionalFile ? [files.additionalFile] : []}
                    >
                        Please Upload PAN
                        <Button className='ms-3' icon={<UploadOutlined />}>PAN</Button>
                    </Upload>
                </Col>
            </Row>
            <Button className='mt-4' type="primary" onClick={handleUpload}>Confirm</Button>
        </div>
    </>)
}
export default OnBoardForm