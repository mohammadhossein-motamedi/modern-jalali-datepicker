export function createTime(data) {
    const hour = String(data.hour ?? 0).padStart(2, "0");
    const minute = String(data.minute ?? 0).padStart(2, "0");
    const second = String(data.second ?? 0).padStart(2, "0");

    return `${hour}:${minute}:${second}`;
}