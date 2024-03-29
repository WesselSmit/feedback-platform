/* eslint-disable */

export default {
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
  steps: [
    {
      isCentered: true,
      hideDocumentation: true,
      content: {
        inputInstructions: {
          title: `Note your insights`,
          body: `What insights can you gather from the data visualisation? What conclusions can you draw? Write them down.`,
          disclaimer: `Don't give feedback yet, you'll do that in the next steps.`,
        }
      },
      navigation: [{
          label: 'Submit',
          hasDisabled: true,
          action: 'saveInsights'
        }
      ]
    },
    {
      popUp: {
        title: `About giving feedback...`,
        body: `The purpose of your feedback is to make the data visualization as good as possible. Always ask yourself "does this help improve the data visualisation?" before commenting.`,
        tipHeading: `Some tips:`,
        tips: [
          {
            type: 'normal',
            label: `You can post multiple comments.`
          },
          {
            type: 'normal',
            label: `Indicate the relevant data visualisation parts using markers.`
          },
          {
            type: 'normal',
            label: `You can see the feedback of others by clicking on the "view feedback" tab.`,
          },
        ],
        buttonLabel: 'Got it',
      },
      content: {
        readInstructions: {
          title: `Answer the feedback questions`,
          body: `Answer the feedback question(s) below.`,
          legend: [
            {
              type: 'question',
              label: `Answer the questions below`
            },
          ],
        },
        feedbackHelper: {
          sections: {
            zero: {
              title: `How to answer feedback questions:`,
              body: ``,
              tips: [
                `Support your answers by explaining why, answers without arguments are not useful.`,
                `You can see the anwers of others by clicking on the "view feedback" tab (top right corner).`,
              ]
            },
            interactive: {
              title: `How to write valuable feedback:`,
              body: `Use the tips below to make your feedback clear and useful.`,
              tips: [
              {
                heading: `Keep it objective.`,
                detail: `Feedback should be as objective as possible, so refrain from using opions or subjective words such as "beautiful" and "ugly". \u2192 "The yellow colors look beautiful" should be "The yellow colors make the legend stand out".`
              },
              {
                heading: `Suggest a solution.`,
                detail: `Suggest a solution or alternative to fix the problem, make sure the suggestion is well explained. \u2192 add a sketch of your suggestion to your comment.`
              },
              {
                heading: `Visually support your feedback.`,
                detail: `Adding a visual aspect to your feedback (such as markers) helps others interpret your feedback, making it easier to get your point across.`
              }
            ]}
          }
        },
        feedbackInput: true
      },
      navigation: [
        {
          label: 'Next',
          hasOutline: true,
          action: 'nextStep'
        }
      ]
    },
    {
      content: {
        readInstructions: {
          title: `Name areas for improvement`,
          body: `Look for other areas that could be improved to make the data visualisation more insightful or visually stronger.`,
          legend: [
            {
              type: 'limit',
              label: `Don't include this in your feedback`
            }
          ],
        },
        feedbackHelper: {
          sections: {
            zero: {
              title: `Ask yourself this`,
              body: `You can use the questions below if you're stuck.`,
              tips: [
              `Is the correct visualisation type used?`,
              `Is there anything that you don't understand?`,
              `Are the labels and texts legible?`,
              `Are there design or editorial choices that can mislead the interpreter?`,
            ]},
            interactive: {
              title: `How to write valuable feedback:`,
              body: `Use the tips below to make your feedback clear and useful.`,
              tips: [
              {
                heading: `Explain why it's a problem.`,
                detail: `When you have found an area for improvement, explain why it needs to be changed. \u2192 "Make the lines thicker" should be "By making the line thicker you create more contrast".`
              },
              {
                heading: `Keep it objective.`,
                detail: `Feedback should be as objective as possible, so refrain from using opions or subjective words such as "beautiful" and "ugly". \u2192 "The yellow colors look beautiful" should be "The yellow colors make the legend stand out".`
              },
              {
                heading: `Suggest a solution.`,
                detail: `Suggest a solution or alternative to fix the problem, make sure the suggestion is well explained. \u2192 add a sketch of your suggestion to your comment.`
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
      content: {
        readInstructions: {
          title: `Name positive parts`,
          body: `Name parts of the data visualisation that work well or that you found enjoyable, this decreases the chance of it being removed in a future iteration.`,
        },
        feedbackHelper: {
          sections: {
            zero: {
              title: `Ask yourself this:`,
              body: `You can use the questions below if you're stuck.`,
              tips: [
                `What do you like about the visualisation?`,
                `Do you understand the visualisation? If so, you should let the creator know.`,
                `Is the visualization aesthetically pleasing?`,
              ]
            },
            interactive: {
              title: `How to write valuable feedback:`,
              body: `Use the tips below to make your feedback clear and useful.`,
              tips: [
              {
                heading: `Explain why it's good.`,
                detail: `When you name something positive, explain what makes it good. \u2192 "The colors are good" should be "The color contrast makes the text easy to read".`
              },
              {
                heading: `Keep it objective.`,
                detail: `Feedback should be as objective as possible, so refrain from using opions or subjective words such as "beautiful" and "ugly". \u2192 "The yellow colors look beautiful" should be "The yellow colors make the legend stand out".`
              },
              {
                heading: `Add markers.`,
                detail: `Adding markers allows you to clearly show what part of the visualisation your feedback relates to, this helps others to understand your feedback.`
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
          label: 'Save',
          hasOutline: true,
          action: {
            target: 'dashboard'
          }
        }
      ]
    },
  ],
  viewFeedbackSections: {
    feedbackComments: {
      title: `All feedback`,
    }
  },
  markerContent: {
    title: `Mark the relevant parts.`,
    body: `Place and remove markers by clicking on the visualisation.`,
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
  },
  imageContent: {
    title: `Add an image to your feedback.`,
    body: `Visually support your feedback by adding an image. Images can be a visual explanation or sketch of a possible solution.`,
    disclaimer: `Only .png and .jpg files smaller than 5mb allowed`,
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
};
