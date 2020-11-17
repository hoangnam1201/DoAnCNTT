import { Button, Divider, Input, Paper } from "@material-ui/core"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import styled from "styled-components"

const Header = styled.h2`
    font-weight:700;
    font-size:17px;
    margin-bottom:0;
`

const Label = styled.label`
    font-weight:700;
    font-size:13px;
    margin-bottom:0;
    width:120px;
    padding:0 15px;
`

const Content = styled.p`
    white-space:pre-line;
    word-wrap:break-word;
    font-size:15px;
    margin-bottom:0;
`
const ContentContainer = styled.div`
    min-width:500px;
`

const ContentRow = ({ label, content, edit, handle, value }) => (
    <div className="row mb-3">
        <Label className="section-title-color">
            {label}:
        </Label>
        <Content className="col">
            {!edit
                ? content
                : <Input
                    disableUnderline
                />}
        </Content>
    </div>
)

const CourseInfo = ({ course }) => {
    const [edit, setEdit] = useState(false)

    const handleEdit = () => {
        setEdit(!edit)
    }

    const handleSubmitEdit = () => {

    }

    return (
        <Paper>
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
                                onClick={handleEdit}
                                variant="contained"
                            >
                                Đóng
                            </Button>
                        </div>
                    )
                    : (
                        <Button
                            className="text-transform-none"
                            onClick={handleEdit}
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
                        label="Tên môn học"
                        content={course.tenmh}
                        edit={edit}
                    />
                    <ContentRow
                        label="Mã môn học"
                        content={course.mamh}
                        edit={edit}
                    />
                    <ContentRow
                        label="Số tín chỉ"
                        content={course.sotinchi}
                        edit={edit}
                    />
                    <ContentRow
                        label="Bộ môn"
                        content={course.bomon}
                        edit={edit}
                    />
                    <ContentRow
                        label="Phân loại"
                        content={course.phanloai}
                        edit={edit}
                    />
                    <ContentRow
                        label="Mô tả"
                        content={course.mota}
                        edit={edit}
                    />
                </ContentContainer>
            </div>
        </Paper>
    )
}

export default CourseInfo