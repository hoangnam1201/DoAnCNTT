import { IconButton, TableCell } from "@material-ui/core"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { deleteCourseOutcome, updateCourseOutcome } from "../../../api/CourseAPI"
import { ErrorHelper } from "../../../utils"
import ConfirmDeleteForm from "../../common/ConfirmDeleteForm"
import { LoadingOverlayCell } from "../../common/LoadingOverlay"
import OutcomeForm from "./outcomeForm"

const Row = ({ data, mamh, muctieu, fetch, setResponse }) => {
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState('')
    const [goal, setGoal] = useState(muctieu)
    const [id, setId] = useState(data.cdr)
    const [desc, setDesc] = useState(data.mota)
    const [cdio, setCdio] = useState(data.cdio)

    const handleSubmitDelete = async () => {
        setLoading('ROW')
        setFlag('')
        deleteCourseOutcome(mamh, muctieu, data.cdr)
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
    }

    const handleToggleDelete = () => {
        setFlag('ConfirmDelete')
    }

    return (
        <>
            <OutcomeForm
                edit
                header={`Chỉnh sửa CĐR ${data.cdr}`}
                loading={loading === 'FORM'}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
                mamh={mamh}
                goal={goal}
                id={id}
                cdio={cdio}
                desc={desc}
                setGoal={setGoal}
                setId={setId}
                setCdio={setCdio}
                setDesc={setDesc}
                handleSubmit={handleSubmitEdit}
            />
            <ConfirmDeleteForm
                open={(flag === 'ConfirmDelete')}
                onClose={() => setFlag('')}
                onSubmit={handleSubmitDelete}
                label="Chuẩn đầu ra"
                warning="Xóa chuẩn đầu ra vĩnh viễn. Không thể khôi phục."
                name={data.cdr}
            />
            <>
                <TableCell align="center">
                    {data.cdr}
                </TableCell>
                <TableCell className="break-line" >
                    {data.mota}
                </TableCell>
                <TableCell align="center" >
                    {data.cdio}
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
                            onClick={handleToggleDelete}
                        >
                            <BsTrash size="24px" />
                        </IconButton>
                    </div>
                </TableCell>
                {loading === 'ROW' && <LoadingOverlayCell />}
            </>
        </>
    )
}

export default Row