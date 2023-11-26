import { Col, Row } from "antd"
import TopMenu from "../TopMenu"

const OrganizationDetails = ()=>{
    return<>
        <TopMenu></TopMenu>
        <Row gutter={16}>
            <Col>
            <h4 className="m-2">Organization Related Details</h4>
            </Col>
        </Row>
    </>
}
export default OrganizationDetails