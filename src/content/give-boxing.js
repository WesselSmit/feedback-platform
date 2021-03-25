/* eslint-disable */

export default {
  documentation: {
    menuOptions: ['home'],
    title: `Boxing heavyweight championships`,
    explanation: `The history of the different boxing heavyweight championships through the years.`,
    //todo: iterations
    questions: [
      `Is it clear what everything means?`,
      `Is the image in the center too distracting?`
    ],
    limits: `The legend`,
    visualisation: 'boxing'
  },
  sidebar: {
    hasProgressBar: true,
    steps: [{
        index: 1,
        sidebarType: 'simple',
        content: []
      },
      {
        index: 2,
        sidebarType: 'overlay',
        content: []
      },
    {
        index: 3,
        sidebarType: 'complex',
        content: []
      },
    {
        index: 4,
        sidebarType: 'complex',
        content: []
      },
    {
        index: 5,
        sidebarType: 'complex',
        content: []
      },
    ],
  },
};


/* 3 type sidebars: [name (figma frame voorbeeld)]
- simple (informatie lezen)
- overlay (feedback geven - pop-up)
- dialogue (feedback geven - negatief zero/default/detail)

simple {
  title,
  body,
  primary button,
  secondary button (optioneel)
}

overlay {
  title,
  body,
  primary button,
  secondary button (optioneel)
}

dialogue {

}
*/
