document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');
            
            // Resize image to fit into a max-width of 600px while preserving aspect ratio
            const maxWidth = 900;
            const aspectRatio = img.width / img.height;
            let newWidth = maxWidth;
            let newHeight = newWidth / aspectRatio;

            if (newHeight > 700) {
                newHeight = 700;
                newWidth = newHeight * aspectRatio;
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            // canvas.width = img.width;
            // canvas.height = img.height;

            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            // ctx.drawImage(img, 0, 0);
            enableClickToGetColor(canvas, ctx);
            generateColorPalette(img);
        };
        img.src = URL.createObjectURL(file);
    }
});

function enableClickToGetColor(canvas, ctx) {
    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const rgbValue = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
        document.getElementById('colorValue').textContent = rgbValue;
        document.getElementById('colorValue').style.color = rgbValue;
    });
}

function generateColorPalette(image) {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(image, 6);
    const paletteContainer = document.getElementById('colorPalette');
    paletteContainer.innerHTML = '';
    palette.forEach(color => {
        const colorDiv = document.createElement('div');
        const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        colorDiv.style.backgroundColor = rgbColor;
        paletteContainer.appendChild(colorDiv);
        console.info('color:', color);
    });
}
