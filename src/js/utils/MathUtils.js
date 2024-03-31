export const deg2rad = (deg) => {
    return deg * Math.PI / 180
}

export const distance2D = (x1, y1, x2, y2) => {
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy) // Theorème de Pythagore : https://fr.wikipedia.org/wiki/Th%C3%A9or%C3%A8me_de_Pythagore
}

export const randomRange = (min, max) => {
    return min + Math.random() * (max - min)
}