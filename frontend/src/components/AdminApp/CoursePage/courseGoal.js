import { Button, Input, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { IoMdRefresh } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { createCourseGoal } from "../../../services"
import { fetchGoal } from "../../../store/actions/courseGoal.action"
import { EmptyRow, ErrorRow, LoadingRows } from "../SituationRow"

const Row = ({ row }) => (
    <TableRow>
        <TableCell align="center">
            {row.muctieu}
        </TableCell>
        <TableCell>
            {row.mota}
        </TableCell>
        <TableCell align="center">
            {row.cdr_ctdt}
        </TableCell>
    </TableRow>
)

const CreateForm = ({ id, desc, setDesc, outcome, setOutcome }) => (
    <TableRow className="font-italic">
        <TableCell align="center" className="font-weight-bold">
            <AiOutlinePlus size="25px" />
            &nbsp;{id}
        </TableCell>
        <TableCell>
            <Input
                className="bg-light rounded p-2"
                rowsMax={6} fullWidth multiline
                value={desc}
                onChange={e => setDesc(e.target.value)}
            />
        </TableCell>
        <TableCell>
            <Input
                className="bg-light rounded" fullWidth
                value={outcome}
                onChange={e => setOutcome(e.target.value)}
            />
        </TableCell>
    </TableRow>
)

const CourseGoal = ({ mamh }) => {
    const initialState = {
        loading: false,
        response: {
            status: "",
            message: ""
        }
    }

    const [create, setCreate] = useState(false)
    const [createID, setCreateID] = useState('')
    const [createDesc, setCreateDesc] = useState('')
    const [createOutcome, setCreateOutcome] = useState('')
    const [creating, setCreating] = useState(initialState)

    const goals = useSelector(state => state.course[mamh].goal)
    const dispatch = useDispatch()

    const fetch = () => {
        dispatch(fetchGoal(mamh))
    }

    const handleToggleCreate = () => {
        setCreateID(`G${goals.data.length + 1}`)
        setCreateDesc('')
        setCreateOutcome('')
        setCreate(true)
    }

    const handleSubmitCreate = () => {
        setCreating({ ...creating, loading: true })
        createCourseGoal(mamh, {
            muctieu: createID,
            mota: createDesc,
            cdr_ctdt: createOutcome
        }).then(() => {
            fetch()
            setCreate(false)
            setCreating({
                loading: false,
                response: {
                    status: "success",
                    message: "Tạo mục tiêu thành công!"
                }
            })
        })
            .catch(err => {
                setCreating({
                    loading: false,
                    response: {
                        status: "error",
                        message: !err.response ? "Lỗi máy chủ" :
                            err.response.data.error
                    }
                })
            })
    }

    useEffect(() => {
        if (!goals.data)
            dispatch(fetchGoal(mamh))
    }, [dispatch, mamh, goals.data])

    return <>
        <Snackbar
            open={creating.response.status}
            onClose={() => setCreating(initialState)}
        >
            <Alert
                onClose={() => setCreating(initialState)}
                severity={creating.response.status}
                className="mx-3 mb-3"
                style={{ minWidth: "250px" }}
            >
                <AlertTitle className="text-capitalize font-weight-bold">
                    {creating.response.status}
                </AlertTitle>
                {creating.response.message}
            </Alert>
        </Snackbar>
        <TableContainer className="p-2" component={Paper}>
            <div
                style={{ minWidth: "600px" }}
                className="d-flex pl-2 pb-2 align-items-center"
            >
                <Tooltip title="Tải lại">
                    <Button onClick={fetch} className="p-0 mx-2">
                        <IoMdRefresh size="25px" />
                    </Button>
                </Tooltip>
                {!create
                    ? <Button
                        variant="contained"
                        color="primary"
                        className="light-blue-bgcolor my-2 font-weight-bold"
                        onClick={handleToggleCreate}
                    >
                        Tạo mục tiêu
                </Button>
                    : <div>
                        <Button
                            variant="contained"
                            color="primary"
                            className="light-blue-bgcolor my-2 font-weight-bold"
                            onClick={handleSubmitCreate}
                        >
                            Tạo mới
                    </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="bg-danger my-2 font-weight-bold ml-3"
                            onClick={() => setCreate(false)}
                        >
                            Đóng
                    </Button>
                    </div>}
            </div>
            <Table style={{ minWidth: "600px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="120px" align="center" size="small">
                            Mục tiêu
                    </TableCell>
                        <TableCell align="center" size="small">
                            Mô tả
                    </TableCell>
                        <TableCell width="150px" align="center" size="small">
                            Chuẩn đầu ra CTĐT
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Tao muc tieu */}
                    {create && <CreateForm
                        id={createID}
                        desc={createDesc}
                        outcome={createOutcome}
                        setDesc={setCreateDesc}
                        setOutcome={setCreateOutcome}
                    />}
                    {
                        goals.loading
                            ? <LoadingRows col={3} />
                            : goals.error
                                ? <ErrorRow refresh={fetch} />
                                : goals.data && goals.data.length !== 0
                                    ? goals.data.map(row => (
                                        <Row row={row} />
                                    ))
                                    : <EmptyRow
                                        error="Chưa có mục tiêu"
                                        subError={(<>
                                            Vui lòng&nbsp;
                                        <span onClick={() => setCreate(true)} style={{ cursor: "pointer" }} class="btn-link">
                                                tạo mới!
                                        </span>
                                        </>)}
                                    />
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default CourseGoal