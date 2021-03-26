/* eslint-disable */

export default {
  documentation: {
    menuOptions: ['home'],
    title: `Boxing heavyweight championships`,
    explanation: `The history of the different boxing heavyweight championships through the years.`,
    //todo: iterations
    questions: [
      `Is it clear what everything means?`,
      `Is the image in the center too distracting?`
    ],
    limits: `The legend`,
    visualisation: 'boxing'
  },
  sidebar: {
    hasProgressBar: true,
    steps: [{
        index: 1,
        navigation: [{
            label: 'Done',
            action: 'nextStep'
          }
        ]
      },
      {
        index: 2,
        navigation: [{
            label: 'Done',
            action: 'nextStep'
          }
        ]
      },
    {
        index: 3,
        tabs: [
          {
            label: 'Give feedback',
            value: 'give'
          },
          {
            label: 'View feedback',
            value: 'view'
          }
        ],
        navigation: [
          {
            label: 'Previous',
            action: 'previousStep'
          },
          {
            label: 'Next',
            hasOutline: true,
            action: 'nextStep'
          }
        ]
      },
    {
        index: 4,
        tabs: [
          {
            label: 'Give feedback',
            value: 'give'
          },
          {
            label: 'View feedback',
            value: 'view'
          }
        ],
        navigation: [
          {
            label: 'Previous',
            action: 'previousStep'

          },
          {
            label: 'Next',
            hasOutline: true,
            action: 'nextStep'
          }
        ]
      },
    {
        index: 5,
        tabs: [
          {
            label: 'Give feedback',
            value: 'give'
          },
          {
            label: 'View feedback',
            value: 'view'
          }
        ],
        navigation: [
          {
            label: 'Previous',
            action: 'previousStep'
          },
          {
            label: 'Next',
            hasOutline: true,
            action: {
              target: 'Done'
            }
          }
        ]
      },
    ],
  },
};
