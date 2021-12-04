import Alpine from 'alpinejs'

window.addEventListener('DOMContentLoaded', () => {
    window.Alpine = Alpine
    window.Alpine.start()
})

document.addEventListener('alpine:init', () => {
    Alpine.data('converter', () => ({
        text: '',
        bytes: '',
        error: false,
        handleReset() {
            this.text = ''
            this.bytes = ''
            this.error = false
        },
        init() {
            this.$watch('text', () => {
                const text = this.text.trim()
                if (text.length > 0) {
                    this.bytes = textToBinary(text)
                }
            })
            this.$watch('bytes', () => {
                if (this.bytes.length > 0) {
                    if (isBinary(this.bytes)) {
                        this.text = BinaryToText(this.bytes)
                        this.error = false
                    } else {
                        this.error = true
                    }
                }
            })
        }
    }))
})

function textToBinary(text) {
    let bytes = ''
    for (const byte of text) {
        bytes += byte.charCodeAt().toString(2) + ' '
    }
    return bytes.trimEnd()
}

function BinaryToText(bytes) {
    let text = ''
    bytes.split(' ').map((byte) => {
        text += String.fromCharCode(parseInt(byte, 2))
    })
    return text
}

function isBinary(bytes) {
    bytes = bytes.split(' ')
    if (/[0-1 ]+$/.test(bytes)) {
        return true
    }
    return false
}
