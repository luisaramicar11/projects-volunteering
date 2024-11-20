# Volunteer and Community Projects Platform

Volunteer and community projects platform where project organizers can publish their initiatives and connect with volunteers interested in helping. This platform will allow organizers to create and manage projects, while volunteers can explore and search for projects based on their interests and availability.

## Features

- **Service Management**: Add, update, delete, and list the services offered by the platform.
- **REST API**: The backend is built on a RESTful API that performs all CRUD operations.
- **Authentication**: Admin authentication system (if implemented).
- **Onion Architecture**: Clear separation between presentation, domain, and persistence layers.

## Project Structure

The project follows the Onion Architecture, which organizes it into layers to separate concerns:

- **Core (Application)**: Contains interfaces and business services that define the application's logic.
- **Ports**: Defines interfaces for communication between different layers of the system.
- **Infrastructure**: Implements the logic for interacting with external systems such as databases, APIs, etc.
- **Atoms:** Basic components such as buttons, text inputs, and labels.
- **Molecules:** Combinations of atoms that form more complex components, such as form fields.
- **Organisms:** Groupings of molecules and atoms that form complete sections of the interface.
- **Templates:** Design structures that define how organisms are organized on a page.
- **Pages:** Complete views that combine templates and present the final content.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/luisaramicar11/projects-volunteering
   cd repository_name

2. Install the dependencies:
    ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev

4. Open http://localhost:3000 in your browser
