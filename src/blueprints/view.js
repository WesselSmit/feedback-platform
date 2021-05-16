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
          body: `Insights are a check to see if your data visualisation was correctly understood / interpreted without context. If the insights are similar to your personal conclusions it means your data visualisation is effective.`,
        },
        insights: {
          title: `All insights`,
        }
      }
    },
  ],
};
