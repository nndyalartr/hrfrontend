import React from 'react'
import './LoginPage.stytle.css'

import { Col, Row } from 'antd';
import LoginFormComponent from './LoginFormComponent';
const LoginPage = () => {
    return <div className="login_page">
        <Row className="login_page_main_titile">
            <span>
                RC Services
            </span>
        </Row>
        <Row className="login_page_wraper">

            <Col className='login_page_wraper_left' span={12}>
                <div className="login_page_wraper_left_logo">
                    <img src="/assets/logo-no-background.png" width={250} height={250} alt="RC Services" className='img-fluid' />

                </div>

            </Col>
            <Col className='login_page_wraper_right' span={12}>
                <div className="login_page_wraper_form w-100">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <span className='login_page_wraper_form_title'> Please login to your account</span>
                        </Col>
                        <Col span={24}>
                            <LoginFormComponent />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>


    </div>
}

export default LoginPage;



















// import React from 'react'
// import './LoginPage.stytle.css'
// const LoginPage = () => {
//     return <div className="wrapper">
//         <div className="logo">
//             <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />
//         </div>
//         <div className="text-center mt-4 name">
//             Twitter
//         </div>
//         <form className="p-3 mt-3">
//             <div className="form-field d-flex align-items-center">
//                 <span className="far fa-user"></span>
//                 <input type="text" name="userName" id="userName" placeholder="Username" />
//             </div>
//             <div className="form-field d-flex align-items-center">
//                 <span className="fas fa-key"></span>
//                 <input type="password" name="password" id="pwd" placeholder="Password" />
//             </div>
//             <button className="btn mt-3">Login</button>
//         </form>
//         <div className="text-center fs-6">
//             <a href="#">Forget password?</a> or <a href="#">Sign up</a>
//         </div>
//     </div>
// }

// export default LoginPage