import { Button, Drawer, Input } from "@material-ui/core";
import styled from "styled-components";
import { LoadingOverlayDiv } from "../../common/LoadingOverlay";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const ContentForm = props => {
    return <Drawer
        open={props.open}
        anchor="right"
    >
        <div className="detail-form__wrapper">
            {props.loading && <LoadingOverlayDiv />}
            <header className="detail-form__header">
                {props.header}
            </header>
            <div className="detail-form__main">
                <div className="mt-2">
                    <Label for="tuan">
                        Tuần
                    </Label>
                    <Input
                        id="tuan"
                        disabled={props.edit}
                        value={props.tuan}
                        onChange={e => props.setTuan(e.target.value)}
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
                        fullWidth
                        disableUnderline
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                    />
                </div>
                <div className="mt-2">
                    <Label for="cdr_hp">
                        Chuẩn Đầu Ra HP
                    </Label>
                    <Input
                        id="cdr_hp"
                        value={props.cdr_hp}
                        onChange={e => props.setCdr_hp(e.target.value)}
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
                    color="primary"
                    variant="contained"
                    onClick={props.handleSubmit}
                    disabled={!props.tuan || !props.noidung || !props.cdr_hp}
                >
                    {props.edit ? "Chỉnh sửa" : "Tạo mới"}
                </Button>
                <Button
                    className="ml-3"
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

export default ContentForm