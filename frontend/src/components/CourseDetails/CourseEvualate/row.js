import { IconButton, TableCell, TableRow } from "@material-ui/core"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { deleteCourseEvualate, deleteCourseOutcome, updateCourseOutcome } from "../../../api/CourseAPI"
import { ErrorHelper } from "../../../utils"
import ConfirmDeleteForm from "../../common/ConfirmDeleteForm"
import { LoadingOverlayCell } from "../../common/LoadingOverlay"

const Row = ({ data, mamh, fetch, setResponse }) => {
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState('')
    const [hinhthuc, setHinhthuc] = useState('')
    const [phanloai, setPhanloai] = useState('')
    const [noidung, setNoidung] = useState('')
    const [thoidiem, setThoidiem] = useState('')
    const [congcu_kt, setCongcuKT] = useState('')
    const [tile, setTile] = useState('')
    const [cdr, setCdr] = useState([])

    const handleSubmitDelete = async () => {
        setLoading('ROW')
        setFlag('')
        deleteCourseEvualate(mamh)
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

/*     const handleSubmitEdit = async () => {
        setLoading('FORM')
        const updateData = {
            cdr: id,
            ma_muctieu: goal,
            mota: desc,
            cdio
        }
        updateCourseOutcome(mamh, muctieu, data.cdr, updateData)
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
    } */

    const handleToggleDelete = () => {
        setFlag('ConfirmDelete')
    }

    return (
        <>
            <ConfirmDeleteForm
                open={(flag === 'ConfirmDelete')}
                onClose={() => setFlag('')}
                onSubmit={handleSubmitDelete}
                label="Chuẩn đầu ra"
                warning="Xóa chuẩn đầu ra vĩnh viễn. Không thể khôi phục."
                name={data.cdr}
            />
            <>
                <TableRow hover>
                    <TableCell align="center">
                        {data.hinhthuc}
                    </TableCell>
                    <TableCell className="break-line" >
                        {data.noidung}
                    </TableCell>
                    <TableCell align="center" >
                        {data.thoidiem}
                    </TableCell>
                    <TableCell align="center" >
                        {data.congcu_kt}
                    </TableCell>
                    <TableCell align="center" >
                        {data.chuandaura.join(' ')}
                    </TableCell>
                    <TableCell align="center" >
                        {data.tile}
                    </TableCell>
                    <TableCell align='center' className="px-0">
                        <div className="action-button">
                            <IconButton
                                className="text-primary p-2"
                                onClick={() => setFlag("EDIT")}
                            >
                                <AiOutlineEdit size="24px" />
                            </IconButton>
                            <IconButton
                                className="text-danger p-2"
                            //onClick={handleToggleDelete}
                            >
                                <BsTrash size="24px" />
                            </IconButton>
                        </div>
                    </TableCell>
                    {loading === 'ROW' && <LoadingOverlayCell />}
                </TableRow>
            </>
        </>
    )
}

export default Row