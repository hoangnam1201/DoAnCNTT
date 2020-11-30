import { Button, TextField } from '@material-ui/core'
import styled from 'styled-components'
import logo_truong from '../../assets/logo-truong-name.png'

const Hr = styled.hr`
    margin: 40px 0;
`

const LoginPage = () => {
    return <div className="login-page">
        <div className="container-md p-0 h-100">
            <form className="login-form col-12 col-xl-4 col-lg-5 col-md-6 col-sm-6">
                <img alt="logo truong" src={logo_truong} width="100%" />
                <Hr />
                <h5 className='text-center primary-logo-color font-weight-bold'>
                    TRANG QUẢN LÝ MÔN HỌC
                </h5>
                <small className="d-block sub-logo-color text-center">
                    Khoa Công nghệ thông tin
                </small>
                <h6 className='mt-5'>Thông tin đăng nhập:</h6>
                <TextField className='w-100 mt-3' label="Tài khoản" />
                <TextField className='w-100 mt-3' label="Mặt khẩu" />
                <Button className="mt-4" variant="contained" color="primary">
                    Đăng nhập
                    </Button>
                <Hr />
                <footer className="text-center">
                    <small>©2020 Đại học Sư Phạm Kỹ Thuật thành phố Hồ Chí Minh</small>
                </footer>
            </form>
        </div>
    </div>
}

export default LoginPage