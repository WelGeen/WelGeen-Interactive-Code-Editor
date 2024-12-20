const iframe = document.getElementById('imageFrame');
const imgOutput = document.getElementById('imgOutput');
const animationButtonsContainer = document.getElementById('animation-buttons');

	// CodeMirror initialisatie
	const editor = CodeMirror.fromTextArea(document.getElementById('css-textarea'), {
		lineNumbers: true,
		mode: "css",
		theme: "default"
	});
	

// Functie om CSS toe te passen vanuit de textarea
    function setStyleContent() {
		const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        let style = iframeDocument.getElementById('style-layers');
        if (!style) {
            style = iframeDocument.createElement('style');
            style.id = 'style-layers';
            iframeDocument.head.appendChild(style);
        }
        style.innerHTML = editor.getValue();
    }

    // Functie om de huidige stijl op te halen en in de textarea te plaatsen
    function getStyleContent() {
		const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const style = iframeDocument.getElementById('style-layers');
        if (style) {
           editor.setValue( style.innerHTML) ;
        }
    }

	// Dynamisch knoppen aanmaken
	animations.forEach(animation => {
		const button = document.createElement('button');
		button.className = 'css-button';
		button.textContent = animation.name;
		button.addEventListener('click', () => {
			editor.setValue(editor.getValue() + `\n${animation.code}\n${animation.keyframes}`);
		});
		animationButtonsContainer.appendChild(button);
	});

	// RUN-knop
	document.getElementById('cssBtn').addEventListener('click', () => {
		const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
		let style = iframeDocument.getElementById('style-layers');
		if (!style) {
			style = iframeDocument.createElement('style');
			style.id = 'style-layers';
			iframeDocument.head.appendChild(style);
		}
		style.innerHTML = editor.getValue();
	});

	// SAVE-knop
	document.getElementById('savBtn').addEventListener('click', () => {
		const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
		const htmlContent = iframeDocument.documentElement.outerHTML;
		const blob = new Blob([htmlContent], { type: 'text/html' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = 'template.weg';
		a.click();
	});

	// OPEN-knop
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

	// IMG-knop
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
	
	// Wachten tot de iframe geladen is
	iframe.addEventListener('load', () => {
		getStyleContent(); // Zorg dat textarea bij het laden gevuld wordt met bestaande stijl

	});
