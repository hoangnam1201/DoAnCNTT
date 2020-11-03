import { Drawer, IconButton } from '@material-ui/core'
import { useState } from 'react'
import { AiOutlineMenu, AiFillSetting } from 'react-icons/ai'
import logo_truong from '../../../assets/logo_187px.png'
import Sidebar from './sidebar'

const Appbar = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false)

    return (
        <div className="appbar">
            <IconButton onClick={() => setSidebarToggle(!sidebarToggle)}>
                <AiOutlineMenu />
            </IconButton>
            <div>
                <img height="60px" src={logo_truong} alt="logo" />
            </div>
            <div>
                <IconButton>
                    <AiFillSetting />
                </IconButton>
            </div>
            <Drawer open={sidebarToggle} onClose={() => setSidebarToggle(false)}>
                <Sidebar close={() => setSidebarToggle(false)} />
            </Drawer>
        </div>
    )
}

export default Appbar