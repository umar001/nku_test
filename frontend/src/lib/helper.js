

export const checkApiResponse = (response) => {
    if (response.hasOwnProperty('error')) {
        return false
    }
    return true
}