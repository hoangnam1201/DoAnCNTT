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


const Row = ({ row, mamh }) => {
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState('')
    const [goal, setGoal] = useState(row.muctieu)
    const [desc, setDesc] = useState(row.mota)
    const [outcome, setOutcome] = useState(row.cdr_ctdt)

    const dispatch = useDispatch()

    const handleSubmitDelete = async () => {
        setLoading(true)
        setFlag('')
        deleteCourseGoal(mamh, row.muctieu)
            .then(() => {
                dispatch(deleteGoalSuccess(mamh, row.muctieu))
            })
            .catch(err => {
                setLoading(false)
            })
    }

    const handleSubmitEdit = async () => {
        setLoading(true)
        const data = {
            muctieu: goal,
            mota: desc,
            cdr_ctdt: outcome
        }
        updateCourseGoal(mamh, row.muctieu, data)
            .then(() => {
                dispatch(updateGoalSuccess(mamh, row.muctieu, data))
                setLoading(false)
                setFlag({
                    status: "success",
                    message: `Chỉnh sửa mục tiêu ${goal} thành công!`
                })
            })
            .catch(err => {
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
            <GoalForm
                header={`Chỉnh sửa mục tiêu ${row.muctieu}`}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
                id={goal}
                desc={desc}
                outcome={outcome}
                setId={setGoal}
                setDesc={setDesc}
                setOutcome={setOutcome}
                loading={loading}
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
            <TableRow style={{ transform: "scale(1)" }}>
                <TableCell align="center" style={{ verticalAlign: 'top' }} >
                    {row.muctieu}
                </TableCell>
                <TableCell className="break-line" style={{ verticalAlign: 'top' }} >
                    {row.mota}
                </TableCell>
                <TableCell align="center" style={{ verticalAlign: 'top' }}>
                    {row.cdr_ctdt}
                </TableCell>
                <TableCell align='center' style={{ verticalAlign: 'top' }} className="px-0">
                    <IconButton
                        className="text-primary p-2"
                        onClick={() => setFlag('EDIT')}
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
            </TableRow>
        </>
    )
}

export default Row