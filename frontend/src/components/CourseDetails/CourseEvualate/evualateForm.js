import { Button, Checkbox, Drawer, FormControlLabel, Input } from "@material-ui/core";
import { useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import styled from "styled-components";
import { getCourseOutcomeList } from "../../../api/CourseAPI";
import { ErrorHelper } from "../../../utils";
import { LoadingOverlayDiv } from "../../common/LoadingOverlay";
import { LoadingOverlay } from "../../StatelessComponents";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const EvualateForm = props => {
    const [loading, setLoading] = useState(false)
    const [outcomes, setOutcomes] = useState(null)

    const handleChange = (e, data) => {
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
            getCourseOutcomeList(props.mamh)
                .then(data => {
                    setLoading(false)
                    setOutcomes(data)
                })
                .catch(err => {
                    console.log(err)
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
                                            Chưa có chuẩn đầu ra
                                        </h3>
                                        <p className="text-secondary">
                                            Vui lòng tạo chuẩn đầu ra mới!
                                        </p>
                                    </div>
                                    : <>
                                        <div className="mt-2">
                                            <Label for="hinhthuc">
                                                Hình thức
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
                                            <Label for="nhom">
                                                Phân nhóm
                                            </Label>
                                            <Input
                                                id="nhom"
                                                value={props.phanloai}
                                                onChange={e => props.setPhanloai(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="thoidiem">
                                                Thời điểm
                                            </Label>
                                            <Input
                                                id="thoidiem"
                                                value={props.thoidiem}
                                                onChange={e => props.setThoidiem(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="congcu_kt">
                                                Công cụ KT
                                            </Label>
                                            <Input
                                                id="congcu_kt"
                                                value={props.congcu_kt}
                                                onChange={e => props.setCongcuKT(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="cdr">
                                                Chuẩn đầu ra
                                            </Label>
                                            <div>
                                                {outcomes.map(ele => (
                                                    <FormControlLabel
                                                        key={ele.cdr}
                                                        control={
                                                            <Checkbox
                                                                onChange={e => handleChange(e, ele)}
                                                                name={ele.cdr}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={ele.cdr}
                                                        className="m-0 col-6"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Label for="tile">
                                                Tỉ lệ
                                            </Label>
                                            <Input
                                                id="tile"
                                                type="number"
                                                value={props.tile}
                                                onChange={e => props.setTile(e.target.value)}
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
                                                rows={10}
                                                rowsMax={255}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                                multiline
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