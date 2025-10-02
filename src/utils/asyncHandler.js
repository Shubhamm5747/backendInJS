//promise version of same what we did below
//we use it to handle async methods happening in our app
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err)=>next(err))
    }
}

export { asyncHandler }














/*
// const asyncHandler = () => {}
// const asyncHandler = (func) => {() => {}}
// const asyncHandler = (func) => async () => {}

//made a wrapper function that we gonna use everywhere and it will make our life easy
//try and catch version
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success : true,
            message : error.message
        })
    }
}
*/
