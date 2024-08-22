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
    if (!name1 || !name2) {
        return res.status(400).send('Both names are required.');
    }

    // Check for specific names and respond accordingly
    const lowerName1 = name1.toLowerCase();
    const lowerName2 = name2.toLowerCase();
    if (lowerName1 === 'naganjaneyulu' || lowerName2 === 'naganjaneyulu' ||
        lowerName1 === 'sandhya' || lowerName2 === 'sandhya') {
        return res.send('పో రా బేవకుఫ్ పోయి ఏమన పని వుంటే చూసుకో 🤨');
    }

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

    // Combine names and remove spaces
    let combined = (name1 + name2).toLowerCase().replace(/ /g, '');
    
    // Count occurrences of each character
    const charCount = {};
    for (let char of combined) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Calculate the number of unique characters
    let total = 0;
    for (let count of Object.values(charCount)) {
        total += count;
    }
    
    // Calculate the result index
    let index = 0;
    while (flames.length > 1) {
        index = (index + total - 1) % flames.length;
        flames.splice(index, 1);
    }

    const result = flames[0];
    return `The result is: <strong>${result.text}</strong> ${result.emoji}`;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
