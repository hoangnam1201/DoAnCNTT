import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { LoadingRows } from "../../SituationRow"

const CourseEvualate = () => {
    return <TableContainer className="p-2" component={Paper}>
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
                </TableRow>
            </TableHead>
            <TableBody>
                <LoadingRows col={6} />
            </TableBody>
        </Table>
    </TableContainer>
}

export default CourseEvualate