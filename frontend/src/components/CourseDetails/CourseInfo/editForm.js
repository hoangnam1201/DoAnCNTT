import { Button, Drawer, Input } from "@material-ui/core";
import styled from "styled-components";
import { LoadingOverlay } from "../../StatelessComponents";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const EditForm = (props) => {
    return <Drawer
        open={props.open}
        anchor="right"
    >
        <div className="detail-form__wrapper">
            {props.loading && <LoadingOverlay />}
            <header className="detail-form__header">
                {props.header}
            </header>
            <div className="detail-form__main">
                <div className="mt-2">
                    <Label for="id">
                        Mã môn học
                    </Label>
                    <Input
                        id="id"
                        readOnly
                        value={props.mamh}
                        fullWidth
                        disableUnderline
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                    />
                </div>
                <div className="mt-2">
                    <Label for="name">
                        Tên môn học
                    </Label>
                    <Input
                        id="name"
                        value={props.tenmh}
                        onChange={e => props.setTenmh(e.target.value)}
                        fullWidth
                        disableUnderline
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                    />
                </div>
                <div className="mt-2">
                    <Label for="load">
                        Số tín chỉ
                    </Label>
                    <Input
                        id="load"
                        type="number"
                        value={props.sotinchi}
                        onChange={e => props.setTc(e.target.value)}
                        fullWidth
                        disableUnderline
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                    />
                </div>
                <div className="mt-2">
                    <Label>
                        Bộ môn
                    </Label>
                    <select
                        className="form-control p-1 border grey-200-bg"
                        value={props.bomon}
                        onChange={e => props.setBomon(e.target.value)}
                    >
                        <option>Tin học cơ sở</option>
                        <option>Công nghệ phần mềm</option>
                        <option>Hệ thống thông tin</option>
                        <option>Mạng và an ninh mạng</option>
                    </select>
                </div>
                <div className="mt-2">
                    <Label>
                        Phân loại
                    </Label>
                    <select
                        className="form-control p-1 border grey-200-bg"
                        value={props.phanloai}
                        onChange={e => props.setPhanloai(e.target.value)}
                    >
                        <option>Tùy chọn</option>
                        <option>Bắt buộc</option>
                    </select>
                </div>
                <div className="mt-2">
                    <Label for="desc">
                        Mô tả
                    </Label>
                    <Input
                        id="desc"
                        value={props.mota}
                        onChange={e => props.setMota(e.target.value)}
                        rows={10}
                        rowsMax={255}
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                        fullWidth
                        disableUnderline
                        multiline
                    />
                </div>
            </div>
            <div className="detail-form__footer">
                <Button
                    className="text-transform-none light-blue-bgcolor"
                    color="primary"
                    variant="contained"
                    onClick={props.handleSubmit}
                    disabled={!props.mamh || !props.tenmh || !props.sotinchi}
                >
                    {`${props.buttonLabel || "Tạo mới"}`}
                </Button>
                <Button
                    className="text-transform-none ml-3"
                    color="secondary"
                    variant="outlined"
                    onClick={props.setClose}
                >
                    Đóng
                </Button>
            </div>
        </div>
    </Drawer>
}

export default EditForm