


export function shortenDescription(description: string) {
    const maxlength: number = 100

    if (description.length <= maxlength) {
        return description
    }
    return description.slice(0, maxlength - 3) + "..."
}