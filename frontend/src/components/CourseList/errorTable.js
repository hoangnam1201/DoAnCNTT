import styled from "styled-components"
import { BiErrorCircle } from 'react-icons/bi'
import { Button, TableCell } from "@material-ui/core"

const Wrapper = styled.div`
    height:250px;
    justify-content:center;
    align-items:center;
    display:flex;
    flex-direction:column;
`

const ErrorTable = ({ refresh }) => (
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


export default ErrorTable