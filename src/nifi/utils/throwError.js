function fn(err) {
    if (err != undefined) throw new Error(err);

    throw new Error(`抱歉，意外事件发生。`)
}
export default fn