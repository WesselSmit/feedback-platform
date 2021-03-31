/* eslint-disable */

export default {
  documentation: {
    menuOptions: ['home'],
    title: `Twitter usage of Belgian politicians`,
    explanationHeading: `Explanation`,
    explanation: `With this data visualization I try to provide insight into Belgium's most famous politicians and their twitter statistics and interactions. I was curious; we always hear about Donald Trumps twitter usage, but never about other countries. I visualize the data from since the twitter account was created until the 31st of March, 2020.`,
    //todo: iterations
    questionsHeading: `I want feedback on...`,
    questions: [
      `Is it clear what the lines around the pictures symbolize?`,
      `How can I make the 'likes per tweet' visualisations better?`
    ],
    limitsHeading: `I don't want feedback on...`,
    limits: `The text is still French.`,
    visualisation: 'twitter'
  },
  sidebar: {
    hasProgressBar: true,
    steps: [
      {
        isCentered: true,
        content: {
          confirmInstructions: {
            title: `Read the documentation`,
            body: `Take the time to take in all the information, so that you know what the data visualization is about.`,
          }
        },
        navigation: [{
            label: 'Done',
            action: 'showVisualisation'
          }
        ]
      },
      {
        popUp: {
          title: `About giving feedback...`,
          body: `The purpose of your feedback is to make the data visualization as good as possible. Always ask yourself 'does this help improve the data visualisation?' before commenting.`,
          tipHeading: `Interface tips`,
          tips: [
            {
              type: 'normal',
              label: `Respect the feedback limits.`
            },
            {
              type: 'normal',
              label: `Click the 'view feedback' tab to view the feedback of group members.`
            },
            {
              type: 'normal',
              label: `add markers to your feedback to indicate which part of the data visualization your feedback is about.`
            },

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
            title: `Name areas for improvement`,
            body: `Look for areas where there is room for improvement or that do not follow the rules of data visualization.`,
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
                title: `Finding areas of improvement`,
                body: ``,
                tips: [
                `Was the correct data visualisation type used or are there better suiting types?`,
                `Is there something unclear that you don't understand?`,
                `Are the labels and texts legible?`,
                `Are there any design of editorial choices that can be misleading?`,
              ]},
              interactive: {
                title: `Formulating feedback`,
                body: `Follow the tips to make sure your feedback is as clear and helpful as it can possibly be.`,
                tips: [
                {
                  heading: `Explain the importance of the problem.`,
                  detail: `When you have found a point for improvement, explain why it needs to be changed. "Make the lines thicker" should be "By making the line thicker it becomes clear that they are separated".`
                },
                {
                  heading: `Keep it objective.`,
                  detail: `Feedback should be as objective as possible, so refrain from using opions or subjective words such as "beautiful" and "ugly". "The yellow colors look beautiful" should be "The yellow colors make the legend stand out".`
                },
                {
                  heading: `Suggest possible solutions.`,
                  detail: `Suggest possible solutions or alternatives to fix the problem. Make sure the suggestion is well explained and add a sketch if necessary (by clicking the 'Add image' button).`
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
          readInstructions: {
            title: `Answer the feedback questions`,
            body: `Make sure to always atleast take a look at the feedback questions. If you already gave feedback on these topics you can skip this step.`,
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
                title: `TODO`,
                body: `TODO`,
                tips: [
                  `TODO`,
                  `TODO`,
                  `TODO`
                ]
              },
              interactive: {
                title: `Formulating feedback`,
                body: `Follow the tips to make sure your feedback is as clear and helpful as it can possibly be.`,
                tips: [
                {
                  heading: `Explain the importance of the problem.`,
                  detail: `When you have found a point for improvement, explain why it needs to be changed. "Make the lines thicker" should be "By making the line thicker it becomes clear that they are separated".`
                },
                {
                  heading: `Keep it objective.`,
                  detail: `Feedback should be as objective as possible, so refrain from using opions or subjective words such as "beautiful" and "ugly". "The yellow colors look beautiful" should be "The yellow colors make the legend stand out".`
                },
                {
                  heading: `Suggest possible solutions.`,
                  detail: `Suggest possible solutions or alternatives to fix the problem. Make sure the suggestion is well explained and add a sketch if necessary (by clicking the 'Add image' button).`
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
        title: `All feedback`,
        // body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sociis adipiscing feugiat tincidunt.`,
      }
    },
    markerContent: {
      title: `Mark the relevant parts of the data visualization.`,
      body: `Place markers by clicking on the data visualisation, you can remove markers by clicking on them.`,
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
    }
  },
};
