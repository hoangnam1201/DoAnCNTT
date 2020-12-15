import { Card, CardActions, CardContent, CardHeader, Dialog, IconButton, Snackbar, TableCell, TableRow } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { updateCourseContent, deleteCourseContent } from "../../../services"
import { deleteContentSuccess, updateContentSuccess } from "../../../store/actions/courseContent.action"
import { LoadingCellOverlay } from "../../StatelessComponents"
import ContentForm from "./contentForm"


const Row = ({ row, mamh }) => {
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState('')
    const [tuan,setTuan] = useState(row.tuan)
    const [chuong, setChuong] = useState(row.chuong)
    const [nd_trenlop, setNd_trenlop] = useState(row.nd_trenlop)
    const [nd_onha, setNd_onha] = useState(row.nd_onha)
    const [outcome, setOutcome] = useState(row.outcome)

    const dispatch = useDispatch()

    const handleSubmitDelete = async () => {
        setLoading(true)
        setFlag('')
        deleteCourseContent(mamh, row.outcome)
            .then(() => {
                dispatch(deleteContentSuccess(mamh, row.outcome))
            })
            .catch(err => {
                setLoading(false)
            })
    }

/*     const handleSubmitEdit = async () => {
        setLoading(true)
        const data = {
            tuan: tuan,
            noidung: noidung,
            cdr_hp: cdr_hp
        }
        updateCourseContent(mamh, row.outcome, data)
            .then(() => {
                dispatch(updateContentSuccess(mamh, row.outcome, data))
                setLoading(false)
                setFlag({
                    status: "success",
                    message: `Chỉnh sửa noi dung ${outcome} thành công!`
                })
            })
            .catch(err => {
                setLoading(false)
                setFlag({
                    status: "error",
                    message: `Chỉnh sửa nội dung ${outcome} thất bại!`
                })
            })
    }
 */
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
{/*             <ContentForm
                header={`Chỉnh sửa nội dung ${row.tuan}`}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
                tuan = {tuan}
                noidung = {noidung}
                cdr_hp = {cdr_hp}
                setTuan = {setTuan}
                setNoidung ={setNoidung}
                setCdr_hp = {setCdr_hp}
                loading={loading}
                handleSubmit={handleSubmitEdit}
            />
 */}            <Dialog open={(flag === 'ConfirmDelete')} onClose={() => setFlag('')}>
                <Card className="p-3">
                    <CardHeader
                        disableTypography
                        title={`Xóa nội dung`}
                        className="page-title primary-logo-color"
                    />
                    <CardContent>
                        Xác nhận nội dung {row.tuan}
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
                <TableCell className="break-line" style={{ verticalAlign: 'top' }} >
                    {row.tuan}
                </TableCell>
                <TableCell align="center" style={{ verticalAlign: 'top' }}>
                    {row.noidung}
                </TableCell>
                <TableCell align="center" style={{ verticalAlign: 'top' }}>
                    {row.cdr_hp}
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