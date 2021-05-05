export default {
  steps: [
    {
      required: true,
      title: 'Data visualisation',
      body: 'TODO',
      tips: [
        'TODO',
      ],
      component: 'SetupVisualisation',
      rules: 'Only .png and .jpg files smaller than 5mb allowed.',
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
      title: 'Explanation',
      body: 'TODO',
      tips: [
        'TODO',
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
      title: 'Feedback questions',
      body: 'TODO',
      tips: [
        'TODO',
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
      title: 'Feedback limit',
      body: 'TODO',
      tips: [
        'TODO',
      ],
      component: 'SetupLimits',
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
      required: false,
      title: 'Iterations',
      body: 'TODO',
      tips: [
        'TODO',
      ],
      component: 'SetupIterations',
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
  ],
};
