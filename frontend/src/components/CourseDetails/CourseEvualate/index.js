import { Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCourseEvualate } from "../../../services"
import { fetchEvualate } from "../../../store/actions/courseEvualate.action"
import { EmptyRow, ErrorRow, LoadingRows } from "../../SituationRow"
import CreateNew from "../CreateNew"
import EvualateForm from './EvualateForm'
import Row from './row'
const CourseEvualate = ({mamh}) => {
    const initialState ={
        loading: false,
        response:{
            status:"",
            message:""
        }
    }

    const [create,setCreate] = useState(false)
    const [goal, setGoal] = useState('')
    const [stt,setStt] = useState('')
    const [hinhthuc,setHinhthuc] = useState('')
    const [noidung,setNoidung] = useState('')
    const [congcu_kt, setcongcu_kt] = useState('')
    const [thoidiem,setthoidiem] = useState('')
    const [cdr_kt, setcdr_kt] = useState('')
    const [tile, settile] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [creating, setCreating] = useState(initialState)
    const evualates = useSelector(state => {
        console.log(mamh)
        return state.course[mamh].evualate})
    const data =useSelector (state => state.course[mamh].evualate.data)
    const dispatch = useDispatch()
    
    const fetch = () =>{
        dispatch(fetchEvualate(mamh))
    }

    const handleToggleCreate =()=>{
        setStt('')
        setGoal('')
        setHinhthuc('')
        setNoidung('')
        setcongcu_kt('')
        setthoidiem('')
        setcdr_kt('')
        settile('')
        setCreate(true)
    }
    const handleSubmitCreate = () => {
        setLoading(true)
        createCourseEvualate(mamh, goal, {
            stt: stt,
            hinhthuc: hinhthuc,
            noidung: noidung,
            congcu_kt: congcu_kt,
            thoidiem: thoidiem,
            tile: tile
        })
            .then(() => {
                fetch()
                setCreate(false)
                setLoading(false)
                setResponse({
                    status: "success",
                    message: `Tạo đánh giá thành công!`
                })
            })
            .catch(err => {
                setLoading(false)
                setResponse({
                    status: "error",
                    message: `${!err.response
                        ? "Lỗi máy chủ"
                        : err.response.message}`
                })
            })
    }


    useEffect(() => {
        if (!evualates.data)
            dispatch(fetchEvualate(mamh))
    }, [dispatch, mamh, evualates.data])

    return <>
        <Snackbar
            open={response}
            onClose={() => setResponse('')}
        >
            <Alert
                onClose={() => setResponse('')}
                severity={response.status}
                className="mx-3 mb-3"
                style={{ minWidth: "250px" }}
            >
                {response.message}
            </Alert>
        </Snackbar>
        <EvualateForm
            header="Tạo đánh giá mới"
            open={create}
            setClose={() => setCreate(false)}
            stt ={stt}
            goal = {goal}
            hinhthuc={hinhthuc}
            noidung = {noidung}
            congcu_kt ={congcu_kt}
            thoidiem = {thoidiem}
            cdr_kt = {cdr_kt}
            tile = {tile}
            setStt = {setStt}
            setGoal ={setGoal}
            setHinhthuc = {setHinhthuc}
            setNoidung = {setNoidung}
            setcongcu_kt ={setcongcu_kt}
            setthoidiem ={setthoidiem}
            setcdr_kt ={setcdr_kt}
            settile = {settile}
            loading={loading}
            handleSubmit={handleSubmitCreate}
        />
        <TableContainer className="p-2" component={Paper}>
            <CreateNew
                fetch={fetch}
                setOpen={setCreate}
                pending={evualates.pending}
                label="Tạo Đánh Giá"
                handleSubmitCreate={handleSubmitCreate}
                handleToggleCreate={handleToggleCreate}
            />
            <Table style={{ minWidth: "750px" }}>
                <TableHead>
                    <TableRow>                       
                        <TableCell align="center" size="small">
                            Hình thức KT
                        </TableCell>
                        <TableCell width="250px" align="center" size="small">
                            Nội Dung
                        </TableCell>
                        <TableCell width="150px" align="center" size="small">
                            Công Cụ KT
                        </TableCell>
                        <TableCell width="150px" align="center" size="small">
                            Thời Điểm
                        </TableCell>
                        <TableCell width="150px" align="center" size="small">
                            Chuẩn Đầu Ra KT
                        </TableCell>
                        <TableCell width="150px" align="center" size="small">
                            Tỉ Lệ
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        evualates.pending
                            ? <LoadingRows col={4} />
                            : evualates.error
                                ? <ErrorRow refresh={fetch} />
                                :evualates.data && data.length !== 0
                                    ? data.map(row => (
                                        <Row row={row} mamh={mamh} key={row.hinhthuc} setResponse={setResponse} fetch={fetch} muctieu={row.muctieu} />
                                    ))
                                    : <EmptyRow
                                        error="Chưa có đánh giá"
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

export default CourseEvualate