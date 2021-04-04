/* eslint-disable */

export default {
  documentation: {
    menuOptions: ['home'],
    title: `Boxing heavyweight championships`,
    explanationHeading: `Explanation`,
    explanation: `The history of the different boxing heavyweight championships through the years.`,
    //todo: iterations
    questionsHeading: `I want feedback on...`,
    questions: [
      `Is it clear what everything means?`,
      `Is the image in the center too distracting?`
    ],
    limitsHeading: `I don't want feedback on...`,
    limits: `The legend`,
    visualisation: 'boxing'
  },
  sidebar: {
    hasProgressBar: true,
    steps: [
      {
        isCentered: true,
        content: {
          confirmInstructions: {
            title: `Read the documentation`,
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt vestibulum nibh cum dui. Et morbi enim urna vestibulum. `,
          }
        },
        navigation: [{
            label: 'Done',
            action: 'nextStep'
          }
        ]
      },
      {
        popUp: {
          title: `Explanation design critique`,
          body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt vestibulum nibh cum dui. Et morbi enim urna vestibulum. Suspendisse ligula augue et odio mauris pharetra justo. Venenatis cursus pulvinar nunc nunc pretium ac eros in.`,
          tipHeading: `Tips and pointers for giving feedback `,
          tips: [
            {
              type: 'question',
              label: `Lorem ipsum`
            },
            {
              type: 'question',
              label: `Lorem ipsum`
            },
            {
              type: 'limit',
              label: `Lorem ipsum`
            },
            {
              type: 'normal',
              label: `Lorem ipsum`
            }
          ],
          buttonLabel: 'Done',
        },
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
        content: {
          readInstructions: {
            title: `Give Negative feedback`,
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt.`,
            legend: [
              {
                type: 'question',
                label: `Do give feedback`
              },
              {
                type: 'limit',
                label: `Don't give feedback`
              }
            ],
          },
          feedbackHelper: {
            sections: {
              zero: {
                title: `Negative feedback tips`,
                body: ``,
                tips: [
                `Lorem ipsum`,
                `Lorem ipsum`,
                `Lorem ipsum`,
                `Lorem ipsum`
              ]},
              interactive: {
                title: `Negative feedback tips`,
                body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt.`,
                tips: [
                {
                  heading: `Lorem ipsum dolor sit amet, consectetur adipiscing.`,
                  detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt vestibulum nibh cum dui. Et morbi enim urna vestibulum. Suspendisse ligula augue et odio mauris pharetra justo. Venenatis cursus pulvinar nunc nunc pretium ac eros in.`
                },
                {
                  heading: `Lorem ipsum dolor sit amet, consectetur adipiscing.`,
                  detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt vestibulum nibh cum dui. Et morbi enim urna vestibulum. Suspendisse ligula augue et odio mauris pharetra justo. Venenatis cursus pulvinar nunc nunc pretium ac eros in.`
                },
                {
                  heading: `Lorem ipsum dolor sit amet, consectetur adipiscing.`,
                  detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt vestibulum nibh cum dui. Et morbi enim urna vestibulum. Suspendisse ligula augue et odio mauris pharetra justo. Venenatis cursus pulvinar nunc nunc pretium ac eros in.`
                }
              ]}
            }
          },
          feedbackInput: true
        },
        navigation: [
          {
            label: 'Previous',
            action: 'previousStep'
          },
          {
            label: 'Next',
            action: 'nextStep'
          }
        ]
      },
      {
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
        content: {
          confirmInstructions: {
            title: `Answer the feedback questions`,
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt.`,
          },
        },
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
        content: {
          confirmInstructions: {
            title: `Give positive feedback`,
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt.`,
          },
        },
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
    viewFeedbackSections: {
      // readInstructions: {
      //   title: `Lorem Ipsum`,
      //   body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt.`,
      //   legend: [
      //     {
      //       type: 'question',
      //       label: `Do give feedback`
      //     },
      //     {
      //       type: 'limit',
      //       label: `Don't give feedback`
      //     }
      //   ],
      // },
      feedbackComments: {
        title: `Feedback`,
        // body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt.`,
      }
    },
    markerContent: {
      title: `Place markers by clicking on the data visualisation`,
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt vestibulum nibh cum dui. Et morbi enim urna vestibulum.`,
      navigation: [
        {
          label: 'Cancel',
          action: 'cancelMarkers'
        },
        {
          label: 'Add',
          hasOutline: true,
          action: 'saveMarkers',
          disabled: 'sessionMarkers'
        }
      ]
    },
    imageContent: {
      title: `Add image to feedback.`,
      body: `Visually support your feedback by adding an image. Images can be used to explain your feedback or show alternative solutions.`,
      rule: `Only .png and .jpg files smaller than 5mb allowed.`,
      navigation: [
        {
          label: 'Cancel',
          action: 'cancelImage'
        },
        {
          label: 'Save',
          hasOutline: true,
          hasDisabled: true,
          action: 'saveImage',
        }
      ]
    }
  },
};
