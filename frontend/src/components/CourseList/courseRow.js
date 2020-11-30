import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../store/actions/courses.action";
import { LoadingOverlay } from "../StatelessComponents";

const { TableRow, TableCell, IconButton, Dialog, Card, CardHeader, CardContent } = require("@material-ui/core");
const { AiFillInfoCircle } = require("react-icons/ai");
const { BsTrash } = require("react-icons/bs");
const { Link } = require("react-router-dom");

const CourseRow = (props) => {
    const [deleting, setDeleting] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const dispatch = useDispatch()
    const row = props.row

    const handleDelete = () => {
        setDeleteDialog(true)
    }

    const onDelete = async () => {
        setDeleting(true)
        dispatch(deleteCourse(row.mamh))
    }

    return (
        <>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <Card className="p-3">
                    {deleting && <LoadingOverlay />}
                    <CardHeader
                        disableTypography
                        title={`Xóa môn học`}
                        className="page-title primary-logo-color"
                    />
                    <CardContent>
                        Xác nhận xóa môn&nbsp;
                        <span className="font-weight-bold font-italic">
                            {row.tenmh}
                        </span>.
                    </CardContent>
                    <div>
                        <button
                            onClick={onDelete}
                            className="btn btn-block btn-danger"
                        >
                            Xóa
                        </button>
                        <button
                            onClick={() => setDeleteDialog(false)}
                            className="btn btn-block btn-light"
                        >
                            Hủy
                        </button>
                    </div>
                </Card>
            </Dialog>
            <TableRow key={row.mamh}
                style={{ transform: "scale(1)" }}
                className="position-relative">
                <TableCell component="th" scope="row">
                    {row.mamh}
                </TableCell>
                <TableCell>{row.tenmh}</TableCell>
                <TableCell align="center">{row.sotinchi}</TableCell>
                <TableCell>{row.bomon}</TableCell>
                <TableCell>{row.phanloai}</TableCell>
                <TableCell align='center'>
                    <IconButton className="p-0 mx-3 text-danger">
                        <Link style={{ lineHeight: "1em" }} to={`/course/${row.mamh}`}>
                            <AiFillInfoCircle size="24px" />
                        </Link>
                    </IconButton>
                    <IconButton
                        className="p-0 mx-3 text-danger"
                        onClick={() => handleDelete(row.mamh)}
                    >
                        <BsTrash
                            size="24px"
                        />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    )
}

export default CourseRow