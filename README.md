# Garden4Camps

For this challenge, we ask you to produce a small React + TypeScript app for people who want to rent their garden to campers.

## Getting started

To save you time and to help us focus on your work, use this repository as a starting point for your submission. Please leave the git history intact.

To run the project:

```bash
yarn install
yarn dev
```

## Criteria

You will be assessed on your understanding of React and Typescript. The challenge lists multiple features but we're looking for production-quality code that is complete and representative of your style over finishing every task (quality over quantity).

We use MUI, but you don't have to. If you feel comfortable with Tailwind, or any other component library (or none) feel free to set it up as you see fit. UX/UI will certainly help your assessment if you have time, but don't stress over it.

We expect you to take around 3 hours to complete the assignment so feel free to time box.

## Feature list

-   [x] Setup the project

-   [ ] Hydrate the JSON data into the Zustand store and create a UI list representing the data

-   [ ] Every item in the list links to its own detailed page

-   [ ] The main page has functionality to add/edit/delete items

-   [ ] The main list can be filtered (name/address/tags etc... a couple should be enough)

-   [ ] Comments can be added to the item details page

-   [ ] If you went that far and have time left, feel free to impress us with whatever else you think of!

## Optional Questions

-   How would you go about managing React components within a team?
-   Pick one major technical challenge you've had in the past and explain how you overcame it.

## JSON generation (FYI)

If you want to see or change what's behind the JSON data, it was generated with https://json-generator.com/ with the following template:

```
[
  '{{repeat(5, 7)}}',
  {
    _id: '{{objectId()}}',
    guid: '{{guid()}}',
    pictures: [
      '{{repeat(2,6)}}',
      'https://placekitten.com/400/300'
    ],
    status: '{{random("active", "draft", "disabled")}}',
    owner: {
      name: '{{firstName()}} {{surname()}}',
      age: '{{integer(20, 40)}}',
      gender: '{{gender()}}',
      phone: '+61 {{phone()}}',
      email: '{{email()}}'
    },
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    about: '{{lorem(1, "paragraphs")}}',
    latitude: '{{floating(-90.000001, 90)}}',
    longitude: '{{floating(-180.000001, 180)}}',
    tags: [
      '{{repeat(7)}}',
      '{{lorem(1, "words")}}'
    ],
    comments: []
  }
]
```
