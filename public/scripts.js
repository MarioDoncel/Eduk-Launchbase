const currentPage = location.pathname
const menuItems = document.querySelectorAll("header nav a")

for (const item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add("active")
    }
}