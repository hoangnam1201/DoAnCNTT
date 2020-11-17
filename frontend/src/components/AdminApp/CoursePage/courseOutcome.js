import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { LoadingRows } from "../SituationRow"

const CourseOutcome = () => {
    return <TableContainer className="p-2" component={Paper}>
        <Table style={{minWidth:"700px"}}>
            <TableHead>
                <TableRow>
                    <TableCell width="100px" align="center" size="small">
                        Mục tiêu
                    </TableCell>
                    <TableCell width="110px" align="center" size="small">
                        Chuẩn đầu ra HP
                    </TableCell>
                    <TableCell align="center" size="small">
                        Mô tả
                    </TableCell>
                    <TableCell width="150px" align="center" size="small">
                        Chuẩn đầu ra CDIO
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <LoadingRows col={4} />
            </TableBody>
        </Table>
    </TableContainer>
}

export default CourseOutcome