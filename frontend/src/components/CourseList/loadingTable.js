import { TableCell, TableRow } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"

const LoadingCell = () => (
    <TableCell><Skeleton animation="wave"/></TableCell>
)

const LoadingRow = () => (
    <TableRow>
        <LoadingCell />
        <LoadingCell />
        <LoadingCell />
        <LoadingCell />
        <LoadingCell />
        <LoadingCell />
    </TableRow>
)

const LoadingTable = () => (
    <>
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
    </>
)


export default LoadingTable