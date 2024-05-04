import { Col, Row } from "antd"
import TopMenu from "../TopMenu"
import logo from './logo.svg';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';
import BrliReports from "./BrliComponent";
import "./productionreport.css"
import BrliProductionReports from "./BrliProductionReports";
const { TabPane } = Tabs;
function ProductionReportsPage() {
    return (
        <div className="bg">
            <TopMenu />
            <Tabs tabPosition="left">
                <TabPane tab="BRLI" key="1">
                    <BrliReports />
                </TabPane>
                <TabPane tab="BRLI New" key="2">
                    <BrliProductionReports />
                </TabPane>
                <TabPane tab="ENVISION" key="3">
                    <BrliReports />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default ProductionReportsPage;
