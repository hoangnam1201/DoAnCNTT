import { CircularProgress, TableCell } from "@material-ui/core"
import styled from "styled-components"

export const ErrorPage = () => (
    <div className="h-100 d-flex justify-content-center align-items-centers">
        <h1>Rất tiếc trang không khả dụng.</h1>
    </div>
)

export const LoadingPage = () => (
    <div className="h-100 d-flex justify-content-center align-items-center">
        <CircularProgress />
    </div>
)

const LoadingWrapper = styled.div`
    position:absolute;
    background-color: rgba(0,0,0,.25);
    left:0;
    top:0;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:99999;
`

export const LoadingOverlay = () => (
    <LoadingWrapper>
        <CircularProgress className="text-white" />
    </LoadingWrapper>
)

export const LoadingCellOverlay = () => (
    <TableCell style={{ top: 0, left: 0 }}
        className="position-absolute overlay flex-center p-0 w-100 h-100">
        <CircularProgress className="text-white" />
    </TableCell>
)