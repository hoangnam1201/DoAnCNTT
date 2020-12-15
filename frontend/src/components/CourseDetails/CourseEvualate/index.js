import { Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCourseEvualate } from "../../../api/CourseAPI"
import { fetchEvualate } from "../../../store/actions/courseEvualate.action"
import { ErrorHelper } from "../../../utils"
import LoadingRows from "../../common/LoadingRows"
import CreateNew from "../CreateNew"
import ErrorRow from "../../common/ErrorRow"
import Row from "./row"
import EvualateForm from './EvualateForm'
import EmptyRow from "../../common/EmptyRow"

const CourseEvualate = ({ mamh }) => {
    const [create, setCreate] = useState(false)
    const [hinhthuc, setHinhthuc] = useState('')
    const [phanloai, setPhanloai] = useState('')
    const [noidung, setNoidung] = useState('')
    const [thoidiem, setThoidiem] = useState('')
    const [congcu_kt, setCongcuKT] = useState('')
    const [tile, setTile] = useState('')
    const [cdr, setCdr] = useState([])
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    const evualates = useSelector(state => state.course[mamh].evualate)
    const data = useSelector(state => state.course[mamh].evualate.data)
    console.log(data)
    const dispatch = useDispatch()

    const fetch = () => {
        dispatch(fetchEvualate(mamh))
    }

    const handleToggleCreate = () => {
        setHinhthuc('')
        setPhanloai('')
        setNoidung('')
        setThoidiem('')
        setCongcuKT('')
        setTile('')
        setCdr([])
        setCreate(true)
    }

    const handleSubmitCreate = () => {
        setLoading(true)
        createCourseEvualate(mamh, {
            hinhthuc,
            phanloai,
            noidung,
            thoidiem,
            congcu_kt,
            tile,
            chuandaura: cdr
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
                    message: ErrorHelper(err)
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
            header="Tạo đánh giá"
            open={create}
            setClose={() => setCreate(false)}
            mamh={mamh}
            hinhthuc={hinhthuc}
            phanloai={phanloai}
            noidung={noidung}
            thoidiem={thoidiem}
            congcu_kt={congcu_kt}
            cdr={cdr}
            tile={tile}
            setHinhthuc={setHinhthuc}
            setPhanloai={setPhanloai}
            setNoidung={setNoidung}
            setThoidiem={setThoidiem}
            setCongcuKT={setCongcuKT}
            setCdr={setCdr}
            setTile={setTile}
            handleSubmit={handleSubmitCreate}
            loading={loading}
        />
        <TableContainer className="p-2" component={Paper}>
            <CreateNew
                fetch={fetch}
                setOpen={setCreate}
                open={create}
                pending={evualates.pending}
                handleSubmitCreate={handleSubmitCreate}
                handleToggleCreate={handleToggleCreate}
                label="Tạo đánh giá"
            />
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
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        evualates.pending
                            ? <LoadingRows col={4} />
                            : evualates.error
                                ? <ErrorRow refresh={fetch} />
                                : evualates.data && data.length !== 0
                                    ? data.map(row => (
                                        <Row setResponse={setResponse} data={row} mamh={mamh} key={row.muctieu} />
                                    ))
                                    : <EmptyRow
                                        header="Chưa có đánh giá"
                                        text={(<>
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