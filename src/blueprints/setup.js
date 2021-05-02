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
      // navigation: [
      //   {
      //     label: 'Dashboard',
      //     action: {
      //       target: 'dashboard',
      //     },
      //   },
      //   {
      //     label: 'Next',
      //     hasOutline: true,
      //     action: 'saveSetupProgress',
      //     setupStep: 'visualisation',
      //   },
      // ],
    },
    {
      required: true,
      title: 'Explanation',
      body: 'TODO',
      tips: [
        'TODO',
      ],
      component: 'SetupLongText',
      // navigation: [
      //   {
      //     label: 'Previous',
      //     action: 'previousStep',
      //   },
      //   {
      //     label: 'Next',
      //     hasOutline: true,
      //     action: 'saveSetupProgress',
      //     setupStep: 'explanation',
      //   },
      // ],
    },
    {
      required: true,
      title: 'Feedback questions',
      body: 'TODO',
      tips: [
        'TODO',
      ],
      component: 'SetupQuestions',
      // navigation: [
      //   {
      //     label: 'Previous',
      //     action: 'previousStep',
      //   },
      //   {
      //     label: 'Next',
      //     hasOutline: true,
      //     action: 'saveSetupProgress',
      //     setupStep: 'questions',
      //   },
      // ],
    },
    {
      required: true,
      title: 'Feedback limits',
      body: 'TODO',
      tips: [
        'TODO',
      ],
      component: 'SetupLimits',
      // navigation: [
      //   {
      //     label: 'Previous',
      //     action: 'previousStep',
      //   },
      //   {
      //     label: 'Next',
      //     hasOutline: true,
      //     action: 'saveSetupProgress',
      //     setupStep: 'limits',
      //   },
      // ],
    },
    {
      required: false,
      title: 'Iterations',
      body: 'TODO',
      tips: [
        'TODO',
      ],
      component: 'SetupIterations',
      // navigation: [
      //   {
      //     label: 'Previous',
      //     action: 'previousStep',
      //   },
      //   {
      //     label: 'Save',
      //     hasOutline: true,
      //     action: 'saveSetup',
      //     setupStep: 'iterations',
      // },
      // ],
    },
  ],
};
