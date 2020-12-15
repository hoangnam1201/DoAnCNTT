import { Card, CardActions, CardContent, CardHeader, Dialog, IconButton, Snackbar, TableCell, TableRow } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { deleteCourseEvualate, updateCourseEvualate } from "../../../services"
import { LoadingCellOverlay } from "../../StatelessComponents"
import EvualateForm from "./EvualateForm"
import { ErrorHelper } from "../../../utils"
import ConfirmDeleteForm from "../../common/ConfirmDeleteForm"

const Row = ({ row, mamh, muctieu, fetch, setResponse }) => {
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState('')
    const [goal, setGoal]  = useState(muctieu)
    const [stt,setStt] = useState(row.stt)
    const [hinhthuc, setHinhthuc] = useState(row.hinhthuc)
    const [noidung, setNoidung] = useState(row.noidung)
    const [congcu_kt, setcongcu_kt] = useState(row.congcu_kt)
    const [thoidiem, setthoidiem] = useState(row.thoidiem)
    const [cdr_kt, setcdr_kt] = useState(row.cdr_kt)
    const [tile, settile] = useState(row.tile)

    const dispatch = useDispatch()

    const handleSubmitDelete = async () => {
        setLoading('ROW')
        setFlag('')
        deleteCourseEvualate(mamh, muctieu, row.hinhthuc)
            .then(() => {
                fetch()
                setResponse({
                    status: "success",
                    message: "Xóa môn học thành công"
                })
            })
            .catch(err => {
                setLoading(false)
                setResponse({
                    status: "error",
                    message: "Xóa môn học thất bại"
                })
            })
    }

    const handleSubmitEdit = async () => {
        setLoading(true)
        const data = {
            goal: goal,
            stt: stt,
            hinhthuc: hinhthuc,
            noidung: noidung,
            congcu_kt: congcu_kt,
            thoidiem: thoidiem,
            cdr_kt: cdr_kt,
            tile: tile
        }
        updateCourseEvualate(mamh, muctieu, data)
            .then(() => {
                setLoading(false)
                setResponse({
                    status: "success",
                    message: "Chỉnh sửa môn học thành công!"
                })
                fetch()
            })
            .catch(err => {
                setLoading(false)
                setResponse({
                    status: "error",
                    message: `Chỉnh sửa môn học thất bại ${ErrorHelper(err)}`
                })
            })
    }

    const handleToggleDelete = () => {
        setFlag('ConfirmDelete')
    }

    return (
        <>          
            <EvualateForm
                header={`Chỉnh sửa đánh giá ${row.hinhthuc}`}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
                goal = {goal}
                stt ={stt}
                hinhthuc={hinhthuc}
                noidung = {noidung}
                congcu_kt ={congcu_kt}
                thoidiem = {thoidiem}
                cdr_kt = {cdr_kt}
                tile = {tile}
                setGoal ={setGoal}
                setStt={setStt}
                setHinhthuc = {setHinhthuc}
                setNoidung = {setNoidung}
                setcongcu_kt ={setcongcu_kt}
                setthoidiem ={setthoidiem}
                setcdr_kt = {setcdr_kt}
                settile = {settile}
                loading={loading}
                handleSubmit={handleSubmitEdit}
            />
           <ConfirmDeleteForm
                open={(flag === 'ConfirmDelete')}
                onClose={() => setFlag('')}
                onSubmit={handleSubmitDelete}
                label="Đánh giá"
                warning="Xóa chuẩn đầu ra vĩnh viễn. Không thể khôi phục."
                name={row.hinhthuc}
            />
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