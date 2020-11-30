import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCourseOutcome } from "../../../services"
import { fetchOutcome } from "../../../store/actions/courseOutcome.action"
import { EmptyRow, ErrorRow, LoadingRows } from "../../SituationRow"
import CreateNew from "../CreateNew"
import OutcomeForm from "./outcomeForm"
import Row from "./row"

const CourseOutcome = ({ mamh }) => {
    const initialState = {
        loading: false,
        response: {
            status: "",
            message: ""
        }
    }

    const [create, setCreate] = useState(false)
    const [ID, setID] = useState('')
    const [goal, setGoal] = useState('')
    const [desc, setDesc] = useState('')
    const [cdio, setCdio] = useState('')
    const [creating, setCreating] = useState(initialState)

    const outcomes = useSelector(state => state.course[mamh].outcome)
    const data = useSelector(state => state.course[mamh].outcome.data)
    console.log(outcomes)
    const dispatch = useDispatch()

    const fetch = () => {
        dispatch(fetchOutcome(mamh))
    }

    const handleToggleCreate = () => {
        setID('')
        setGoal('')
        setDesc('')
        setCdio('')
        setCreate(true)
    }

    const handleSubmitCreate = () => {
        setCreating({ ...creating, loading: true })
        createCourseOutcome(mamh, goal, {
            cdr: ID,
            mota: desc,
            cdio
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
        if (!outcomes.data)
            dispatch(fetchOutcome(mamh))
    }, [dispatch, mamh, outcomes.data])

    return <>
        <OutcomeForm
            header="Tạo chuẩn đầu ra"
            open={create}
            setClose={() => setCreate(false)}
            mamh={mamh}
            goal={goal}
            id={ID}
            cdio={cdio}
            desc={desc}
            setGoal={setGoal}
            setId={setID}
            setCdio={setCdio}
            setDesc={setDesc}
            handleSubmit={handleSubmitCreate}
        />
        <TableContainer className="p-2" component={Paper}>
            <CreateNew
                fetch={fetch}
                setOpen={setCreate}
                open={create}
                pending={outcomes.pending}
                handleSubmitCreate={handleSubmitCreate}
                handleToggleCreate={handleToggleCreate}
                label="Tạo chuẩn đầu ra"
            />
            <Table style={{ minWidth: "700px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="100px" align="center" size="small">
                            Mục tiêu
                        </TableCell>
                        <TableCell width="110px" align="center" size="small">
                            Chuẩn đầu ra HP
                        </TableCell>
                        <TableCell align="center" size="small">
                            Mô tả
                        </TableCell>
                        <TableCell width="150px" align="center" size="small">
                            Chuẩn đầu ra CDIO
                        </TableCell>
                        <TableCell width="150px" className="px-0" align="center" size="small">
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        outcomes.pending
                            ? <LoadingRows col={4} />
                            : outcomes.error
                                ? <ErrorRow refresh={fetch} />
                                : outcomes.data && data.length !== 0
                                    ? data.map(data => (
                                        <>
                                            <TableRow style={{ transform: "scale(1)" }}>
                                                <TableCell
                                                    align="center"
                                                    rowSpan={data.chuandaura.length}
                                                    key={data.muctieu}
                                                    className="border-right"
                                                >
                                                    {data.muctieu}
                                                </TableCell>
                                                <Row muctieu={data.muctieu} data={data.chuandaura[0]} mamh={mamh} key={data.chuandaura[0].cdr} />
                                            </TableRow>
                                            {data.chuandaura.map((cdrData, index) => (
                                                index !== 0 &&
                                                <TableRow style={{ transform: "scale(1)" }}>
                                                    <Row muctieu={data.muctieu} data={cdrData} mamh={mamh} key={cdrData.cdr} />
                                                </TableRow>
                                            ))}
                                        </>
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

export default CourseOutcome