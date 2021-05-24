/* eslint-disable */

export default {
  steps: [
    {
      required: true,
      title: 'Upload your data visualisation',
      body: 'Make sure the data visualisation is cropped correctly. A title in the image is not necessary.',
      tips: [],
      component: 'SetupVisualisation',
      disclaimer: 'Only .png and .jpg files smaller than 5mb allowed',
      navigation: [
        {
          label: 'Dashboard',
          action: {
            target: 'dashboard',
          },
        },
        {
          label: 'Next',
          hasOutline: true,
          hasDisabled: true,
          action: 'nextStep',
        },
      ],
    },
    {
      required: true,
      title: 'What is your data visualisation about?',
      body: 'Explain what the data visualisation is about. What data have you visualised and why? What are the most interesting findings of your visualisation?',
      tips: [
        'What are the most interesting conclusions?',
        'Have you found any patterns or causes that can explain the conclusions?',
      ],
      component: 'SetupLongText',
      navigation: [
        {
          label: 'Previous',
          action: 'previousStep',
        },
        {
          label: 'Next',
          hasOutline: true,
          hasDisabled: true,
          action: 'nextStep',
        },
      ],
    },
    {
      required: true,
      title: 'What would you like feedback on?',
      body: 'The key to receiving useful feedback is asking the right questions. Enter questions you want your feedback providers to answer.',
      tips: [
        'Are there specific parts you found difficult and want feedback on?',
        'Think about the problems and choices you faced.',
      ],
      component: 'SetupQuestions',
      navigation: [
        {
          label: 'Previous',
          action: 'previousStep',
        },
        {
          label: 'Next',
          hasOutline: true,
          hasDisabled: true,
          action: 'nextStep',
        },
      ],
    },
    {
      title: 'What don’t you want feedback on?',
      body: 'Is there a part that needs to be changed, but haven’t had the time to do it? Write it down to ensure your feedback providers exclude it from their feedback.',
      tips: [
        `Only write down a change you know you\'re guaranteed make in the future.`,
        'Be specific, don\'t use umbrella terms such as: design.',
      ],
      component: 'SetupLimits',
      navigation: [
        {
          label: 'Previous',
          action: 'previousStep',
        },
        {
          label: 'Save',
          hasOutline: true,
          hasDisabled: true,
          action: 'saveSetup',
        },
      ],
    },
  ],
};
