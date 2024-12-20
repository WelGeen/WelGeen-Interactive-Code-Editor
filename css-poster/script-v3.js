
const iframe = document.getElementById('imageFrame');
const imgOutput = document.getElementById('imgOutput');
const animationButtonsContainer = document.getElementById('animation-buttons');

// Wachten tot de iframe geladen is
iframe.addEventListener('load', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Verwijder active class van alle tab-buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Verwijder active class van alle tab-contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Activeer de geselecteerde tab
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
	
	// Dynamisch knoppen aanmaken
	animations.forEach(animation => {
		const button = document.createElement('button');
		button.className = 'css-button';
		button.textContent = animation.name;
		button.addEventListener('click', () => {
			cssEditor.setValue(cssEditor.getValue() + `\n${animation.code}\n${animation.keyframes}`);
		});
		animationButtonsContainer.appendChild(button);
	});
    
    // Initialiseer CodeMirror voor HTML en CSS
    const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-textarea'), {
        lineNumbers: true,
        mode: "css",
        theme: "default"
    });
    const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-textarea'), {
        lineNumbers: true,
        mode: "css",
        theme: "default"
    });
	// Stel de hoogte in voor beide editors
	cssEditor.setSize(null, "60%");
	htmlEditor.setSize(null, "60%");
	
    // Functie om alleen de inhoud van <body> te laden in de editor
    function getHtmlBodyContent() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const bodyContent = iframeDocument.body.innerHTML; // Haal de inhoud van de <body> op
        htmlEditor.setValue(bodyContent); // Plaats de inhoud in de editor
    }

    // Functie om de inhoud van de editor toe te passen op de <body>
    function setHtmlBodyContent() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.body.innerHTML = htmlEditor.getValue(); // Pas de bewerkte inhoud toe
    }

    // Functie om CSS toe te passen vanuit de editor
    function setStyleContent() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        let style = iframeDocument.getElementById('style-layers');
        if (!style) {
            style = iframeDocument.createElement('style');
            style.id = 'style-layers';
            iframeDocument.head.appendChild(style);
        }
        style.innerHTML = cssEditor.getValue();
    }

    // Functie om CSS uit de iframe op te halen
    function getStyleContent() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const style = iframeDocument.getElementById('style-layers');
        if (style) {
            cssEditor.setValue(style.innerHTML);
        }
    }

    // "Run"-knop functionaliteit
    document.getElementById('runBtn').addEventListener('click', () => {
        setHtmlBodyContent();
        setStyleContent();
    });

    // "Save"-knop functionaliteit
    document.getElementById('savBtn').addEventListener('click', () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const htmlContent = iframeDocument.documentElement.outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'template.weg';
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

    // "Fetch Image"-knop functionaliteit
    document.getElementById('imgBtn').addEventListener('click', () => {
        fetch('https://welgeen.nl/beeldbank/random.php')
            .then(response => response.text())
            .then(data => {
                imgOutput.innerText = data;
            })
            .catch(() => {
                imgOutput.innerText = 'Error fetching data.';
            });
    });
	
	// Select the dropdown element
	const blendModeSelect = document.getElementById('blendMode');
	blendModeSelect.addEventListener('change', function () {
		// Get the selected value
		const selectedBlendMode = blendModeSelect.value;
		cssEditor.setValue(cssEditor.getValue() + `\nmix-blend-mode: ${selectedBlendMode}`);

	});
	
	const filterSelect = document.getElementById('filter');

	filterSelect.addEventListener('change', function () {
		const selectedFilter = filterSelect.value;
		cssEditor.setValue(cssEditor.getValue() + `\nfilter : ${selectedFilter}`);
	});

	
	 getHtmlBodyContent();
     getStyleContent();
	 console.log("test");
});
	
