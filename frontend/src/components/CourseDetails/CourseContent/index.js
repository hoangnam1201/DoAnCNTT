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
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default CourseContent