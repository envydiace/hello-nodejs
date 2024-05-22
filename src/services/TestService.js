const TestService = {
    testPromise: (param) => {
        return new Promise((resolve, reject) => {
            if (param === 'success') {
                resolve('Success')
            } else {
                reject('Error')
            }
        })
    }
}

export default TestService;