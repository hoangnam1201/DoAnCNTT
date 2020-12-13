import { Card, CardActions, CardContent, CardHeader, Dialog, IconButton, Snackbar, TableCell, TableRow } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { deleteCourseEvualate, updateCourseEvualate } from "../../../services"
import { deleteEvualateSuccess, updateEvualateSuccess } from "../../../store/actions/courseEvualate.action"
import { LoadingCellOverlay } from "../../StatelessComponents"
import EvualateForm from "./EvualateForm"


const Row = ({ row, mamh }) => {
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState('')
    const [hinhthuc, setHinhthuc] = useState(row.hinhthuc)
    const [noidung, setNoidung] = useState(row.noidung)
    const [congcu_kt, setcongcu_kt] = useState(row.congcu_kt)
    const [thoidiem, setthoidiem] = useState(row.thoidiem)
    const [cdr_kt, setcdr_kt] = useState(row.cdr_kt)
    const [tile, settile] = useState(row.tile)

    const dispatch = useDispatch()

    const handleSubmitDelete = async () => {
        setLoading(true)
        setFlag('')
        deleteCourseEvualate(mamh, row.hinhthuc)
            .then(() => {
                dispatch(deleteEvualateSuccess(mamh, row.hinhthuc))
            })
            .catch(err => {
                setLoading(false)
            })
    }

    const handleSubmitEdit = async () => {
        setLoading(true)
        const data = {
            hinhthuc: hinhthuc,
            noidung: noidung,
            congcu_kt: congcu_kt,
            thoidiem: thoidiem,
            cdr_kt: cdr_kt,
            tile: tile
        }
        updateCourseEvualate(mamh, row.hinhthuc, data)
            .then(() => {
                dispatch(updateEvualateSuccess(mamh, row.hinhthuc, data))
                setLoading(false)
                setFlag({
                    status: "success",
                    message: `Chỉnh sửa đánh giá ${hinhthuc} thành công!`
                })
            })
            .catch(err => {
                setLoading(false)
                setFlag({
                    status: "error",
                    message: `Chỉnh sửa đánh giá ${hinhthuc} thất bại!`
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
            <EvualateForm
                header={`Chỉnh sửa đánh giá ${row.hinhthuc}`}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
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
                setcdr_kt = {setcdr_kt}
                settile = {settile}
                loading={loading}
                handleSubmit={handleSubmitEdit}
            />
            <Dialog open={(flag === 'ConfirmDelete')} onClose={() => setFlag('')}>
                <Card className="p-3">
                    <CardHeader
                        disableTypography
                        title={`Xóa đánh giá`}
                        className="page-title primary-logo-color"
                    />
                    <CardContent>
                        Xác nhận đánh giá {row.hinhthuc}
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
                    {row.hinhthuc}
                </TableCell>
                <TableCell align="center" style={{ verticalAlign: 'top' }}>
                    {row.noidung}
                </TableCell>
                <TableCell align="center" style={{ verticalAlign: 'top' }}>
                    {row.congcu_kt}
                </TableCell>
                <TableCell align="center" style={{ verticalAlign: 'top' }}>
                    {row.thoidiem}
                </TableCell>
                <TableCell align="center" style={{ verticalAlign: 'top' }}>
                    {row.cdr_kt}
                </TableCell>
                <TableCell align="center" style={{ verticalAlign: 'top' }}>
                    {row.tile}
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