import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../store/actions/courses.action";

const { TableRow, TableCell, IconButton, CircularProgress } = require("@material-ui/core");
const { AiFillInfoCircle } = require("react-icons/ai");
const { BsTrash } = require("react-icons/bs");
const { Link } = require("react-router-dom");

const CourseRow = (props) => {
    const [deleting, setDeleting] = useState(false)
    const dispatch = useDispatch()
    const row = props.row

    const handleDelete = async () => {
        setDeleting(true)
        dispatch(deleteCourse(row.mamh))
    }

    return (
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
                <IconButton className="p-0 mx-3 text-danger">
                    <BsTrash
                        size="24px"
                        onClick={() => handleDelete(row.mamh)}
                    />
                </IconButton>
            </TableCell>
            {deleting && (
                <TableCell
                    width="100%"
                    height="100%"
                    className="border-none d-flex align-items-center justify-content-center"
                    style={{ position: 'absolute', left: "0", background: "rgba(0,0,0,.5)" }}
                >
                    <CircularProgress className="text-white" />
                </TableCell>
            )}
        </TableRow>
    )
}

export default CourseRow