const msg: string = "Hello!";
alert(msg);


interface StylesDictionary {
    [key: string]: string;
}

const styles: StylesDictionary = {
    default: "style/style1.css",
    dark: "style/style2.css",
    light: "#",
    extra: "#",
};

let currentStyle: string = "default";

function changeStyle(styleName: string): void {
    const linkElement = document.getElementById("dynamic-style") as HTMLLinkElement;

    if (!linkElement || !styles[styleName]) {
        console.error("Nie znaleziono elementu <link> lub stylu!");
        return;
    }

    linkElement.href = styles[styleName];
    currentStyle = styleName;
}

function generateStyleLinks(): void {
    const stylesContainer = document.getElementById("styles-container");

    if (!stylesContainer) {
        console.error("Nie znaleziono elementu do osadzenia linków!");
        return;
    }

    for (const [styleName, stylePath] of Object.entries(styles)) {
        const link = document.createElement("a");
        link.href = "#";
        link.className = "change-style";
        link.setAttribute("data-style", styleName);
        link.textContent = styleName.charAt(0).toUpperCase() + styleName.slice(1); 
        stylesContainer.appendChild(link);

        const separator = document.createTextNode(" | ");
        stylesContainer.appendChild(separator);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    generateStyleLinks(); 
    const styleLinks = document.querySelectorAll(".change-style");
    styleLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
            const styleName = target.getAttribute("data-style");
            if (styleName) {
                changeStyle(styleName);
            }
        });
    });
});
