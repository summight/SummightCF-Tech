
import { Course } from './types';

export const COURSE_DATA: Course = {
  title: 'A 6-Week Crash Course on HTML, CSS, and JavaScript',
  description: 'Master the fundamentals of web development and build your first interactive websites from scratch. This course is designed for absolute beginners.',
  weeks: [
    {
      id: 1,
      title: 'Week 1: The Foundation - HTML',
      description: 'Learn the structure of web pages using HyperText Markup Language.',
      content: [
        'HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.',
        'In this module, you will learn about the basic building blocks of HTML, including tags, elements, and attributes. We will cover document structure, text formatting, lists, links, images, and tables.'
      ],
      videoUrls: ['https://www.youtube.com/embed/1qa41JLgx-M', 'https://www.youtube.com/embed/gtSTsmLAy-Y'],
      examples: [
        { title: 'Basic HTML Document', code: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Page Title</title>\n</head>\n<body>\n  <h1>My First Heading</h1>\n  <p>My first paragraph.</p>\n</body>\n</html>` },
        { title: 'Image Tag', code: `<img src="image.jpg" alt="An example image" width="500" height="333">` }
      ],
      assignment: {
        title: 'Assignment: Create Your "About Me" Page',
        description: 'Create a simple HTML page about yourself. Include a main heading with your name, a paragraph describing your hobbies, an unordered list of your favorite foods, and an image of something you like.'
      }
    },
    {
      id: 2,
      title: 'Week 2: Styling with CSS',
      description: 'Bring your web pages to life with Cascading Style Sheets.',
      content: [
        'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML.',
        'We will explore selectors, properties, and values. You will learn how to control colors, fonts, spacing, and layout. We will also introduce the box model, a fundamental concept in CSS.'
      ],
      videoUrls: ['https://www.youtube.com/embed/1Rs2ND1ryYc'],
      examples: [
        { title: 'Basic CSS Styling', code: `body {\n  background-color: lightblue;\n}\nh1 {\n  color: white;\n  text-align: center;\n}` },
        { title: 'Styling with a Class', code: `.center-text {\n  text-align: center;\n  color: red;\n}` }
      ],
      assignment: {
        title: 'Assignment: Style Your "About Me" Page',
        description: 'Take the HTML page you created last week and add a separate CSS file to style it. Give it a background color, change the font and color of your headings and paragraphs, and center the main heading.'
      }
    },
    {
      id: 3,
      title: 'Week 3: Advanced CSS & Layouts',
      description: 'Master modern CSS layout techniques like Flexbox and Grid.',
      content: [
        'Modern web design relies heavily on responsive layouts that work on any device. Flexbox and CSS Grid are two powerful layout modules that make creating complex, responsive designs easier than ever.',
        'This week focuses on practical application. We will build a navigation bar using Flexbox and a photo gallery using CSS Grid. We will also cover responsive design principles using media queries.'
      ],
      videoUrls: ['https://www.youtube.com/embed/3YW65K6LcIA', 'https://www.youtube.com/embed/jV8B24rSN5o'],
      examples: [
        { title: 'Flexbox Centering', code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}` },
        { title: 'Simple Grid Layout', code: `.grid-container {\n  display: grid;\n  grid-template-columns: auto auto auto;\n}` }
      ],
      assignment: {
        title: 'Assignment: Build a Responsive Card Layout',
        description: 'Create a section with three styled "cards" arranged horizontally using Flexbox. Each card should have an image, a title, and a short description. On smaller screens, the cards should stack vertically.'
      }
    },
    {
      id: 4,
      title: 'Week 4: JavaScript Fundamentals',
      description: 'Add interactivity to your websites with the language of the web.',
      content: [
        'JavaScript is a programming language that enables you to create dynamically updating content, control multimedia, animate images, and much, much more.',
        'We will start with the basics: variables, data types, operators, and control flow (if/else statements, loops). We will also introduce functions as a way to write reusable blocks of code.'
      ],
      videoUrls: ['https://www.youtube.com/embed/DHjqpvDnNGE'],
      examples: [
        { title: 'Variable Declaration', code: `let name = "Alice";\nconst age = 30;\nconsole.log(name + " is " + age);` },
        { title: 'A Simple Function', code: `function greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet("World"));` }
      ],
      assignment: {
        title: 'Assignment: Simple Calculator',
        description: 'Write JavaScript code that takes two numbers and an operator (+, -, *, /) and returns the result. You can use variables to store the numbers and operator, and an if/else or switch statement to perform the calculation.'
      }
    },
    {
      id: 5,
      title: 'Week 5: The DOM and Events',
      description: 'Manipulate web pages and respond to user actions.',
      content: [
        'The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.',
        'Learn how to select elements from the DOM, change their content and style, and create new elements. We will also cover event handling, allowing your code to react to user interactions like clicks and keyboard input.'
      ],
      videoUrls: ['https://www.youtube.com/embed/v4oN4V8N_K8', 'https://www.youtube.com/embed/XF1_e4wio_o'],
      examples: [
        { title: 'Changing Text Content', code: `const heading = document.getElementById("main-heading");\nheading.textContent = "Welcome to the DOM!";` },
        { title: 'Handling a Click Event', code: `const button = document.querySelector("button");\nbutton.addEventListener("click", () => {\n  alert("Button was clicked!");\n});` }
      ],
      assignment: {
        title: 'Assignment: Interactive To-Do List',
        description: 'Build a simple to-do list. It should have an input field to add new tasks and a button. When the button is clicked, the new task should be added to a list on the page. Bonus: Add the ability to click on a task to mark it as complete (e.g., by striking it through).'
      }
    },
    {
      id: 6,
      title: 'Week 6: Final Project & Review',
      description: 'Combine everything you\'ve learned to build a complete project.',
      content: [
        'It\'s time to put all your skills together! The final project is an opportunity to build a small, complete website from scratch, demonstrating your understanding of HTML, CSS, and JavaScript.',
        'This week is dedicated to building your project, debugging issues, and reviewing key concepts from the past five weeks. We will provide guidance and support as you complete your final submission.'
      ],
      videoUrls: ['https://www.youtube.com/embed/g7Rk_f2pS_E'],
      examples: [
        { title: 'Project Structure', code: `/project\n|-- index.html\n|-- styles.css\n|-- script.js\n|-- /images` },
        { title: 'Linking Files', code: `<link rel="stylesheet" href="styles.css">\n<script src="script.js" defer></script>` }
      ],
      assignment: {
        title: 'Assignment: Build a Personal Portfolio Website',
        description: 'Create a multi-section, single-page portfolio website. It should include a navigation bar, a "hero" section about you, a "projects" section showcasing your work (you can use placeholders), and a "contact" section. Use JavaScript to make the navigation links scroll smoothly to the corresponding sections.'
      }
    }
  ]
};
