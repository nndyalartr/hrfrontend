import { Col, Row } from "antd";
import axios from "axios";
import TopMenu from "./TopMenu";

const UserPage =()=>{
    // axios({})
    return(
        <>
        <TopMenu/> 
            <Row>
                <Col span={18}>

                </Col>
                <Col>
                    <span>Name : <strong>N. Ravi Teja Reddy</strong></span>
                </Col>
            </Row>
        </>
    )
}
export default UserPage;