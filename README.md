---
page_type: sample
languages:
  - javascript
products:
  - react
description: 'Add 150 character max description'
urlFragment: 'update-this-to-unique-url-stub'
---

![Microsoft Defending Democracy Program: ElectionGuard](images/electionguard-banner.svg)

# ElectionGuard Admin Device

![package](https://github.com/microsoft/electionguard-admin-device/workflows/Package/badge.svg)
[![license](https://img.shields.io/github/license/microsoft/electionguard-admin-device)](License)

The ElectionGuard Admin Device is a fully functional
implementation built in ReactJS. It connects to an ElectionGuard SDK API to
complete two main tasks.

1. Start an Election
2. Tally Voting Results

This reference implementation is meant to demonstrate a possible use case of the
ElectionGuard SDK.

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

`yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

`yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

`yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

## Contributing

Help defend democracy and [contribute to the project](CONTRIBUTING).

<!--
Guidelines on README format: https://review.docs.microsoft.com/help/onboard/admin/samples/concepts/readme-template?branch=master

Guidance on onboarding samples to docs.microsoft.com/samples: https://review.docs.microsoft.com/help/onboard/admin/samples/process/onboarding?branch=master

Taxonomies for products and languages: https://review.docs.microsoft.com/new-hope/information-architecture/metadata/taxonomies?branch=master
-->