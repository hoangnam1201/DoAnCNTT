import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useBreadcrumbs, { routeConfig } from "../../hooks/useBreadcrumbs"
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../store/actions/courses.action';
import CourseRow from './courseRow';
import { useState } from 'react';
import FilterBar from './filter';
import ErrorRow from '../common/ErrorRow';
import EmptyRow from '../common/EmptyRow';
import LoadingRows from '../common/LoadingRows';

const removeAccents = str => {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}


const CourseList = () => {
    const initialFilter = {
        tenmh: '',
        sotinchi: '',
        bomon: '',
        phanloai: ''
    }

    const dispatch = useDispatch()
    const breadcrumbs = useBreadcrumbs(routeConfig)
    const courseList = useSelector(state => state.courses)
    const [filter, setFilter] = useState(initialFilter)
    const filteredCourseList = !courseList.data
        ? []
        : courseList.data.filter(course => (
            removeAccents(course.tenmh).toLowerCase()
                .includes(removeAccents(filter.tenmh).toLowerCase()) &&
            course.bomon.includes(filter.bomon) &&
            course.phanloai.includes(filter.phanloai) &&
            course.sotinchi.toString().includes(filter.sotinchi)
        ))

    useEffect(() => {
        if (!courseList.data)
            dispatch(fetchCourses())
    }, [dispatch, courseList.data])

    const refresh = () => {
        if (!courseList.loading)
            dispatch(fetchCourses())
    }

    return (
        <>
            <div>
                <Breadcrumbs separator={<MdKeyboardArrowRight size="1.2em" />} className="page-breadcrumb">
                    {breadcrumbs.map(breadcrumb => (
                        <Link to={breadcrumb.path}>
                            {breadcrumb.name}
                        </Link>
                    ))}
                </Breadcrumbs>
                <h3 className="page-title">
                    Danh sách các môn học
                </h3>
                <hr />
            </div>
            <TableContainer elevation={3} component={Paper} className="light-grey-bg">
                <FilterBar
                    filter={filter}
                    setFilter={setFilter}
                    initialFilter={initialFilter}
                    refresh={refresh}
                />
                <Table style={{ minWidth: "920px" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell width="150px">Mã môn học</TableCell>
                            <TableCell>Tên môn học</TableCell>
                            <TableCell width="120px" align="center">Số tín chỉ</TableCell>
                            <TableCell width="190px">Bộ môn</TableCell>
                            <TableCell width="100px">Phân loại</TableCell>
                            <TableCell width="120px" align='center'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="bg-white">
                        {
                            courseList.loading
                                ? <LoadingRows col={6} />
                                : courseList.error
                                    ? <ErrorRow refresh={refresh} />
                                    : filteredCourseList.length !== 0
                                        ? filteredCourseList.map(row => (
                                            <CourseRow row={row} key={row.mamh} />
                                        ))
                                        : <EmptyRow
                                            header="Không tìm thấy môn học!"
                                            text={(
                                                <p className="text-secondary">
                                                    Không tồn tại môn học đang tìm, vui lòng kiểm tra lại hoặc&nbsp;
                                                    <Link to="/course/create">
                                                        tạo mới!
                                                    </Link>
                                                </p>
                                            )}
                                        />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CourseList