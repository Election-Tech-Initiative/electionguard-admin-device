---
page_type: sample
languages:
  - javascript
products:
  - react
description: 'Add 150 character max description'
urlFragment: 'update-this-to-unique-url-stub'
---

# ElectionGuard Ballot Admin Device

<!--
Guidelines on README format: https://review.docs.microsoft.com/help/onboard/admin/samples/concepts/readme-template?branch=master

Guidance on onboarding samples to docs.microsoft.com/samples: https://review.docs.microsoft.com/help/onboard/admin/samples/process/onboarding?branch=master

Taxonomies for products and languages: https://review.docs.microsoft.com/new-hope/information-architecture/metadata/taxonomies?branch=master
-->

The ElectionGuard Reference Ballot Admin Device is a fully functional
implementation built in ReactJS. It connects to an ElectionGuard SDK API to
complete two main tasks.

1. Start an Election
2. Tally Voting Results

This reference implementation is meant to demonstrate a possible use case of the
ElectionGuard SDK.

## Contents

Outline the file contents of the repository. It helps users navigate the
codebase, build configuration and any related assets.

| File/folder       | Description                                |
| ----------------- | ------------------------------------------ |
| `src`             | Sample source code.                        |
| `.gitignore`      | Define what to ignore at commit time.      |
| `CHANGELOG.md`    | List of changes to the sample.             |
| `CONTRIBUTING.md` | Guidelines for contributing to the sample. |
| `README.md`       | This README file.                          |
| `LICENSE`         | The license for the sample.                |

## Prerequisites

Outline the required components and tools that a user might need to have on
their machine in order to run the sample. This can be anything from frameworks,
SDKs, OS versions or IDE releases.

## Setup

Explain how to prepare the sample once the user clones or downloads the
repository. The section should outline every step necessary to install
dependencies and set up any settings (for example, API keys and output folders).

## Running the sample

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

This project can be run in two configurations.

1. Full Hardware Demo
   - **OS:** Linux (Unbuntu)
   - **Hardware:** Card reader, smart card, and usb stick
   - **Reference Implementation APIs:**
     - [Usb stick Api](https://github.com/InfernoRed/module-usbstick)
     - [Smart Card Api](https://github.com/InfernoRed/module-smartcards)
     - [ElectionGuard Api](https://github.com/microsoft/ElectionGuard-SDK-DotNetCore-Reference-Web-API)
2. Mock Demo
   - To demo, create a `.env.local` and enable the mocks shown in the `.env`
     file.

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

## Key concepts

Provide users with more context on the tools and services used in the sample.
Explain some of the code that is being used and how services interact with each
other.
