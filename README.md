# Dynamic Event Calendar

## Features
- **Event Creation**: Add events to specific dates on the calendar.
- **Event Editing**: Edit existing events by selecting a date and modifying the event details.
- **Event Deletion**: Delete events from a specific date on the calendar.
- **File Upload**: Import events from a `.json` file and display them on the calendar.
- **Persistent Storage**: Events are stored in `localStorage`, making them available on page reload.

## Installation

To run this app locally, follow the steps below:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (or **yarn**)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sakthikumaran-04/dynamic-event-calendar.git
   cd dynamic-event-calendar
   ```

2. **Install dependencies:**

   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Run the app locally:**

   After installing the dependencies, start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` in your browser.

## Deployment

this project is deployed on vercel.

```txt
https://the-dynamic-event-calendar.vercel.app
```

---

### Notes

- Make sure to test event creation, editing, and deletion functionalities thoroughly.
- Events are stored in `localStorage` in your browser, so clearing the browser storage will remove the data.
