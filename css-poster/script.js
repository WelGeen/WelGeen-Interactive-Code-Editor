const iframe = document.getElementById('imageFrame');
const imgOutput = document.getElementById('imgOutput');

const htmlEditor = document.getElementById('html-textarea');
const cssEditor = document.getElementById('css-textarea');

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
			cssEditor.value = `\n${animation.code}\n${animation.keyframes}`; 
		});
		animationButtonsContainer.appendChild(button);
	});
    

    // Functie om alleen de inhoud van <body> te laden in de editor
    function getHtmlBodyContent() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const bodyContent = iframeDocument.body.innerHTML; // Haal de inhoud van de <body> op
		
        htmlEditor.value = bodyContent; // Plaats de inhoud in de editor
    }

    // Functie om de inhoud van de editor toe te passen op de <body>
    function setHtmlBodyContent() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.body.innerHTML = htmlEditor.value; // Pas de bewerkte inhoud toe
    }

    // Functie om CSS toe te passen vanuit de editor
    function setStyleContent() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        let style = iframeDocument.getElementById('style-layers');
        if (!style) {
           alert("help!!!!");
		   return 0;
        }
		style.innerHTML = cssEditor.value;
    }

    // Functie om CSS uit de iframe op te halen
    function getStyleContent() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const style = iframeDocument.getElementById('style-layers');
        if (style) {
            cssEditor.value = style.innerHTML;
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
				getHtmlBodyContent();
				getStyleContent();
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
		cssEditor.value = cssEditor.value + `\nmix-blend-mode: ${selectedBlendMode}`;
	});
	
	const filterSelect = document.getElementById('filter');

	filterSelect.addEventListener('change', function () {
		const selectedFilter = filterSelect.value;
		cssEditor.value = cssEditor.value + `\nfilter : ${selectedFilter}`;
	});

	
	 getHtmlBodyContent();
     getStyleContent();

});
	
