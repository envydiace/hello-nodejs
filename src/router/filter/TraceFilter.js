const TraceFilter = (req, res, next) => {
    console.log('Request time: ', new Date(Date.now()))
    console.log(`Request path: ${req.path}`)
    next()
}
export default TraceFilter;