<<<<<<< Updated upstream
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import LoadingRows from "../../common/LoadingRows"

const CourseEvualate = () => {
    return <TableContainer className="p-2" component={Paper}>
        <Table style={{ minWidth: "950px" }}>
            <TableHead>
                <TableRow>
                    <TableCell width="100px" align="center" size="small">
                        Hình thức KT
                    </TableCell>
                    <TableCell align="center" size="small">
                        Nội dung
                    </TableCell>
                    <TableCell width="200px" align="center" size="small">
                        Thời điểm
                    </TableCell>
                    <TableCell width="150px" align="center" size="small">
                        Công cụ KT
                    </TableCell>
                    <TableCell width="150px" align="center" size="small">
                        Chuẩn đầu ra KT
                    </TableCell>
                    <TableCell width="80px" align="center" size="small">
                        Tỉ lệ
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <LoadingRows col={6} />
            </TableBody>
        </Table>
    </TableContainer>
=======
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
    const [hinhthuc,setHinhthuc] = useState('')
    const [noidung,setNoidung] = useState('')
    const [congcu_kt, setcongcu_kt] = useState('')
    const [thoidiem,setthoidiem] = useState('')
    const [cdr_kt, setcdr_kt] = useState('')
    const [tile, settile] = useState('')
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
        setHinhthuc('')
        setNoidung('')
        setcongcu_kt('')
        setthoidiem('')
        setcdr_kt('')
        settile('')
        setCreate(true)
    }
    const handleSubmitCreate=()=>{
        setCreating({ ...creating, loading: true })
        createCourseEvualate(mamh, {
            hinhthuc: hinhthuc,
            noidung: noidung,
            congcu_kt: congcu_kt,
            thoidiem: thoidiem,
            cdr_kt: cdr_kt,
            tile: tile
        }).then(() => {
            fetch()
            setCreate(false)
            setCreating({
                loading: false,
                response: {
                    status: "success",
                    message: "Tạo đánh giá thành công!"
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
        if (!evualates.data)
            dispatch(fetchEvualate(mamh))
    }, [dispatch, mamh, evualates.data])

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
        <EvualateForm
            header="Tạo đánh giá mới"
            open={create}
            setClose={() => setCreate(false)}
            hinhthuc={hinhthuc}
            noidung = {noidung}
            congcu_kt ={congcu_kt}
            thoidiem = {thoidiem}
            cdr_kt = {cdr_kt}
            tile = {tile}
            setHinhthuc = {setHinhthuc}
            setNoidung = {setNoidung}
            setcongcu_kt ={setcongcu_kt}
            setthoidiem ={setthoidiem}
            setcdr_kt ={setcdr_kt}
            settile = {settile}
            loading={creating.loading}
            handleSubmit={handleSubmitCreate}
        />
        <TableContainer className="p-2" component={Paper}>
            <CreateNew
                fetch={fetch}
                setOpen={setCreate}
                pending={evualates.pending}
                label="Tạo Đánh Giá"
                handleToggleCreate={handleToggleCreate}
            />
            <Table style={{ minWidth: "750px" }}>
                <TableHead>
                    <TableRow>                       
                        <TableCell align="center" size="small">
                            Hình thức KT
                        </TableCell>
                        <TableCell width="150px" align="center" size="small">
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
                        <TableCell width="150px" className="px-0" align="center" size="small">
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
                                        <Row row={row} mamh={mamh} key={row.hinhthuc} />
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
>>>>>>> Stashed changes
}

export default CourseEvualate