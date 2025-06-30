// Compare date of messages and verify is same date
export function isSameDate(prevMessage, nextMessage) {
    const datePrevMessage = new Date(prevMessage)
    const dateNextMessage = new Date(nextMessage)
    return datePrevMessage.getFullYear() === dateNextMessage.getFullYear() &&
           datePrevMessage.getMonth() === dateNextMessage.getMonth() &&
           datePrevMessage.getDate() === dateNextMessage.getDate()
}