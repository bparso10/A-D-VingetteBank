# USMLE Question Bank Application

A medical question bank application designed to mimic the USMLE Step 1 style interface, featuring tutor mode and timed test mode for efficient studying.

## Features

### Quiz Modes
- **Tutor Mode**: Untimed with immediate feedback after each question
- **Timed/Test Mode**: 2 minutes per question with review at the end

### Question Selection
- Filter by subject (e.g., Microbiology, Immunology)
- Select specific subtopics or randomize from entire subject
- Choose number of questions for each quiz

### User Interface
- Clean, professional USMLE-style interface
- Question navigation sidebar
- Detailed explanations for all answers
- Statistics showing answer distribution
- Time tracking per question

## Getting Started

### Installation

1. Navigate to the question-bank directory:
```bash
cd question-bank
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder, ready to deploy.

## Adding Questions

You have two options for adding questions:

### Option 1: Edit JSON Directly

Edit `question-bank/src/data/questions.json` and add questions following this structure:

```json
{
  "id": 1001,
  "subject": "Immunology",
  "subtopic": "Innate Immunity",
  "tags": ["Immunology", "Innate Immunity", "Complement System"],
  "question": "Your question text here...",
  "choices": {
    "A": "First answer choice",
    "B": "Second answer choice",
    "C": "Third answer choice",
    "D": "Fourth answer choice",
    "E": "Fifth answer choice"
  },
  "correctAnswer": "B",
  "explanation": "General explanation of the topic...",
  "detailedExplanation": {
    "correct": "Explanation for the correct answer",
    "A": "Explanation for why A is incorrect",
    "C": "Explanation for why C is incorrect",
    "D": "Explanation for why D is incorrect",
    "E": "Explanation for why E is incorrect"
  },
  "statistics": {
    "A": 15.2,
    "B": 58.7,
    "C": 12.3,
    "D": 8.9,
    "E": 4.9
  },
  "lastUpdated": "Mar 22, 2021"
}
```

### Option 2: Use Excel/CSV Template

1. Open `question-template.csv` in Excel or Google Sheets
2. Add your questions following the column format
3. Convert CSV to JSON using a converter tool (or I can help create a conversion script)
4. Replace the contents of `question-bank/src/data/questions.json`

### CSV Column Format:
- **ID**: Unique question identifier
- **Subject**: Main subject category (e.g., Microbiology, Immunology)
- **Subtopic**: Specific subtopic within the subject
- **Tags**: Pipe-separated tags (e.g., "Immunology|Innate Immunity|Complement")
- **Question**: Full question text
- **ChoiceA-E**: Answer choices
- **CorrectAnswer**: Letter of correct answer (A-E)
- **Explanation**: General explanation
- **ExplanationA-E**: Detailed explanations for each answer
- **StatsA-E**: Percentage statistics (optional, can use dummy data)
- **LastUpdated**: Date question was last updated

## Deployment

### Deploy to Netlify (Recommended)

1. Create a free account at [Netlify](https://www.netlify.com/)
2. Connect your GitHub repository
3. Set build command: `cd question-bank && npm run build`
4. Set publish directory: `question-bank/build`
5. Deploy!

Your friends can then access the question bank via the Netlify URL.

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
cd question-bank
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/A-D-VingetteBank",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## Project Structure

```
question-bank/
├── public/
├── src/
│   ├── components/
│   │   ├── QuizSetup.jsx         # Initial setup screen
│   │   ├── QuizInterface.jsx     # Main quiz container
│   │   ├── Header.jsx            # Blue header bar
│   │   ├── Sidebar.jsx           # Question navigation
│   │   ├── Question.jsx          # Question display with answers
│   │   └── ReviewMode.jsx        # Post-quiz review
│   ├── data/
│   │   └── questions.json        # Question database
│   ├── App.js                    # Main app component
│   └── index.js                  # Entry point
└── package.json
```

## Customization

### Colors
To change the color scheme, edit the CSS files in `src/components/`. The main USMLE blue is `#3f51b5`.

### Timer Settings
To change the time per question in timed mode, edit line 21 in `QuizInterface.jsx`:
```javascript
const totalTime = mode === 'timed' ? numQuestions * 2 * 60 : null; // Change '2' to desired minutes
```

## Support

For issues or questions, please open an issue in the GitHub repository.

## License

This project is for educational purposes.