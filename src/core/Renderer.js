export default class Renderer {

    constructor(root) {
        this.root = root;
    }

    clear() {
        this.root.innerHTML = "";
    }

    render(...elements) {

        this.clear();

        elements.forEach(el => {
            this.root.appendChild(el);
        });

    }

}