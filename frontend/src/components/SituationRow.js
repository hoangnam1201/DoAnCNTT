import { Button, TableCell, TableRow } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { BiErrorCircle, BiSad } from "react-icons/bi"
import styled from "styled-components"

const LoadingCell = () => (
    <TableCell><Skeleton animation="wave" /></TableCell>
)

const LoadingRow = ({ col }) => (
    <TableRow>
        {[...Array(col).keys()].map(() => <LoadingCell />)}
    </TableRow>
)

export const LoadingRows = ({ col }) => (
    <>
        <LoadingRow col={col} />
        <LoadingRow col={col} />
        <LoadingRow col={col} />
        <LoadingRow col={col} />
    </>
)

const Wrapper = styled.div`
    height:250px;
    justify-content:center;
    align-items:center;
    display:flex;
    flex-direction:column;
`

export const EmptyRow = ({ error, subError }) => (
    <TableCell colSpan="100%">
        <Wrapper >
            <BiSad className="text-secondary" size="70px" />
            <h3 style={{ fontSize: "25px" }} className="section-title m-0">
                {error}
            </h3>
            <p className="text-secondary">
                {subError}
            </p>
        </Wrapper>
    </TableCell>
)

export const ErrorRow = ({ refresh }) => (
    <TableCell colSpan="100%">
        <Wrapper >
            <BiErrorCircle className="text-danger" size="70px" />
            <h3 style={{ fontSize: "25px" }} className="section-title m-0">
                Lỗi máy chủ!
            </h3>
            <Button onClick={refresh} variant="contained" className="font-weight-bold">
                Tải lại
            </Button>
        </Wrapper>
    </TableCell>
)