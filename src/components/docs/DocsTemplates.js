export const DocsTemplate = {
    "gettingStarted": {
        "Introduction": "Welcome to the documentation!",
        "Installation": "Run `npm install your-package-name` to install.",
        "Quick Start": `
import { ExampleComponent } from 'your-package-name';

const App = () => (
  <ExampleComponent />
);

export default App;
`,
    },
    "features": {
        "Feature 1": "This is the description of feature 1.",
        "Feature 2": `
import { useFeature } from 'your-package-name';

const result = useFeature('magic');
console.log(result);
`,
    },
    "advancedTopics": {
        "Customization": "Learn how to customize your experience.",
        "Performance": "Optimize the platform for better performance.",
    },
};