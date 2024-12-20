// Lijst met CSS-animaties en keyframes
const animations = [
    { name: "Slide In", code: "animation: slidein 3s ease-in 1s infinite reverse both;", keyframes: `@keyframes slidein { from { transform: translateX(0); } to { transform: translateX(100px); } }` },
    { name: "Fade In", code: "animation: fadein 2s;", keyframes: `@keyframes fadein { from { opacity: 0; } to { opacity: 1; } }` },
    { name: "Bounce", code: "animation: bounce 2s infinite;", keyframes: `@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }` },
    { name: "Rotate", code: "animation: rotate 3s linear infinite;", keyframes: `@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }` },
    { name: "Scale Up", code: "animation: scaleup 2s infinite;", keyframes: `@keyframes scaleup { from { transform: scale(1); } to { transform: scale(1.5); } }` },
    { name: "Shrink", code: "animation: shrink 2s infinite;", keyframes: `@keyframes shrink { from { transform: scale(1.5); } to { transform: scale(1); } }` },
    { name: "Flash", code: "animation: flash 1s infinite;", keyframes: `@keyframes flash { 50% { opacity: 0; } }` },
    { name: "Spin", code: "animation: spin 1.5s linear infinite;", keyframes: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }` },
    { name: "Wiggle", code: "animation: wiggle 1s infinite;", keyframes: `@keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }` },
    { name: "Pulse", code: "animation: pulse 2s infinite;", keyframes: `@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }` },
];