export class MissingFieldError extends Error {
    constructor(message){
        super(message)
        this.name = 'MissingFieldError'
    }
}