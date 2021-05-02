export default {
  steps: [
    {
      required: true,
      title: 'Data visualisation',
      body: 'TODO',
      tips: [
        'TODO',
      ],
      component: 'SetupUpload',
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
      required: true,
      title: 'Feedback limits',
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
