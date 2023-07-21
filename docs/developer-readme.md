# react-arca developer Readme

Welcome react-arca developer!

## Introduction

react-arca is a boiler plate generator for building a React application. It installs the necessitys to get started working with React, and allows the developer to immediately begin developing after install. Its minimal, concise, and flexible.

## Getting Started

To run the application, follow these steps:

1. Clone the repository onto your local machine.
2. Navigate to the react-arca-cli and react-arca-template directories and run `npm i`.
3. Start the template application by navigating to react-arca-template and run `npm start`.
4. The application should start on localhost:3030.

## The Template

The react-arca-template is a representation of the files that will be installed on the users machine.

Table of contents:

1. index.tsx
2. styles.css
3. react-arca.tsx
4. /react-arcaUtils
5. /react-arcaSupportingComponents
6. /react-arcaInputComponents

### index.tsx

This file serves as the entry point for the library, containing the exported members that users can import.

### styles.css

This is the main stylesheet that defines the styling for all components in our library.

### react-arca.tsx

This is a crucial file that manages the entire library. It incorporates the `useFormValidation` reducer to handle state management for the components. Additionally, it acts as the context provider for `react-arcaContext` and `ResetContext`. When children are passed into this component, their display names are extracted, and the initial dispatch is fired with the name, type, and validation function for each child. This dispatch dynamically sets the state of the useReducer with the children nested within the react-arca component.

### react-arcaUtils

The utils folder essentially contains our functions that are not necesseraly components. Within this folder you will find:

- `react-arcaContext.tsx`: Defines the context passed around the components.
- `react-arcaReducer.tsx`: Defines the useReducer used for state management. The `initialFormState` starts as an empty object, and the reducer dynamically populates the form state with only the children of the react-arca component when the `INITIAL_FORM` type is called. The `UPDATE_FORM` type accepts changes from the checkForErrors function and updates the state accordingly. The `RESET_FORM` is triggered by the react-arcaResetBtn and resets the form state to an empty object.
- `react-arcaTypes.tsx`: This file contains global type definitons that are used in more then one location.
- `react-arcaSubmitHandler.js`: Contains an asynchronous function that is called when the react-arcaSubmitBtn is clicked. It handles the event's prevent default behavior, maps over each item in the form state, and runs the checkForErrors function on each item. If an error is returned, the noErrors variable is set to false. If there are no errors, the data object is updated with the name-value pairs from the form state items. After the loop, it checks if noErrors is true and, if so, fires the onSubmit function provided by the user with the data object as a parameter.
- `Validation.tsx`: Contains the validation functions.
- `ValidationUtils.tsx`:
  - checkForErros function: Maps the name passed into it with the associated validation stored alongside it and executes the validation function. The UPDATE_FORM dispatch is then fired to update the useReducer state. The function returns a boolean indicating the presence of an error.
  - typeMapper function: Used within the react-arca component to associate the display name of the child component with a type.
  - validationMapper function: Used within the react-arca component to associate the display name of the child component with a validation function.

### react-arcaSupportingComponents

This folder contains components that support our form (react-arca component). They are classified as supporting components because they are not stored in the useReducer state.

### react-arcaInputComponents

This folder includes various input components offered by our library. These components are nested as children under the react-arca component and stored in the reducer with an associated name key and value object: `{ value: string, type: string, hasError: false, error: "", touched: false, formID: "", validator: function }`.

---

This documentation provides an overview of the library's functionality. As development progresses and the library matures, we aim to make this documentation more detailed while keeping it simple and easy to understand. Developers can refer to this document for quick and concise explanations of various aspects of our library. When writing documentation, if it becomes overly complex, focus on the overarching mechanism of the function being documented. If the function itself seems too complex, consider refactoring it. At react-arca, we prioritize simple, concise, and effective code over unnecessary complexity. While keeping our build size small, we encourage innovative thinking to strike a balance between simplicity and a compact build.
