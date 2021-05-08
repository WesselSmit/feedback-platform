/* eslint-disable */

export default {
  steps: [
    {
      required: true,
      title: 'Upload your data visualisation',
      body: 'Make sure the data visualisation is cropped correctly. A title in the image is not necessary.',
      tips: [],
      component: 'SetupVisualisation',
      rules: 'Only .png and .jpg files smaller than 5mb allowed',
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
      body: 'The key to receiving useful feedback is asking the right questions, your feedback providers will answer these questions.',
      tips: [
        'Think about the problems and choices you faced.',
        'Are there specific parts you found difficult and want feedback on?',
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
      body: 'Is there a part that needs to be changed, but haven’t had the time to do it? Write the ‘limit’ down to ensure your feedback providers exclude it from their feedback.',
      tips: [
        `You should only have a 'limit' if you have changes you know you\'ll guaranteed make in the future.`,
        'Your limit should only be a small part / detail.',
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
