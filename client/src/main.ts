import {GGHttpClientConfig} from "@grest-ts/http"
import {HelloApi} from "@dummy-node/api/api/HelloApi"

// Create typed API client. Vite proxy forwards /api/* to the server.
const clientConfig: GGHttpClientConfig = {url: ""}
const helloApi = HelloApi.createClient(clientConfig)

// Tiny pushState router so navigating changes the URL — exercises the built-in
// browser's back/forward buttons (and the address bar, via Vite's SPA fallback
// for a full reload on a deep path).
const routes = [
    {path: "/", label: "Home"},
    {path: "/about", label: "About"},
    {path: "/items", label: "Items"},
]

const nav = document.getElementById("nav") as HTMLElement
const view = document.getElementById("view") as HTMLElement

function go(path: string) {
    if (location.pathname === path) return
    history.pushState({}, "", path)
    render()
}

function link(path: string, label: string): HTMLAnchorElement {
    const a = document.createElement("a")
    a.href = path
    a.textContent = label
    a.addEventListener("click", (e) => { e.preventDefault(); go(path) })
    return a
}

function renderNav() {
    nav.replaceChildren()
    for (const r of routes) {
        const a = link(r.path, r.label)
        if (location.pathname === r.path) a.className = "active"
        nav.append(a)
    }
}

function renderItems() {
    const card = document.createElement("div")
    card.className = "card"
    const h = document.createElement("h2")
    h.textContent = "Items"
    const ul = document.createElement("ul")
    for (let i = 1; i <= 5; i++) {
        const li = document.createElement("li")
        li.append(link(`/items/${i}`, `Item ${i}`))
        ul.append(li)
    }
    card.append(h, ul)
    view.replaceChildren(card)
}

function renderHome() {
    view.innerHTML = `<div class="card">
        <input type="text" id="nameInput" placeholder="Enter your name..." value="World"/>
        <button id="callBtn">Call HelloApi</button>
        <div id="result"></div>
    </div>`
    const nameInput = document.getElementById("nameInput") as HTMLInputElement
    const callBtn = document.getElementById("callBtn") as HTMLButtonElement
    const resultDiv = document.getElementById("result") as HTMLDivElement
    callBtn.addEventListener("click", async () => {
        try {
            const response = await helloApi.hello({name: nameInput.value})
            resultDiv.textContent = response.message
            resultDiv.style.display = "block"
            resultDiv.className = ""
        } catch (err) {
            resultDiv.textContent = "Error: " + String(err)
            resultDiv.style.display = "block"
            resultDiv.className = "error"
        }
    })
}

function render() {
    renderNav()
    const path = location.pathname
    if (path === "/about") {
        view.innerHTML = `<div class="card"><h2>About</h2><p>A dummy project used to test the built-in browser. Click the links, type a URL, then use the back/forward buttons.</p></div>`
    } else if (path === "/items") {
        renderItems()
    } else if (path.startsWith("/items/")) {
        const id = path.split("/")[2]
        view.innerHTML = `<div class="card"><h2>Item ${id}</h2><p>Detail page for item ${id}. Press Back to return to the list.</p></div>`
    } else {
        // Home keeps the original Hello API card (smoke test clicks #callBtn on /).
        renderHome()
    }
}

window.addEventListener("popstate", render)
render()
