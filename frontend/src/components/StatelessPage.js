import { CircularProgress } from "@material-ui/core"

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