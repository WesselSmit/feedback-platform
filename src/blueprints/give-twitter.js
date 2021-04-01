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
        hideVisualisation: true,
        content: {
          confirmInstructions: {
            title: `Read the documentation`,
            body: `Take the time to take in all the information, so that you know what the data visualization is about. Don't worry, this information will also be available while giving feedback.`,
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
                `Was the correct visualisation type used or are there better suiting types?`,
                `Is there anything that you don't understand?.`,
                `Are the labels and texts legible?`,
                `Are there any design of editorial choices that can mislead the interpreter?`,
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
          readInstructions: {
            title: `Answer the feedback questions`,
            body: `Make sure to always answer the feedback questions. If you already gave feedback on these topics you can skip this step.`,
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
                title: `Answering feedback questions`,
                body: ``,
                tips: [
                  `Substantiate your argument by explaining why. Only answering "yes" or "no" is not helpful.`,
                  `You can view the feedback of other group members by clicking on the 'view feedback' tab.`,
                ]
              },
              interactive: {
                title: `Structuring feedback`,
                body: ``,
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
                },
                {
                  heading: `Visually support your feedback.`,
                  detail: `Adding a visual aspect to your feedback (such as markers or an image) helps others interpret your feedback, making it easier to convey your point.`
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
          readInstructions: {
            title: `Name positive parts`,
            body: `In addition to criticism and suggestions for improvements, it is also important to indicate what parts are good.`,
          },
          feedbackHelper: {
            sections: {
              zero: {
                title: `Finding positive parts`,
                body: `In addition to criticism and suggestions for improvements, it is also important to indicate what parts are good. Naming the positive parts also decreases the chance of it being removed in a future iteration.`,
                tips: [
                  `What do you like about the visualisation?`,
                  `Do you understand the visualisation? If so, you should mention this.`,
                  `You can view the feedback of other group members by clicking on the 'view feedback' tab.`,
                ]
              },
              interactive: {
                title: `Structuring feedback`,
                body: `In addition to criticism and suggestions for improvements, it is also important to indicate what parts are good. Naming the positive parts also decreases the chance of it being removed in a future iteration.`,
                tips: [
                {
                  heading: `Explain why it's good.`,
                  detail: `When you name a positive part, explain what makes it good. "The colors are good" should be "The color contrast makes the text legible and helps my eyes focus".`
                },
                {
                  heading: `Keep it objective.`,
                  detail: `Feedback should be as objective as possible, so refrain from using opions or subjective words such as "beautiful" and "ugly". "The yellow colors look beautiful" should be "The yellow colors make the legend stand out".`
                },
                {
                  heading: `Add markers.`,
                  detail: `Adding markers allows you to clearly communicate what part of the visualisation your feedback is related to, this mskes your feedback easier to interpret.`
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
          label: 'Save',
          hasOutline: true,
          hasDisabled: true,
          action: 'saveMarkers',
        }
      ]
    }
  },
};
