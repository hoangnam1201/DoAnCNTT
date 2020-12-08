import { Button, Drawer, Input } from "@material-ui/core";
import styled from "styled-components";
import { LoadingOverlay } from "../../StatelessComponents";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const GoalForm = props => {
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
                    <Label for="goal">
                        Mục tiêu
                    </Label>
                    <Input
                        id="goal"
                        disabled={props.edit}
                        value={props.id}
                        onChange={e => props.setId(e.target.value)}
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
                    <Label for="outcome">
                        Chuẩn đầu ra CTĐT
                    </Label>
                    <Input
                        id="outcome"
                        value={props.outcome}
                        onChange={e => props.setOutcome(e.target.value)}
                        fullWidth
                        disableUnderline
                        inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                    />
                </div>
                <div className="mt-2">
                    <Label for="desc">
                        Mô tả
                    </Label>
                    <Input
                        id="desc"
                        value={props.desc}
                        onChange={e => props.setDesc(e.target.value)}
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
                    disabled={!props.id || !props.desc || !props.outcome}
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

export default GoalForm