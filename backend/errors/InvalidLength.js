export class InvalidLength extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidLength'
    }
}