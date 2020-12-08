import { Card, CardActions, CardContent, CardHeader, Dialog, IconButton, Snackbar, TableCell, TableRow } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { deleteCourseGoal, updateCourseGoal } from "../../../services"
import { deleteGoalSuccess, updateGoalSuccess } from "../../../store/actions/courseGoal.action"
import { LoadingCellOverlay } from "../../StatelessComponents"
import GoalForm from "./goalForm"

const Row = ({ row, mamh, setResponse }) => {
    const [loading, setLoading] = useState('')
    const [flag, setFlag] = useState('')
    const [goal, setGoal] = useState(row.muctieu)
    const [desc, setDesc] = useState(row.mota)
    const [outcome, setOutcome] = useState(row.cdr_ctdt)

    const dispatch = useDispatch()

    const handleSubmitDelete = async () => {
        setLoading('ROW')
        setFlag('')
        deleteCourseGoal(mamh, row.muctieu)
            .then(() => {
                dispatch(deleteGoalSuccess(mamh, row.muctieu))
                setResponse({
                    status: "success",
                    message: "asdad"
                })
            })
            .catch(err => {
                setLoading('')
                setResponse({
                    status: "error",
                    message: "asdad"
                })
            })
    }

    const handleSubmitEdit = async () => {
        setLoading('FORM')
        const data = {
            muctieu: goal,
            mota: desc,
            cdr_ctdt: outcome
        }
        updateCourseGoal(mamh, row.muctieu, data)
            .then(() => {
                dispatch(updateGoalSuccess(mamh, row.muctieu, data))
                setLoading('')
                setResponse({
                    status: "success",
                    message: `Chỉnh sửa mục tiêu ${goal} thành công!`
                })
                setFlag('')
            })
            .catch(err => {
                setLoading('')
                setResponse({
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
            <GoalForm
                edit
                header={`Chỉnh sửa mục tiêu ${row.muctieu}`}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
                id={goal}
                desc={desc}
                outcome={outcome}
                setId={setGoal}
                setDesc={setDesc}
                setOutcome={setOutcome}
                loading={loading === 'FORM'}
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
                        Xác nhận xóa mục tiêu {row.muctieu}
                        <span className="font-weight-bold font-italic">
                            {row.tenmh}
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
            <TableRow hover style={{ transform: "scale(1)" }}>
                <TableCell align="center" >
                    {row.muctieu}
                </TableCell>
                <TableCell className="break-line" >
                    {row.mota}
                </TableCell>
                <TableCell align="center">
                    {row.cdr_ctdt}
                </TableCell>
                <TableCell align='center' className="px-0">
                    <div className="action-button">
                        <IconButton
                            className="text-primary p-2"
                            onClick={() => setFlag('EDIT')}
                        >
                            <AiOutlineEdit size="20px" />
                        </IconButton>
                        <IconButton
                            className="text-danger p-2"
                            onClick={handleToggleDelete}
                        >
                            <BsTrash size="20px" />
                        </IconButton>
                    </div>
                </TableCell>
                {loading === 'ROW' && <LoadingCellOverlay />}
            </TableRow>
        </>
    )
}

export default Row