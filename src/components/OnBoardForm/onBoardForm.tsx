import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Row, Col, Tabs } from 'antd';
import { useLocation } from 'react-router-dom';
import DocumentsUploadPage from './DocumentsUploadPage';
import PersonelIdDetails from './PersonelIdDetails';
import BasicDetailsUploadPage from './BasicDetailsPage';
import BankDetailsPage from './BankDetailsPage';
import EducationDetailsPage from './EducationDetailsPage';
import PreviousEmpDetails from './PreviousEmpDetails';
const { TabPane } = Tabs;
const OnBoardForm = () => {
    const [name,setName] = useState<string>("")
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let id = searchParams.get('id');
    if(!id){
        id = ""
    }
    const [activeTabKey, setActiveTabKey] = useState("1");

    const switchTab = (key: string) => {
        setActiveTabKey(key);
    }
   
    return (<>
        <div className='m-4'>
            <Tabs tabPosition="left" activeKey={activeTabKey} onChange={setActiveTabKey}>
                <TabPane tab="Documents" key="1">
                    <DocumentsUploadPage setActiveTabKey={setActiveTabKey} id={id}  setName={setName} name={name}/>
                </TabPane>   
                <TabPane tab="Basic Details" key="2">
                    <BasicDetailsUploadPage setActiveTabKey={setActiveTabKey} id={id} name={name}/>
                </TabPane>                
                <TabPane tab="Personel Id Details" key="3">
                    <PersonelIdDetails setActiveTabKey={setActiveTabKey} id={id} name={name}/>
                </TabPane>
                <TabPane tab="Bank Details" key="4">
                    <BankDetailsPage setActiveTabKey={setActiveTabKey} id={id} name={name}/>
                </TabPane>
                <TabPane tab="Education Details" key="5">
                    <EducationDetailsPage setActiveTabKey={setActiveTabKey} id={id} name={name}/>
                </TabPane>
                <TabPane tab="Previous Employment Details" key="6">
                    <PreviousEmpDetails setActiveTabKey={setActiveTabKey} id={id} name={name}/>
                </TabPane>
            </Tabs>
            
        </div>
    </>)
}
export default OnBoardForm