import axios from "axios";

const baseURL = "http://localhost:3001/api";

const http = axios.create({ baseURL, timeout: 7500 });

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

//Chinh sua 1 mon hoc
export const updateCourse = (mamh, data) => {
    return http.put(`/monhoc/${mamh}`, data)
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

export const getCourseGoalList = mamh => {
    return http.get(`/monhoc/${mamh}/muctieu/list`).then(res => res.data)
}

export const createCourseGoal = (mamh, data) => {
    return http.post(`/monhoc/${mamh}/muctieu`, data)
}

export const deleteCourseGoal = (mamh, muctieu) => {
    return http.delete(`/monhoc/${mamh}/muctieu/${muctieu}`)
}

export const updateCourseGoal = (mamh, muctieu, data) => {
    return http.put(`/monhoc/${mamh}/muctieu/${muctieu}`, data)
}

//Chuan dau ra
export const getCourseOutcome = mamh => {
    return http.get(`/monhoc/${mamh}/chuandaura`).then(res => res.data)
}

export const createCourseOutcome = (mamh, muctieu, data) => {
    return http.post(`/monhoc/${mamh}/chuandaura/${muctieu}`, data)
}

export const updateCourseOutcome = (mamh, muctieu, outcome, data) => {
    return http.put(`/monhoc/${mamh}/chuandaura/${muctieu}/${outcome}`, data)
}
//Danh gia

export const getCourseEvualate = mamh =>{
    return http.get(`/monhoc/${mamh}/danhgia`).then(res =>res.data)
}
export const createCourseEvualate = (mamh, data)=>{
    return http.post(`/monhoc/${mamh}/danhgia`,data)
}
export const deleteCourseEvualate = (mamh) => {
    return http.delete(`/monhoc/${mamh}/danhgia`)
}
export const updateCourseEvualate = (mamh, data) => {
    return http.put(`/monhoc/${mamh}/danhgia`, data)
}
//Noi dung
export const getCourseContent = mamh =>{
    return http.get(`/monhoc/${mamh}/noidungchitiet`).then(res => res.data)
}
export const createCourseContent = (mamh, data) =>{
    return http.post(`/monhoc/${mamh}/noidungchitiet`,data)
}
export const deleteCourseContent = mamh =>{
    return http.delete(`/monhoc/${mamh}/noidungchitiet`)
}
export const updateCourseContent =(mamh, data) =>{
    return http.put(`/monhoc/${mamh}/noidungchitiet`,data)
}