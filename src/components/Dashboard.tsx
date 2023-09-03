import { Card, Col, Row } from "antd";
import TopMenu from "./TopMenu";

const Dashboard = () => {
    return (
        <>
            <TopMenu />
            <Row>
                <Col span={18}>

                </Col>
                <Col>
                    <span>Hi <strong>N. Ravi Teja Reddy</strong></span>
                    <Card className="mt-3" title="My Details">
                        <Row>
                            <Col>                                
                                <h6 style={{ textAlign: "left" }}><span>Leaves utilized :<strong>1</strong></span></h6>
                                <h6 style={{ textAlign: "left" }}><span>Number of days present :<strong>4</strong></span></h6>
                                <h6 style={{ textAlign: "left" }}><span>Leaves remaining :<strong>8</strong></span></h6>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Dashboard;