export const ErrorHelper = err => {
    if (!err.response)
        return 'Lỗi máy chủ'
    const message = err.response.data.name
    if (Array.isArray(message))
        return message.join('')
    return message
}