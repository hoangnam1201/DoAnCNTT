import { TableCell, TableRow } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"

const LoadingCell = () => (
    <TableCell><Skeleton animation="wave" /></TableCell>
)

const LoadingRow = ({ col }) => (
    <TableRow>
        {[...Array(col).keys()].map(() => <LoadingCell />)}
    </TableRow>
)

const LoadingRows = ({ col }) => (
    <>
        <LoadingRow col={col} />
        <LoadingRow col={col} />
        <LoadingRow col={col} />
        <LoadingRow col={col} />
    </>
)

export default LoadingRows