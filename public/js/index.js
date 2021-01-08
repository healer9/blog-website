const navLinks = document.getElementsByClassName('navLink')
console.log(navLinks)

for (let i = 0; i < navLinks.length; i++) {
    console.log(navLinks[i])
    navLinks[i].addEventListener('click', () => {
        let current = document.getElementsByClassName('active')
        console.log(`click`)
        console.log(current[0])
        current[0].className = current[0].className.replace(' active', '')
        this.className += ' active'
    })
}
