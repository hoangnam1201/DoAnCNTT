import { Button, Drawer, Input } from "@material-ui/core";
import styled from "styled-components";
import { LoadingOverlayDiv } from "../../common/LoadingOverlay";
import { getCourseGoalList } from "../../../api/CourseAPI";
import { ErrorHelper } from "../../../utils";
import { useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const EvualateForm = props => {
    const [loading, setLoading] = useState(false)
    const [outcomes, setOutcomes] = useState(null)

    const onCheck = (e, data) => {
        if (e.target.checked) {
            props.setCdr(props.cdr.concat(data))
        }
        else {
            props.setCdr(props.cdr.filter(ele => ele !== data))

        }
    }

    useEffect(() => {
        if (props.open) {
            setLoading(true)
            getCourseGoalList(props.mamh)
                .then(data => {
                    setLoading(false)
                    setOutcomes(data)
                })
                .catch(err => {
                    alert(ErrorHelper(err))
                    props.setClose()
                })
        }
    }, [props.open])


    return <Drawer
        open={props.open}
        anchor="right"
    >
        <div className="detail-form__wrapper">
            {
                (loading || !outcomes)
                    ? <LoadingOverlayDiv />
                    : <>
                        {props.loading && <LoadingOverlayDiv />}
                        <header className="detail-form__header">
                            {props.header}
                        </header>
                        <div className="detail-form__main">
                            {
                                outcomes.length === 0
                                    ? <div className="flex-center flex-column h-100">
                                        <AiOutlineWarning className="text-danger" size="100px" />
                                        <h3
                                            style={{ fontSize: "25px" }}
                                            className="section-title-color font-weight-bold m-0 mb-1"
                                        >
                                            Chưa có mục tiêu
                                        </h3>
                                        <p className="text-secondary">
                                            Vui lòng tạo mục tiêu mới!
                                        </p>
                                    </div>
                                    : <>
                                        <div className="mt-2">
                                            <Label for="goal">
                                                Mục tiêu
                                            </Label>
                                            <select
                                                disabled={props.edit}
                                                className="form-control border grey-200-bg p-1"
                                                value={props.goal}
                                                onChange={e => props.setGoal(e.target.value)}
                                            >
                                                {goals.map(goal => (
                                                    <option>
                                                        {goal}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <Label for="stt">
                                                STT
                                            </Label>
                                            <Input
                                                id="stt"
                                                value={props.stt}
                                                onChange={e => props.setStt(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="hinhthuc">
                                                Hình Thức KT
                                            </Label>
                                            <Input
                                                id="hinhthuc"
                                                value={props.hinhthuc}
                                                onChange={e => props.setHinhthuc(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
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
                                            <Label for="congcu_kt">
                                                Công Cụ KT
                                            </Label>
                                            <Input
                                                id="congcu_kt"
                                                value={props.congcu_kt}
                                                onChange={e => props.setcongcu_kt(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="tile">
                                                Tỉ lệ
                                            </Label>
                                            <Input
                                                id="tile"
                                                value={props.tile}
                                                onChange={e => props.settile(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                    </>
                            }
                        </div>
                        <div className="detail-form__footer">
                            <Button
                                className="light-blue-bgcolor"
                                color="primary"
                                variant="contained"
                                onClick={props.handleSubmit}
                                disabled={!props.hinhthuc || !props.noidung || !props.congcu_kt || !props.thoidiem || !props.tile}
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
                    </>
            }
        </div>
    </Drawer>
}

export default EvualateForm