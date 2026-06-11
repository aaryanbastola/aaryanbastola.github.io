🚀 Aaryan Bastola | Interactive Personal Portfolio
A dynamic, immersive, and highly responsive personal portfolio website. Designed to put the spotlight directly on personal branding, this project features a perfectly centered layout, seamless CV integration, and interactive elements—including a live browser-based computer vision script and ambient parallax backgrounds.

🔗 Live Demo: https://aaryanbastola.github.io/

✨ Key Features
🌓 Dynamic Theming: Built-in Dark and Light modes with automatic system-preference detection and persistent local storage saving.

✨ Immersive UI/UX: Features an ambient, animated "gold smoke" parallax background, smooth intersection-observer scroll animations, and a dynamic typewriter effect.

📄 Automated File Management: Includes a custom Python automation script (manage_files.py) that organizes, renames, and deploys PDF certificates and resumes into the correct directories.

🖐️ Computer Vision Integration: Showcases a completely client-side Hand Gesture Recognition tool built with Google's MediaPipe, operating natively within the browser via the Canvas API.

📱 Fully Responsive: Flawless viewing across desktops, tablets, and mobile devices, complete with an accessible, togglable mobile navigation menu.

🎯 Seamless CV Access: A dedicated, easily accessible CV download button that integrates without interrupting the user's navigational flow.

🛠️ Tech Stack
Frontend Core: HTML5, CSS3, Vanilla JavaScript (ES6+).

Computer Vision: Google MediaPipe (Hands), HTML5 Canvas API.

Backend Automation: Python 3 (Standard libraries: os, shutil).

Assets: FontAwesome Icons, Custom SVG shapes.

📁 Project Structure
Plaintext
aaryanbastola.github.io/
│
├── index.html               # Main portfolio structure
├── style.css                # Global styles, variables, and animations
├── script.js                # DOM manipulation, modals, and observer logic
├── manage_files.py          # Python script to automate PDF organization
├── logo.png                 # Personal branding logo
│
├── certs/                   # Auto-generated directory for certificates
│   ├── certificate1.pdf
│   └── ...
│
└── hand/                    # Computer vision project directory
    └── hand-gesture.html    # MediaPipe hand tracking application
🚀 Local Setup & Installation
Want to run this project locally or fork it for your own use? Follow these steps:

Clone the repository:

Bash
git clone https://github.com/aaryanbastola/aaryanbastola.github.io.git
cd aaryanbastola.github.io
Organize Your Files (Automated):
Ensure your downloaded certificates and cv.pdf are in your local machine's download folder or the project root. Run the Python management script to automatically structure them:

Bash
python manage_files.py
Launch the App:
Simply open index.html in your favorite modern web browser, or use a live server extension in VS Code for hot-reloading:
Right-click index.html > Open with Live Server

🎨 Customization
This portfolio is built to be modular. To make it your own:

Colors: Open style.css and modify the --accent and background variables inside the :root pseudo-class.

Data: Update the text inside index.html and swap out logo.png with your own headshot or brand logo.

File Automation: Edit the SOURCE_TO_TARGET dictionary inside manage_files.py to match your own file names.

📫 Let's Connect
Feel free to reach out for collaborations, job inquiries, or just to talk tech!

Email: aaryanbastola221@gmail.com

LinkedIn: linkedin.com/in/aaryanbastola

***


© 2026 Aaryan Bastola. Built with passion and lots of coffee.
