import { Card, CardActions, CardContent, CardHeader, Dialog, IconButton, Snackbar, TableCell } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { deleteCourseGoal, updateCourseOutcome } from "../../../services"
import { deleteGoalSuccess, updateGoalSuccess } from "../../../store/actions/courseGoal.action"
import { LoadingCellOverlay } from "../../StatelessComponents"
import OutcomeForm from "./outcomeForm"

const Row = ({ data, mamh, muctieu }) => {
    console.log(data)
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState('')
    const [goal, setGoal] = useState(muctieu)
    const [id, setId] = useState(data.cdr)
    const [desc, setDesc] = useState(data.mota)
    const [cdio, setCdio] = useState(data.cdio)

    const dispatch = useDispatch()

    const handleSubmitDelete = async () => {
        setLoading(true)
        setFlag('')
        deleteCourseGoal(mamh, data.muctieu)
            .then(() => {
                dispatch(deleteGoalSuccess(mamh, data.muctieu))
            })
            .catch(err => {
                setLoading(false)
            })
    }

    const handleSubmitEdit = async () => {
        setLoading(true)
        const updateData = {
            cdr: id,
            ma_muctieu: goal,
            mota: desc,
            cdio
        }
        updateCourseOutcome(mamh, muctieu, data.cdr, updateData)
            .then(() => {
                dispatch(updateGoalSuccess(mamh, data.muctieu, updateData))
                setLoading(false)
                setFlag({
                    status: "success",
                    message: `Chỉnh sửa mục tiêu ${goal} thành công!`
                })
            })
            .catch(err => {
                console.log(err.response)
                setLoading(false)
                setFlag({
                    status: "error",
                    message: `Chỉnh sửa mục tiêu ${goal} thất bại!`
                })
            })
    }

    const handleToggleDelete = () => {
        setFlag('ConfirmDelete')
    }

    return (
        <>
            <Snackbar
                open={flag.status}
                onClose={() => setFlag('')}
            >
                <Alert
                    onClose={() => setFlag('')}
                    severity={flag.status}
                    className="mx-3 mb-3"
                    style={{ minWidth: "250px" }}
                >
                    <AlertTitle className="text-capitalize font-weight-bold">
                        {flag.status}
                    </AlertTitle>
                    {flag.message}
                </Alert>
            </Snackbar>
            <OutcomeForm
                header={`Chỉnh sửa CĐR ${data.id}`}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
                mamh={mamh}
                goal={goal}
                id={id}
                cdio={cdio}
                desc={desc}
                setGoal={setGoal}
                setId={setId}
                setCdio={setCdio}
                setDesc={setDesc}
                handleSubmit={handleSubmitEdit}
            />
            <Dialog open={(flag === 'ConfirmDelete')} onClose={() => setFlag('')}>
                <Card className="p-3">
                    <CardHeader
                        disableTypography
                        title={`Xóa mục tiêu`}
                        className="page-title primary-logo-color"
                    />
                    <CardContent>
                        Xác nhận xóa mục tiêu {data.muctieu}
                        <span className="font-weight-bold font-italic">
                            {data.tenmh}
                        </span>.
                    </CardContent>
                    <CardActions>
                        <button
                            onClick={handleSubmitDelete}
                            className="btn btn-block btn-danger"
                        >
                            Xóa
                    </button>
                        <button
                            onClick={() => setFlag('')}
                            className="btn btn-block btn-light"
                        >
                            Hủy
                    </button>
                    </CardActions>
                </Card>
            </Dialog>
            <>
                <TableCell align="center" style={{ verticalAlign: 'top' }} >
                    {data.cdr}
                </TableCell>
                <TableCell className="break-line" style={{ verticalAlign: 'top' }} >
                    {data.mota}
                </TableCell>
                <TableCell align="center" style={{ verticalAlign: 'top' }} >
                    {data.cdio}
                </TableCell>
                <TableCell align='center' style={{ verticalAlign: 'top' }} className="px-0">
                    <IconButton
                        className="text-primary p-2"
                        onClick={() => setFlag("EDIT")}
                    >
                        <AiOutlineEdit size="24px" />
                    </IconButton>
                    <IconButton
                        className="text-danger p-2"
                        onClick={handleToggleDelete}
                    >
                        <BsTrash size="24px" />
                    </IconButton>
                </TableCell>
                {loading && <LoadingCellOverlay />}
            </>
        </>
    )
}

export default Row