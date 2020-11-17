import styled from "styled-components"
import { BiSad } from 'react-icons/bi'
import { Link } from "react-router-dom"
import { TableCell } from "@material-ui/core"

const Wrapper = styled.div`
    height:250px;
    justify-content:center;
    align-items:center;
    display:flex;
    flex-direction:column;
`

const EmptyTable = () => (
    <TableCell colSpan="100%">
        <Wrapper >
            <BiSad className="text-secondary" size="70px" />
            <h3 style={{ fontSize: "25px" }} className="section-title m-0">
                Không tìm thấy môn học!
        </h3>
            <p className="text-secondary">
                Không tồn tại môn học đang tìm, vui lòng kiểm tra lại hoặc&nbsp;
            <Link to="/course/create">
                    tạo mới!
            </Link>
            </p>
        </Wrapper>
    </TableCell>
)

export default EmptyTable