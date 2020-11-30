import { Drawer, IconButton } from '@material-ui/core'
import { useState } from 'react'
import { AiOutlineMenu, AiFillSetting } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import logo_truong from '../../assets/logo_noname.png'
import Sidebar from './sidebar'

const Appbar = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false)

    return (
        <div className="appbar">
            <IconButton id="toggle-button" onClick={() => setSidebarToggle(!sidebarToggle)}>
                <AiOutlineMenu />
            </IconButton>
            <Link to="/">
                <img src={logo_truong} alt="logo" height="50px" className="mx-3" />
            </Link>
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