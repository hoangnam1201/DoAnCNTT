import { Button, Drawer, Input } from "@material-ui/core";
import styled from "styled-components";
import { LoadingOverlay } from "../../StatelessComponents";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const EvualateForm = props => {
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
                    <Label for="hinhthuc">
                        Hình Thức
                    </Label>
                    <Input
                        id="hinhthuc"
                        disabled={props.edit}
                        value={props.hinhthuc}
                        onChange={e => props.setHinhthuc(e.target.value)}
                        fullWidth
                        disableUnderline
                        inputProps={{
                            style: {
                                fontFamily: "Open Sans"
                            },
                            className: "grey-200-bg border p-2 rounded"
                        }}
                    />
                </div>
                <div className="mt-2">
                    <Label for="noidung">
                        Nội Dung
                    </Label>
                    <Input
                        id="noidung"
                        value={props.noidung}
                        onChange={e => props.setNoidung(e.target.value)}
                        rows={10}
                        rowsMax={255}
                        fullWidth
                        disableUnderline
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                        multiline
                    />
                </div>
                <div className="mt-2">
                    <Label for="congcu_kt">
                        Công cụ KT
                    </Label>
                    <Input
                        id="congcu_kt"
                        value={props.congcu_kt}
                        onChange={e => props.setcongcu_kt(e.target.value)}                 
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                        fullWidth
                        disableUnderline                      
                    />
                </div>
                <div className="mt-2">
                    <Label for="thoidiem">
                        Thời Điểm
                    </Label>
                    <Input
                        id="thoidiem"
                        value={props.thoidiem}
                        onChange={e => props.setthoidiem(e.target.value)}                 
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                        fullWidth
                        disableUnderline                      
                    />
                </div>
                <div className="mt-2">
                    <Label for="cdr_kt">
                        Chuẩn Đầu Ra KT
                    </Label>
                    <Input
                        id="cdr_kt"
                        value={props.cdr_kt}
                        onChange={e => props.setcdr_kt(e.target.value)}                 
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                        fullWidth
                        disableUnderline                      
                    />
                </div>
                <div className="mt-2">
                    <Label for="tile">
                        Tỉ Lệ
                    </Label>
                    <Input
                        id="tile"
                        value={props.tile}
                        onChange={e => props.settile(e.target.value)}                 
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                        fullWidth
                        disableUnderline                      
                    />
                </div>
            </div>
            <div className="detail-form__footer">
                <Button
                    className="text-transform-none light-blue-bgcolor"
                    color="primary"
                    variant="contained"
                    onClick={props.handleSubmit}
                    disabled={!props.hinhthuc || !props.noidung || !props.congcu_kt || !props.thoidiem ||
                    !props.cdr_kt || !props.tile}
                >
                    {props.edit ? "Chỉnh sửa" : "Tạo mới"}
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

export default EvualateForm