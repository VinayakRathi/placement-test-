import { Level } from './types';

export const interviewLevels: Level[] = [
  {
    number: 1,
    title: "Syntax & Basics",
    difficulty: "Junior",
    interviewerFeedback: "Good start. Understanding the fundamental data types and variable declarations is the bedrock of any solid engineer. You've shown that you can navigate the basics without tripping over simple syntax.",
    questions: [
      {
        id: "1-1",
        text: "Which keyword is used to declare a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        correctAnswer: 2,
        explanation: "The 'const' keyword creates a read-only reference to a value. It does not mean the value it holds is immutable, but the variable identifier cannot be reassigned."
      },
      {
        id: "1-2",
        text: "What is the result of 'typeof null' in JavaScript?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctAnswer: 2,
        explanation: "This is a well-known bug in JavaScript. 'typeof null' returns 'object', which has been kept for backward compatibility."
      },
      {
        id: "1-3",
        text: "Which of these is NOT a primitive data type in JavaScript?",
        options: ["String", "Boolean", "Object", "Number"],
        correctAnswer: 2,
        explanation: "Objects are complex data types. Primitives include String, Number, Boolean, null, undefined, Symbol, and BigInt."
      },
      {
        id: "1-4",
        text: "What does the '===' operator do?",
        options: ["Compares values only", "Compares values and types", "Assigns a value", "Checks for null"],
        correctAnswer: 1,
        explanation: "The strict equality operator (===) checks both the value and the type of the operands without performing type coercion."
      },
      {
        id: "1-5",
        text: "What is the purpose of the 'use strict' directive?",
        options: ["To enable new features", "To enforce stricter parsing and error handling", "To make the code run faster", "To hide private variables"],
        correctAnswer: 1,
        explanation: "'use strict' helps catch common coding bloopers, preventing the use of undeclared variables and other unsafe actions."
      }
    ]
  },
  {
    number: 2,
    title: "Arrays & Objects",
    difficulty: "Junior",
    interviewerFeedback: "You seem comfortable with data structures. Manipulating arrays and objects is a daily task, and your ability to use modern methods like map and spread shows you're keeping up with ES6+ standards.",
    questions: [
      {
        id: "2-1",
        text: "Which array method creates a new array with the results of calling a function on every element?",
        options: ["forEach()", "filter()", "map()", "reduce()"],
        correctAnswer: 2,
        explanation: "map() transforms every element in an array and returns a new array of the same length."
      },
      {
        id: "2-2",
        text: "How do you add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0,
        explanation: "push() adds one or more elements to the end of an array and returns the new length."
      },
      {
        id: "2-3",
        text: "What is the spread operator in JavaScript?",
        options: ["...", "&&", "||", "??"],
        correctAnswer: 0,
        explanation: "The spread operator (...) allows an iterable to be expanded in places where zero or more arguments or elements are expected."
      },
      {
        id: "2-4",
        text: "How do you access the property 'name' of an object 'user'?",
        options: ["user->name", "user.name", "user(name)", "user:name"],
        correctAnswer: 1,
        explanation: "Dot notation (user.name) or bracket notation (user['name']) are the standard ways to access object properties."
      },
      {
        id: "2-5",
        text: "Which method removes the last element from an array?",
        options: ["shift()", "pop()", "slice()", "splice()"],
        correctAnswer: 1,
        explanation: "pop() removes the last element from an array and returns that element."
      }
    ]
  },
  {
    number: 3,
    title: "Functions & Scope",
    difficulty: "Junior",
    interviewerFeedback: "Solid understanding of execution context. Closures and hoisting are often stumbling blocks for juniors, but you've navigated them well. This shows you understand how the engine actually processes your code.",
    questions: [
      {
        id: "3-1",
        text: "What is a closure in JavaScript?",
        options: ["A way to close the browser tab", "A function bundled with its lexical environment", "A private class method", "A global variable"],
        correctAnswer: 1,
        explanation: "A closure gives you access to an outer function's scope from an inner function, even after the outer function has finished executing."
      },
      {
        id: "3-2",
        text: "What is hoisting?",
        options: ["Moving variables to the top of their scope", "A way to optimize loops", "Deleting unused variables", "A method for API calls"],
        correctAnswer: 0,
        explanation: "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope (script or function)."
      },
      {
        id: "3-3",
        text: "What does 'this' refer to in a standard function called in the global scope?",
        options: ["The function itself", "The global object (window/global)", "undefined", "null"],
        correctAnswer: 1,
        explanation: "In the global execution context, 'this' refers to the global object, whether in strict mode or not."
      },
      {
        id: "3-4",
        text: "What is an IIFE?",
        options: ["Internal Interface For Elements", "Immediately Invoked Function Expression", "Iterative Input Functional Entry", "Inline Integrated Function Environment"],
        correctAnswer: 1,
        explanation: "An IIFE is a JavaScript function that runs as soon as it is defined."
      },
      {
        id: "3-5",
        text: "Which of these is an arrow function?",
        options: ["function() {}", "() => {}", "def func():", "func = {}"],
        correctAnswer: 1,
        explanation: "Arrow functions provide a shorter syntax and do not have their own 'this', 'arguments', or 'super'."
      }
    ]
  },
  {
    number: 4,
    title: "Async & Promises",
    difficulty: "Intermediate",
    interviewerFeedback: "Handling asynchronous operations is crucial for modern web apps. You've demonstrated that you can manage the event loop and handle data fetching patterns effectively.",
    questions: [
      {
        id: "4-1",
        text: "What are the three states of a Promise?",
        options: ["Start, Middle, End", "Pending, Fulfilled, Rejected", "Waiting, Success, Error", "Open, Closed, Locked"],
        correctAnswer: 1,
        explanation: "A Promise is always in one of these three states: pending (initial), fulfilled (success), or rejected (failure)."
      },
      {
        id: "4-2",
        text: "What does 'await' do in an async function?",
        options: ["Speeds up the function", "Pauses execution until the promise settles", "Creates a new thread", "Cancels the promise"],
        correctAnswer: 1,
        explanation: "The 'await' expression causes async function execution to pause until a Promise is settled (fulfilled or rejected)."
      },
      {
        id: "4-3",
        text: "Which method is used to handle multiple promises in parallel and wait for all to finish?",
        options: ["Promise.all()", "Promise.race()", "Promise.any()", "Promise.sync()"],
        correctAnswer: 0,
        explanation: "Promise.all() takes an iterable of promises and returns a single Promise that resolves when all of the input's promises have resolved."
      },
      {
        id: "4-4",
        text: "What is the purpose of .catch()?",
        options: ["To restart the promise", "To handle errors/rejections", "To log the result", "To finish the execution"],
        correctAnswer: 1,
        explanation: "The .catch() method returns a Promise and deals with rejected cases only."
      },
      {
        id: "4-5",
        text: "What is the 'Event Loop'?",
        options: ["A loop that runs every second", "A mechanism that handles async callbacks", "A way to iterate over objects", "A CSS animation property"],
        correctAnswer: 1,
        explanation: "The Event Loop is responsible for executing the code, collecting and processing events, and executing queued sub-tasks."
      }
    ]
  },
  {
    number: 5,
    title: "DOM & Events",
    difficulty: "Intermediate",
    interviewerFeedback: "Good grasp of browser interactions. Understanding event delegation and the difference between capturing and bubbling is key to writing performant UI code.",
    questions: [
      {
        id: "5-1",
        text: "What is event bubbling?",
        options: ["Events moving from child to parent", "Events moving from parent to child", "Events staying on the same element", "Events being deleted"],
        correctAnswer: 0,
        explanation: "Event bubbling is a type of event propagation where the event first triggers on the innermost target element, and then triggers on its ancestors."
      },
      {
        id: "5-2",
        text: "What does 'event.preventDefault()' do?",
        options: ["Stops event bubbling", "Stops the default browser action", "Deletes the event", "Refreshes the page"],
        correctAnswer: 1,
        explanation: "It tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be."
      },
      {
        id: "5-3",
        text: "What is event delegation?",
        options: ["Assigning events to every child", "Using one parent listener for many children", "Delegating events to a worker thread", "Removing all event listeners"],
        correctAnswer: 1,
        explanation: "Event delegation allows you to avoid adding event listeners to specific nodes; instead, you add a single event listener to a parent element."
      },
      {
        id: "5-4",
        text: "Which method is used to find an element by its ID?",
        options: ["querySelector()", "getElementById()", "findId()", "getElementByClass()"],
        correctAnswer: 1,
        explanation: "getElementById() is the most efficient way to select a single element by its unique ID."
      },
      {
        id: "5-5",
        text: "What is the difference between 'innerHTML' and 'textContent'?",
        options: ["No difference", "innerHTML parses HTML, textContent does not", "textContent is slower", "innerHTML is more secure"],
        correctAnswer: 1,
        explanation: "innerHTML returns/sets the HTML content, while textContent returns/sets the raw text, making it safer against XSS."
      }
    ]
  },
  {
    number: 6,
    title: "React Hooks",
    difficulty: "Intermediate",
    interviewerFeedback: "You've mastered the functional paradigm in React. Knowing when to use useMemo vs useCallback and how to handle effect dependencies shows you can build efficient components.",
    questions: [
      {
        id: "6-1",
        text: "What is the primary purpose of useEffect?",
        options: ["To handle state", "To perform side effects", "To optimize rendering", "To create refs"],
        correctAnswer: 1,
        explanation: "useEffect lets you perform side effects in function components, such as data fetching, subscriptions, or manual DOM changes."
      },
      {
        id: "6-2",
        text: "When does the cleanup function in useEffect run?",
        options: ["Before the next effect runs", "Only on unmount", "Every second", "Never"],
        correctAnswer: 0,
        explanation: "React performs the cleanup when the component unmounts. However, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time."
      },
      {
        id: "6-3",
        text: "What is the purpose of useMemo?",
        options: ["To memoize a function", "To memoize a calculated value", "To store global state", "To handle forms"],
        correctAnswer: 1,
        explanation: "useMemo returns a memoized value, which only recalculates when one of its dependencies has changed."
      },
      {
        id: "6-4",
        text: "How do you access a DOM element directly in React?",
        options: ["useRef", "useState", "useContext", "useReducer"],
        correctAnswer: 0,
        explanation: "useRef returns a mutable ref object whose .current property is initialized to the passed argument. It can be used to store a reference to a DOM node."
      },
      {
        id: "6-5",
        text: "What is a custom hook?",
        options: ["A hook provided by a library", "A function starting with 'use' that calls other hooks", "A way to bypass React rules", "A hook that doesn't use state"],
        correctAnswer: 1,
        explanation: "A custom hook is a JavaScript function whose name starts with 'use' and that may call other hooks."
      }
    ]
  },
  {
    number: 7,
    title: "State Management",
    difficulty: "Intermediate",
    interviewerFeedback: "Managing state at scale is a challenge. Your understanding of lifting state up and using context for global concerns suggests you can handle complex application data flows.",
    questions: [
      {
        id: "7-1",
        text: "What is 'lifting state up' in React?",
        options: ["Moving state to a parent component", "Moving state to Redux", "Using local storage", "Deleting state"],
        correctAnswer: 0,
        explanation: "Lifting state up involves moving shared state to the closest common ancestor of the components that need it."
      },
      {
        id: "7-2",
        text: "What is the purpose of useContext?",
        options: ["To manage local state", "To pass data through the component tree without props", "To optimize images", "To handle routing"],
        correctAnswer: 1,
        explanation: "Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree."
      },
      {
        id: "7-3",
        text: "What does useReducer do?",
        options: ["Reduces the size of the app", "Handles complex state logic with actions", "Optimizes re-renders", "Connects to a database"],
        correctAnswer: 1,
        explanation: "useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one."
      },
      {
        id: "7-4",
        text: "What is 'prop drilling'?",
        options: ["A good practice for passing data", "Passing props through many levels of components", "Using props to fetch data", "A way to style components"],
        correctAnswer: 1,
        explanation: "Prop drilling is the process of passing data from a parent component down to a deeply nested child component through intermediate components that don't need the data."
      },
      {
        id: "7-5",
        text: "In Redux, what is a 'reducer'?",
        options: ["A function that updates state based on an action", "A way to reduce API calls", "A component that renders state", "A middleware for logging"],
        correctAnswer: 0,
        explanation: "A reducer is a pure function that takes the previous state and an action, and returns the next state."
      }
    ]
  },
  {
    number: 8,
    title: "Performance",
    difficulty: "Senior",
    interviewerFeedback: "Impressive. Performance optimization is what separates good developers from great ones. You understand how to minimize re-renders and manage resources efficiently.",
    questions: [
      {
        id: "8-1",
        text: "What is 'React.memo' used for?",
        options: ["To store data in memory", "To prevent unnecessary re-renders of a component", "To memoize a function", "To handle state"],
        correctAnswer: 1,
        explanation: "React.memo is a higher order component. If your component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost."
      },
      {
        id: "8-2",
        text: "What is 'Code Splitting'?",
        options: ["Splitting code into multiple files", "Loading only the code needed for the current page", "Writing code in different languages", "Minifying the bundle"],
        correctAnswer: 1,
        explanation: "Code-splitting is a feature supported by bundlers like Webpack and Vite which can create multiple bundles that can be dynamically loaded at runtime."
      },
      {
        id: "8-3",
        text: "What is the benefit of using 'Lazy Loading' for images?",
        options: ["Images look better", "Reduces initial load time and bandwidth", "Images load faster", "Prevents image theft"],
        correctAnswer: 1,
        explanation: "Lazy loading images means loading them only when they are about to enter the viewport, saving resources."
      },
      {
        id: "8-4",
        text: "What is 'Debouncing'?",
        options: ["A way to fix bugs", "Limiting the rate at which a function fires", "A type of CSS animation", "A method for data encryption"],
        correctAnswer: 1,
        explanation: "Debouncing ensures that a function is only called after a certain amount of time has passed since it was last invoked."
      },
      {
        id: "8-5",
        text: "How does 'Virtual DOM' improve performance?",
        options: ["It bypasses the browser", "It minimizes direct manipulation of the real DOM", "It makes JavaScript faster", "It uses more memory"],
        correctAnswer: 1,
        explanation: "By calculating the difference (diffing) between the current and new state in a virtual representation, React only updates the parts of the real DOM that actually changed."
      }
    ]
  },
  {
    number: 9,
    title: "Security & Testing",
    difficulty: "Senior",
    interviewerFeedback: "Security and reliability are paramount. Your knowledge of XSS prevention and testing strategies shows you're ready to build production-grade applications that can be trusted.",
    questions: [
      {
        id: "9-1",
        text: "What is Cross-Site Scripting (XSS)?",
        options: ["A way to style sites", "Injecting malicious scripts into web pages", "A method for fast data transfer", "A type of server-side attack"],
        correctAnswer: 1,
        explanation: "XSS is a security vulnerability where an attacker injects malicious scripts into content that is then served to other users."
      },
      {
        id: "9-2",
        text: "What is the purpose of a Content Security Policy (CSP)?",
        options: ["To style the content", "To prevent XSS and other injection attacks", "To manage user roles", "To speed up the site"],
        correctAnswer: 1,
        explanation: "CSP is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks."
      },
      {
        id: "9-3",
        text: "What is 'Unit Testing'?",
        options: ["Testing the whole app at once", "Testing individual components or functions in isolation", "Testing the app on different devices", "Testing the database connection"],
        correctAnswer: 1,
        explanation: "Unit testing involves breaking the program into small, testable parts (units) and verifying that each part works correctly."
      },
      {
        id: "9-4",
        text: "What is 'Integration Testing'?",
        options: ["Testing how different parts of the app work together", "Testing the UI design", "Testing the app's speed", "Testing the code syntax"],
        correctAnswer: 0,
        explanation: "Integration testing is the phase in software testing in which individual software modules are combined and tested as a group."
      },
      {
        id: "9-5",
        text: "What is a 'JWT' (JSON Web Token) used for?",
        options: ["To store images", "For secure authentication and information exchange", "To style the UI", "To manage database schemas"],
        correctAnswer: 1,
        explanation: "JWTs are used to securely transmit information between parties as a JSON object. They are commonly used for authentication."
      }
    ]
  },
  {
    number: 10,
    title: "Architecture & Optimization",
    difficulty: "Senior",
    interviewerFeedback: "Exceptional. You've reached the top tier. Understanding the inner workings of React's reconciliation and how to architect scalable systems is what we look for in lead engineers. Welcome to the team.",
    questions: [
      {
        id: "10-1",
        text: "Explain the React Reconciliation algorithm.",
        options: ["It's a way to fetch data", "The process of diffing the virtual DOM to update the real DOM", "A method for routing", "A CSS layout engine"],
        correctAnswer: 1,
        explanation: "Reconciliation is the algorithm React uses to diff one tree with another to determine which parts need to be changed."
      },
      {
        id: "10-2",
        text: "What is 'Server-Side Rendering' (SSR)?",
        options: ["Rendering the app in the browser", "Rendering the initial HTML on the server", "A way to manage databases", "A type of CSS framework"],
        correctAnswer: 1,
        explanation: "SSR is the ability of an application to contribute by displaying the web-page on the server instead of rendering it in the browser."
      },
      {
        id: "10-3",
        text: "What are 'Micro-frontends'?",
        options: ["Small UI components", "An architectural style where a frontend app is composed of independent apps", "A way to build mobile apps", "A type of React hook"],
        correctAnswer: 1,
        explanation: "Micro-frontends is an architectural style where independently deliverable frontend applications are composed into a greater whole."
      },
      {
        id: "10-4",
        text: "What is 'Hydration' in the context of SSR?",
        options: ["Adding water to the server", "The process of attaching event listeners to server-rendered HTML", "Cleaning up unused code", "Optimizing database queries"],
        correctAnswer: 1,
        explanation: "Hydration is the process of using client-side JavaScript to add interactivity to HTML pages that were rendered on the server."
      },
      {
        id: "10-5",
        text: "What is 'Tree Shaking'?",
        options: ["A way to organize files", "Removing unused code from the final bundle", "A method for testing", "A type of animation"],
        correctAnswer: 1,
        explanation: "Tree shaking is a term commonly used in the JavaScript context for dead-code elimination."
      }
    ]
  }
];
