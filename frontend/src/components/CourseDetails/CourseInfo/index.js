import { Button, Divider, Paper } from "@material-ui/core"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import styled from "styled-components"
import { updateCourse } from "../../../services"
import ContentRow from './contentRow'
import EditForm from "./editForm"

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

const CourseInfo = ({ course }) => {
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tenmh, setTenmh] = useState(course.tenmh)
    const [sotinchi, setSotinchi] = useState(course.sotinchi)
    const [bomon, setBomon] = useState(course.bomon)
    const [phanloai, setPhanloai] = useState(course.phanloai)
    const [mota, setMota] = useState(course.mota)

    const handleToggleEdit = () => {
        setTenmh(course.tenmh)
        setSotinchi(course.sotinchi)
        setBomon(course.bomon)
        setPhanloai(course.phanloai)
        setMota(course.mota)
        setEdit(true)
    }

    const handleSubmitEdit = async () => {
        setLoading(true)
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
                setLoading(false)
            })
    }

    return (
        <Paper className="position-relative">
            <EditForm
                header="Chỉnh sửa môn học"
                buttonLabel="Chỉnh sửa"
                open={edit}
                setClose={() => setEdit(false)}
                loading={loading}
                handleSubmit={handleSubmitEdit}
                tenmh={tenmh}
                mamh={course.mamh}
                sotinchi={sotinchi}
                bomon={bomon}
                phanloai={phanloai}
                mota={mota}
                setTenmh={setTenmh}
                setTc={setSotinchi}
                setBomon={setBomon}
                setPhanloai={setPhanloai}
                setMota={setMota}
            />
            <div className="px-3 py-2 d-flex flex-wrap align-items-center justify-content-between">
                <Header>
                    Tổng quan môn học
                </Header>
                <Button onClick={handleToggleEdit}>
                    <AiOutlineEdit size="17px" />
                </Button>
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
                        content={course.tenmh}
                    />
                    <ContentRow
                        label="Số tín chỉ"
                        content={course.sotinchi}
                    />
                    <ContentRow
                        label="Bộ môn"
                        content={course.bomon}
                    />
                    <ContentRow
                        label="Phân loại"
                        content={course.phanloai}
                    />
                    <ContentRow
                        label="Mô tả"
                        content={course.mota}
                    />
                </ContentContainer>
            </div>
        </Paper>
    )
}

export default CourseInfo