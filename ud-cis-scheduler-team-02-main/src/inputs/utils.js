export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
        date = time;
    } else {
        if (`${time}`.length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
    } 
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
            return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][value]; 
        }
        if (result.length > 0 && value < 10) {
            value = `0${value}`;
        }
        return value || 0;
    });
    return time_str;
}