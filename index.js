const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/flames', (req, res) => {
    const { name1, name2 } = req.body;
    const result = calculateFlames(name1, name2);
    res.send(result);
});

function calculateFlames(name1, name2) {
    const flames = [
        { text: 'Friends', emoji: '😊' },
        { text: 'Love', emoji: '❤️' },
        { text: 'Affection', emoji: '😍' },
        { text: 'Marriage', emoji: '💍' },
        { text: 'Enemies', emoji: '😠' },
        { text: 'Siblings', emoji: '👫' }
    ];

    let combined = name1.toLowerCase().replace(/ /g, '') + name2.toLowerCase().replace(/ /g, '');
    let uniqueChars = Array.from(new Set(combined.split('')));
    
    let totalLength = uniqueChars.reduce((total, char) => {
        return total + (combined.split(char).length - 1) % flames.length;
    }, 0);
    
    const result = flames[totalLength % flames.length];
    return `The result is: <strong>${result.text}</strong> ${result.emoji}`;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
