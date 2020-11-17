import axios from "axios";

const baseURL = "http://localhost:3001/api";

const http = axios.create({ baseURL, timeout: 4000 });

//Tao mon hoc
export const createCourse = data => {
    return http.post('/monhoc', data)
}

//Danh sach mon hoc
export const getCourses = () => {
    return http.get('/monhoc').then(res => res.data)
}

//Xoa 1 mon hoc
export const deleteCourse = mamh => {
    return http.delete(`/monhoc/${mamh}`)
}

////Chi tiet mon hoc
//Thong tin chung
export const getCourseInfo = mamh => {
    return http.get(`/monhoc/${mamh}`).then(res => res.data)
}

//Muc tieu
export const getCourseGoal = mamh => {
    return http.get(`/monhoc/${mamh}/muctieu`).then(res => res.data)
}

export const createCourseGoal = (mamh, data) => {
    return http.post(`/monhoc/${mamh}/muctieu`, data).then(res => res.data)
}

//Chuan dau ra
export const getCourseOutcome = mamh => {
    return http.get(`/monhoc/${mamh}/chuandaura`).then(res => res.data)
}
