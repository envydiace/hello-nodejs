const Utils = {
    sleep: (waitTimeInMs) =>
        new Promise((resolve) => setTimeout(resolve, waitTimeInMs)),
    addSecond: (date, second) => {
        return new Date(date.getTime() + second);
    },
    groupBy: key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {})
}

export default Utils;