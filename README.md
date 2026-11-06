# Revanth Kumar K | Accountant Portfolio

A responsive personal portfolio website for my job search as an accountant. It works on laptop, tablet and mobile, and is built with plain **HTML, CSS and JavaScript** (no frameworks, no backend).

## About me

Accountant from Nellore, Andhra Pradesh, working since September 2025 in a local auditor's office. I manage the books of multiple companies in **Tally Prime** and handle bank reconciliation, GST filing, GSTR-2B matching, professional tax filing and stock statements. I also hold a B.Tech in Electronics & Communication Engineering.

Contact: krevanth770@gmail.com

## What is on the website

| Section | What it shows |
|---|---|
| Home | Name, role (typing effect), short introduction, quick facts |
| About | Background, languages, location, contact details |
| Skills | Accounting (Tally Prime, reconciliation, books), Taxation (GST, GSTR-2B, professional tax), Technical (Excel, Java, HTML, CSS, JavaScript, testing) |
| Experience | Accountant, Sept 2025 to present |
| Projects | **Ravan** (featured, with demo video), Soldier Security Device, IoT Internship, Showcase Website |
| Education | B.Tech (ECE), Intermediate, 10th class |
| Contact | Phone, email, WhatsApp link and a contact form that opens the visitor's email app |

## Featured project: Ravan

Ravan is a Windows desktop app I built with **Electron + React** for accountants who work in TallyPrime. It connects to TallyPrime on the same computer and helps with:

- **Ravan AI:** a chat for GST, income-tax, TDS and Tally questions, with file attach. It runs offline on the PC.
- **Upload Bills:** upload Excel, PDF or photo bills and send sales and purchase entries to Tally, creating missing ledgers and stock items.
- **Bank Statement:** import statements (Excel, PDF or scan) and post the entries to Tally.
- **Tally Sales / Purchase and Stock Summary:** fetch data from Tally with selectable fields and download it as Excel.

The 25-second demo video (`ravan-demo.mp4`) was made from screenshots of the real app, with client details blurred.

## Features of the site

- Responsive layout for laptop, tablet and mobile (breakpoints at 992px and 768px)
- Dark and light mode, remembered between visits
- Mobile menu, smooth scrolling, active menu highlight, back-to-top button
- Scroll animations (turned off for visitors who prefer reduced motion)
- Contact form with validation

## Files

```
index.html         page structure and content
style.css          all styling and responsive rules
script.js          menu, theme, typing effect, animations, form
ravan-demo.mp4     Ravan demo video
ravan-poster.jpg   cover image shown before the video plays
```

## How to run

1. Download or clone this repository.
2. Open `index.html` in a browser, or use the **Live Server** extension in VS Code.

Keep all files in the same folder so the video and styles load.

## How to edit

- **Text and details:** edit `index.html`.
- **Colours:** change the values at the top of `style.css` (`:root` for light mode, `[data-theme="dark"]` for dark mode).
- **Photo:** add `photo.jpg` and replace the `<div class="avatar">...</div>` in `index.html` with `<img src="photo.jpg" class="avatar" alt="Revanth Kumar K">`.
- **Demo video:** replace `ravan-demo.mp4` with a new file of the same name.

## Publish for free with GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Branch**, choose `main` and the `/ (root)` folder, then save.
3. After a minute the site is live at `https://<username>.github.io/<repository-name>/`. Add this link to your resume.
