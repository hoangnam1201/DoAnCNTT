import { Button, Drawer, Input } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCourseGoalList } from "../../../services";
import { LoadingOverlay } from "../../StatelessComponents";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const OutcomeForm = (props) => {
    const [loading, setLoading] = useState(false)
    const [goals, setGoals] = useState(null)
    useEffect(() => {
        setLoading(true)
        getCourseGoalList(props.mamh)
            .then(data => {
                setLoading(false)
                setGoals(data)
                console.log(data)
                props.setGoal(data[0])
            })
            .catch(
                props.setClose()
            )
    }, [])

    return <Drawer
        open={props.open}
        anchor="right"
    >
        <div className="detail-form__wrapper">
            {
                (loading || !goals)
                    ? <LoadingOverlay />
                    : <>
                        <header className="detail-form__header">
                            {props.header}
                        </header>
                        <div className="detail-form__main">
                            <div className="mt-2">
                                <Label for="goal">
                                    Mục tiêu
                                </Label>
                                <select
                                    className="form-control border grey-200-bg"
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
                                <Label for="outcome">
                                    Chuẩn đầu ra HP
                    </Label>
                                <Input
                                    id="outcome"
                                    value={props.id}
                                    onChange={e => props.setId(e.target.value)}
                                    fullWidth
                                    disableUnderline
                                    inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                />
                            </div>
                            <div className="mt-2">
                                <Label for="cdio">
                                    Chuẩn đầu ra CDIO
                    </Label>
                                <Input
                                    id="cdio"
                                    value={props.cdio}
                                    onChange={e => props.setCdio(e.target.value)}
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
                                disabled={!props.id || !props.desc || !props.cdio}
                            >
                                Tạo mới
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
                    </>
            }
        </div>
    </Drawer>
}

export default OutcomeForm