import { Button, Divider, Paper } from "@material-ui/core"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import styled from "styled-components"
import { updateCourse } from "../../../services"
import { LoadingOverlay } from "../../StatelessComponents"
import ContentRow from './contentRow'

const Header = styled.h2`
    font-weight:700;
    font-size:17px;
    margin-bottom:0;
`

const ContentContainer = styled.div`
    min-width:500px;
`

const boMonParser = {
    "Tin học cơ sở": "thcs",
    "Công nghệ phần mềm": "cnpm",
    "Hệ thống thông tin": "httt",
    "Mạng và an ninh mạng": "manm"
}

const CourseInfo = ({ course, fetch }) => {
    const [edit, setEdit] = useState(false)
    const [update, setUpdate] = useState(false)
    const [tenmh, setTenmh] = useState(course.tenmh)
    const [sotinchi, setSotinchi] = useState(course.sotinchi)
    const [bomon, setBomon] = useState(course.bomon)
    const [phanloai, setPhanloai] = useState(course.phanloai)
    const [mota, setMota] = useState(course.mota)

    const handleCloseEdit = () => {
        setTenmh(course.tenmh)
        setSotinchi(course.sotinchi)
        setBomon(course.bomon)
        setPhanloai(course.phanloai)
        setMota(course.mota)
        setEdit(false)
    }

    const handleSubmitEdit = async () => {
        setUpdate(true)
        updateCourse(course.mamh, {
            tenmh, sotinchi, phanloai, mota,
            mabomon: boMonParser[bomon]
        })
            .then(() => {
                alert("Chỉnh sửa môn học thành công!")
                window.location.reload()
            })
            .catch(err => {
                alert(err)
                console.log(err.response)
                setUpdate(false)
            })
    }

    return (
        <Paper className="position-relative">
            {update && <LoadingOverlay />}
            <div className="px-3 py-2 d-flex flex-wrap align-items-center justify-content-between">
                <Header>
                    Tổng quan môn học
                </Header>
                {edit
                    ? (
                        <div>
                            <Button
                                className="text-transform-none"
                                onClick={handleSubmitEdit}
                                variant="contained"
                                color="primary"
                            >
                                Sửa
                            </Button>
                            <Button
                                className="text-transform-none ml-2"
                                onClick={handleCloseEdit}
                                variant="contained"
                            >
                                Đóng
                            </Button>
                        </div>
                    )
                    : (
                        <Button
                            className="text-transform-none"
                            onClick={() => setEdit(true)}
                        >
                            Chỉnh sửa&nbsp;<AiOutlineEdit size="17px" />
                        </Button>
                    )
                }
            </div>
            <Divider />
            <div style={{ overflowX: "auto" }}>
                <ContentContainer className="px-5 pt-3 pb-2">
                    <ContentRow
                        label="Mã môn học"
                        content={course.mamh}
                    />
                    <ContentRow
                        label="Tên môn học"
                        content={tenmh}
                        edit={edit}
                        handle={setTenmh}
                    />
                    <ContentRow
                        label="Số tín chỉ"
                        content={sotinchi}
                        edit={edit}
                        handle={setSotinchi}
                        number
                    />
                    <ContentRow
                        label="Bộ môn"
                        content={bomon}
                        edit={edit}
                        handle={setBomon}
                        select
                    />
                    <ContentRow
                        label="Phân loại"
                        content={phanloai}
                        edit={edit}
                        handle={setPhanloai}
                        select
                    />
                    <ContentRow
                        label="Mô tả"
                        content={mota}
                        edit={edit}
                        handle={setMota}
                        multiline
                    />
                </ContentContainer>
            </div>
        </Paper>
    )
}

export default CourseInfo