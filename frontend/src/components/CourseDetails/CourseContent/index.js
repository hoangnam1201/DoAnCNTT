<<<<<<< Updated upstream
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import LoadingRows from "../../common/LoadingRows"
import CreateNew from "../CreateNew"

const CourseContent = () => {
    return <>
        <TableContainer className="p-2" component={Paper}>
            <CreateNew
                fetch
                setOpen
                pending
                label="Tạo nội dung"
                handleToggleCreate
            />
            <Table style={{ minWidth: "600px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="120px" align="center" size="small">
                            Tuần
                    </TableCell>
                        <TableCell align="center" size="small">
                            Nội dung
                    </TableCell>
                        <TableCell width="150px" align="center" size="small">
                            Chuẩn đầu ra học phần
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <LoadingRows col={3} />
=======
import { Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCourseContent } from "../../../services"
import { fetchContent } from "../../../store/actions/courseContent.action"
import { EmptyRow, ErrorRow, LoadingRows } from "../../SituationRow"
import CreateNew from "../CreateNew"
import ContentForm from './contentForm'
import Row from './row'

const CourseContent = ({mamh}) => {
    const initialState ={
        loading: false,
        response:{
            status:"",
            message:""
        }
    }

    const [create,setCreate] = useState(false)
    const [tuan,setTuan] = useState('')
    const[noidung,setNoidung] = useState('')
    const [cdr_hp,setCdr_hp] = useState('')
    const [creating, setCreating] = useState(initialState)
    const contents = useSelector(state => {
        console.log(mamh)
        return state.course[mamh].content})
    const data =useSelector (state => state.course[mamh].content.data)
    const dispatch = useDispatch()
    
    const fetch = () =>{
        dispatch(fetchContent(mamh))
    }

    const handleToggleCreate =()=>{
        setTuan('')
        setNoidung('')
        setCdr_hp('')
        setCreate(true)
    }
    const handleSubmitCreate=()=>{
        setCreating({ ...creating, loading: true })
        createCourseContent(mamh, {
           tuan: tuan,
           noidung: noidung,
           cdr_hp: cdr_hp
        }).then(() => {
            fetch()
            setCreate(false)
            setCreating({
                loading: false,
                response: {
                    status: "success",
                    message: "Tạo nội dung thành công!"
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
        if (!contents.data)
            dispatch(fetchContent(mamh))
    }, [dispatch, mamh, contents.data])

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
        <ContentForm
            header="Tạo nội dung mới"
            open={create}
            setClose={() => setCreate(false)}
            tuan ={tuan}
            noidung ={noidung}
            cdr_hp = {cdr_hp}
            setTuan ={setTuan}
            setNoidung = {setNoidung}
            setCdr_hp = {setCdr_hp}
            loading={creating.loading}
            handleSubmit={handleSubmitCreate}
        />
        <TableContainer className="p-2" component={Paper}>
            <CreateNew
                fetch={fetch}
                setOpen={setCreate}
                pending={contents.pending}
                label="Tạo Nội Dung"
                handleToggleCreate={handleToggleCreate}
            />
            <Table style={{ minWidth: "750px" }}>
                <TableHead>
                    <TableRow>                       
                        <TableCell align="center" size="small">
                            Tuần
                        </TableCell>
                        <TableCell width="150px" align="center" size="small">
                            Nội Dung
                        </TableCell>
                        <TableCell width="150px" align="center" size="small">
                            Chuẩn Đầu Ra HP
                        </TableCell>
                        <TableCell width="150px" className="px-0" align="center" size="small">
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        contents.pending
                            ? <LoadingRows col={4} />
                            : contents.error
                                ? <ErrorRow refresh={fetch} />
                                :contents.data && data.length !== 0
                                    ? data.map(row => (
                                        <Row row={row} mamh={mamh} key={row.tuan} />
                                    ))
                                    : <EmptyRow
                                        error="Chưa có nội dung"
                                        subError={(<>
                                            Vui lòng&nbsp;
                                        <span onClick={() => setCreate(true)} style={{ cursor: "pointer" }} class="btn-link">
                                                tạo mới!
                                        </span>
                                        </>)}
                                    />
                    }
>>>>>>> Stashed changes
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default CourseContent