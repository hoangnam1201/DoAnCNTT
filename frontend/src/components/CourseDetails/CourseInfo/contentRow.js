import { Input } from "@material-ui/core"
import styled from "styled-components"

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

const BoMonSelect = (props) => (
    <select
        className="bg-light form-control"
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
    >
        <option selected value="" disabled>-- Chọn bộ môn --</option>
        <option>Tin học cơ sở</option>
        <option>Công nghệ phần mềm</option>
        <option>Hệ thống thông tin</option>
        <option>Mạng và an ninh mạng</option>
    </select>
)

const PhanLoaiSelect = (props) => (
    <select
        className="bg-light form-control"
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
    >
        <option selected value="" disabled>-- Chọn phân loại --</option>
        <option>Tùy chọn</option>
        <option>Bắt buộc</option>
    </select>
)

const ContentRow = ({ label, content, edit, handle, select, multiline, number }) => (
    <div className={`row mb-3 d-flex ${!multiline && 'align-items-center'}`}>
        <Label className="section-title-color">
            {label}:
        </Label>
        <Content className="col">
            {!edit
                ? content
                : select
                    ? label === "Bộ môn"
                        ? <BoMonSelect value={content} setValue={handle} />
                        : <PhanLoaiSelect value={content} setValue={handle} />
                    : <Input
                        value={content}
                        onChange={e => handle(e.target.value)}
                        multiline={multiline}
                        fullWidth
                        className="bg-light p-2"
                        type={`${number ? "number" : "text"}`}
                        inputProps={{ spellCheck: false }}
                    />
            }
        </Content>
    </div>
)

export default ContentRow