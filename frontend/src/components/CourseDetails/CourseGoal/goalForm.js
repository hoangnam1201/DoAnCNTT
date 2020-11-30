import { Button, Drawer, Input } from "@material-ui/core";
import styled from "styled-components";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const GoalForm = ({ header, open, setClose, handleSubmit, id, setId, desc, setDesc, outcome, setOutcome, loading }) => {
    return <Drawer
        open={open}
        anchor="right"
    >
        <div className="detail-form__wrapper">
            <header className="detail-form__header">
                {header}
            </header>
            <div className="detail-form__main">
                <div className="mt-2">
                    <Label for="goal">
                        Mục tiêu
                    </Label>
                    <Input
                        id="goal"
                        value={id}
                        onChange={e => setId(e.target.value)}
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
                        value={outcome}
                        onChange={e => setOutcome(e.target.value)}
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
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
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
                    onClick={handleSubmit}
                    disabled={!id || !desc || !outcome}
                >
                    Tạo mới
                </Button>
                <Button
                    className="text-transform-none ml-3"
                    color="secondary"
                    variant="outlined"
                    onClick={setClose}
                >
                    Đóng
                </Button>
            </div>
        </div>
    </Drawer>
}

export default GoalForm