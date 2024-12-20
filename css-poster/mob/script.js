const iframe = document.getElementById('imageFrame');
const FiltersList = [
	"none", "blur(5px)", "brightness(150%)", "contrast(200%)", "grayscale(100%)",
	"hue-rotate(90deg)", "invert(100%)", "opacity(50%)", "saturate(300%)", "sepia(100%)"
];

const BlendModesList = [
    "normal", "multiply", "screen", "overlay", "darken", "lighten",
    "color-dodge", "color-burn", "hard-light", "soft-light",
    "difference", "exclusion", "hue", "saturation", "color", "luminosity"
];
var SELECT;
// Wachten tot de iframe geladen is
iframe.addEventListener('load', () => {
    console.log('Wachten tot de iframe geladen is'); 
});	

function selectLayer(){
	const selectedLayer = document.querySelector('input[name="layer"]:checked').value;
	console.log("Geselecteerde laag:", selectedLayer);
	SELECT = selectDivFromIframe(selectedLayer);
}
 
// "Image"-knop functionaliteit
document.getElementById('imgBtn').addEventListener('click', () => {
	const randomItem = img_data[Math.floor(Math.random() * img_data.length)];
	if (SELECT) {
		SELECT.style.backgroundImage = "url('https://welgeen.nl/beeldbank/"+randomItem+"')";
	} else {
		alert("Div niet gevonden.");
	}
});

// "Gif"-knop functionaliteit
document.getElementById('gifBtn').addEventListener('click', () => {
	const randomItem = gif_data[Math.floor(Math.random() * gif_data.length)];
	if (SELECT) {
		SELECT.style.backgroundImage = "url('https://welgeen.nl/beeldbank/"+randomItem+"')";
	} else {
		alert("Div niet gevonden.");
	}
});

// "Filter 
document.getElementById('filBtn').addEventListener('click', () => {
	if (SELECT) {
		SELECT.style.filter = FiltersList[Math.floor(Math.random() * FiltersList.length)];
	} else {
		alert("Div niet gevonden.");
	}
});

// "BlendModesList
document.getElementById('bleBtn').addEventListener('click', () => {
	if (SELECT) {
		SELECT.style.mixBlendMode = BlendModesList[Math.floor(Math.random() * BlendModesList.length)];
	} else {
		alert("Div niet gevonden.");
	}
});
function selectDivFromIframe(index) {
	try {
		// Controleer of de iframe geladen is en toegang heeft tot inhoud (zelfde domein)
		if (iframe && iframe.contentDocument) {
			const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			// Selecteer alle <div>-elementen in de iframe
			const divs = iframeDoc.querySelectorAll("div");

			// Controleer of het index geldig is
			if (index >= 0 && index < divs.length) {
				const selectedDiv = divs[index];
				console.log("Geselecteerde div:", selectedDiv);
				
				return selectedDiv;
			} else {
				console.error("Index buiten bereik. Er zijn slechts", divs.length, "divs beschikbaar.");
			}
		} else {
			console.error("Kan iframe-inhoud niet benaderen. Controleer of het iframe geladen is.");
		}
	} catch (error) {
		console.error("Fout bij het ophalen van div uit iframe:", error);
	}
}

// "Save"-knop functionaliteit
document.getElementById('savBtn').addEventListener('click', () => {
	const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
	const htmlContent = iframeDocument.documentElement.outerHTML;
	const blob = new Blob([htmlContent], { type: 'text/html' });
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = 'template-mob.weg';
	a.click();
});

// "Open"-knop functionaliteit
document.getElementById('opnBtn').addEventListener('click', () => {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.weg';
	input.onchange = event => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = e => {
			const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
			iframeDoc.open();
			iframeDoc.write(e.target.result);
			iframeDoc.close();
		};
		reader.readAsText(file);
	};
	input.click();
});

