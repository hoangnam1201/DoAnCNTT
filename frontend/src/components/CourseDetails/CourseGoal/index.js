import { Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCourseGoal } from "../../../services"
import { fetchGoal } from "../../../store/actions/courseGoal.action"
import { EmptyRow, ErrorRow, LoadingRows } from "../../SituationRow"
import CreateNew from "../CreateNew"
import GoalForm from './goalForm'
import Row from './row'

const CourseGoal = ({ mamh }) => {
    const [create, setCreate] = useState(false)
    const [ID, setID] = useState('')
    const [desc, setDesc] = useState('')
    const [outcome, setOutcome] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    const goals = useSelector(state => state.course[mamh].goal)
    const data = useSelector(state => state.course[mamh].goal.data)
    const dispatch = useDispatch()

    const fetch = () => {
        dispatch(fetchGoal(mamh))
    }

    const handleToggleCreate = () => {
        setID('')
        setDesc('')
        setOutcome('')
        setCreate(true)
    }

    const handleSubmitCreate = () => {
        setLoading(true)
        createCourseGoal(mamh, {
            muctieu: ID,
            mota: desc,
            cdr_ctdt: outcome
        }).then(() => {
            fetch()
            setCreate(false)
            setLoading(false)
            setResponse({
                status: "success",
                message: `Tạo môn học thành công!`
            })
        })
            .catch(err => {
                setLoading(false)
                setResponse({
                    status: "error",
                    message: `Tạo môn học thành công!`
                })
            })
    }

    useEffect(() => {
        if (!goals.data)
            dispatch(fetchGoal(mamh))
    }, [dispatch, mamh, goals.data])

    return <>
        <Snackbar
            open={response.status}
            onClose={() => setResponse('')}
        >
            <Alert
                onClose={() => setResponse('')}
                severity={response.status}
                className="mx-3 mb-3"
                style={{ minWidth: "250px" }}
                variant="filled"
            >
                {response.message}
            </Alert>
        </Snackbar>
        <GoalForm
            header="Tạo mục tiêu mới"
            open={create}
            setClose={() => setCreate(false)}
            id={ID}
            desc={desc}
            outcome={outcome}
            setId={setID}
            setDesc={setDesc}
            setOutcome={setOutcome}
            loading={loading}
            handleSubmit={handleSubmitCreate}
        />
        <TableContainer className="p-2" component={Paper}>
            <CreateNew
                fetch={fetch}
                setOpen={setCreate}
                pending={goals.pending}
                label="Tạo mục tiêu"
                handleToggleCreate={handleToggleCreate}
            />
            <Table style={{ minWidth: "750px" }}>
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
                        <TableCell width="150px" className="px-0" align="center" size="small">
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        goals.pending
                            ? <LoadingRows col={4} />
                            : goals.error
                                ? <ErrorRow refresh={fetch} />
                                : goals.data && data.length !== 0
                                    ? data.map(row => (
                                        <Row setResponse={setResponse} row={row} mamh={mamh} key={row.muctieu} />
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