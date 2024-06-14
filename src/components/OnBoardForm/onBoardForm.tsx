import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Row, Col, Tabs } from 'antd';
import { useLocation } from 'react-router-dom';
import DocumentsUploadPage from './DocumentsUploadPage';
import PersonelIdDetails from './PersonelIdDetails';
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
                <TabPane tab="Personel Id Details" key="2">
                    <PersonelIdDetails setActiveTabKey={setActiveTabKey} name={name}/>
                </TabPane>
            </Tabs>
            
        </div>
    </>)
}
export default OnBoardForm