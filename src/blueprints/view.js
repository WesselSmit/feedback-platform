/* eslint-disable */

export default {
  tabs: [
    {
      label: 'Feedback',
      value: 'feedback',
      content: {
        readInstructions: {
          title: `About the feedback`,
          body: `The goal of feedback is to improve your work, it's not personal. Feedback are opinions and suggestions of others, they are not facts. You don't have to use the feedback if you don't agree with it.`,
        },
        feedbackComments: {
          title: `All feedback`,
        }
      }
    },
    {
      label: 'Insights',
      value: 'insights',
      content: {
        readInstructions: {
          title: `About the insights`,
          body: `When users give feedback on your data visualisation they're asked to write down their insights. You can use these to check if your data visualisation is correctly interpreted.`,
        },
        insights: {
          title: `All insights`,
        }
      }
    },
  ],
};
