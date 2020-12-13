import { Button, IconButton, Input, InputAdornment, Popover, Tooltip } from '@material-ui/core'
import { useState } from 'react'
import { BiFilter, BiSearch } from 'react-icons/bi'
import { IoMdRefresh } from 'react-icons/io'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const InputLabel = styled.label`
    font-size: 13px;
    font-weight:bold;
`

const Select = styled.select`
&:focus{
     outline:none;
     box-shadow:none;
 }
 font-size:13px;
 border-radius:10px;
`
const Title = styled.p`
    font-size:20px;
    font-weight:bold;
`

const FilterBar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const initialFilter = props.initialFilter
    const filter = props.filter
    const setFilter = props.setFilter
    const [sotinchi, setSotinchi] = useState('')
    const [bomon, setBomon] = useState('')
    const [phanloai, setPhanloai] = useState('')

    const handleFilterClick = e => {
        setAnchorEl(e.currentTarget)
        setSotinchi(filter.sotinchi)
        setBomon(filter.bomon)
        setPhanloai(filter.phanloai)
    }
    return <div
        style={{ minWidth: "920px" }}
        className="d-flex pl-2 justify-content-between align-items-center"
    >
        <div className="d-flex align-items-center">
            <Input
                disableUnderline
                placeholder="Tên môn học"
                startAdornment={
                    <InputAdornment position="start">
                        <BiSearch />
                    </InputAdornment>
                }
                className="form-control rounded-pill"
                value={filter.tenmh}
                onChange={e => setFilter({ ...filter, tenmh: e.target.value })}
            />
            <button
                onClick={handleFilterClick}
                className="btn text-secondary p-0 ml-2"
            >
                <BiFilter size="35px" />
            </button>
            <Popover
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
            >
                <div style={{ width: "300px" }} className="py-2 px-3">
                    <Title className="border-bottom">Bộ lọc</Title>
                    <div className="border-bottom">
                        <div className="mb-2">
                            <InputLabel>Số tín chỉ</InputLabel>
                            <Select
                                className='bg-light form-control'
                                value={sotinchi}
                                onChange={e => setSotinchi(e.target.value)}
                            >
                                <option selected value="">Tất cả</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Select>
                        </div>
                        <div className="mb-2">
                            <InputLabel>Bộ môn</InputLabel>
                            <Select
                                className='bg-light form-control'
                                value={bomon}
                                onChange={e => setBomon(e.target.value)}
                            >
                                <option selected value="">Tất cả</option>
                                <option>Tin học cơ sở</option>
                                <option>Công nghệ phần mềm</option>
                                <option>Hệ thống thông tin</option>
                                <option>Mạng và an ninh mạng</option>
                            </Select>
                        </div>
                        <div className="mb-2">
                            <InputLabel>Phân loại</InputLabel>
                            <Select
                                className='bg-light form-control'
                                value={phanloai}
                                onChange={e => setPhanloai(e.target.value)}
                            >
                                <option selected value="">Tất cả</option>
                                <option>Tùy chọn</option>
                                <option>Bắt buộc</option>
                            </Select>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setFilter({
                                    ...filter,
                                    sotinchi,
                                    bomon,
                                    phanloai
                                })
                                setAnchorEl(null)
                            }}
                        >
                            Áp dụng
                        </Button>
                        <Button
                            className="ml-2 text-danger"
                            onClick={() => {
                                setFilter(initialFilter)
                                setAnchorEl(null)
                                setSotinchi('')
                                setBomon('')
                                setPhanloai('')
                            }}
                        >
                            Phục hồi
                        </Button>
                        <Button onClick={() => setAnchorEl(null)}
                            className="ml-2">
                            Đóng
                        </Button>
                    </div>
                </div>
            </Popover>
        </div>
        <div>
            <Button variant="contained" color="primary"
                className="light-blue-bgcolor my-2">
                <Link color="inherit" className="link-unstyled" to="/course/create">
                    Tạo môn học
            </Link>
            </Button>
            <Tooltip title="Tải lại">
                <IconButton onClick={props.refresh} className="p-2 mx-2">
                    <IoMdRefresh size="25px" />
                </IconButton>
            </Tooltip>
        </div>
    </div>
}

export default FilterBar