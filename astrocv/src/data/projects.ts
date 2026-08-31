import type { IProjectsItem } from "../components/Projects/Projects-item.astro";

export const PROJECTS_LIST: IProjectsItem[] = [
    {
        asciiart: `
dP   dP   dP          dP dP                              
88   88   88          88 88                              
88  .8P  .8P .d8888b. 88 88 dP    dP 88d8b.d8b. .d8888b. 
88  d8'  d8' 88ooood8 88 88 88    88 88''88''88 88ooood8 
88.d8P8.d8P  88.  ... 88 88 88.  .88 88  88  88 88.  ... 
8888' Y88'   '88888P' dP dP '8888P88 dP  dP  dP '88888P' 
                        .88                     
                    d8888P`,
        text: `Wellyme is my blog about Health, Nutrition, and Fitness, where
I share insights to promote a healthy life.`,
        href: "https://www.wellyme.org/",
        name: "Wellyme",
    },
    {
        asciiart: `
.d88888b           dP dP                   oo                                       
88.    "'          88 88                                                            
'Y88888b. dP    dP 88 88 .d8888b. .d8888b. dP 88d8b.d8b. .d8888b. dP    dP .d8888b. 
      '8b 88    88 88 88 88'  '88 88'  '88 88 88''88''88 88'  '88 88    88 Y8ooooo. 
d8'   .8P 88.  .88 88 88 88.  .88 88.  .88 88 88  88  88 88.  .88 88.  .88       88 
 Y88888P  '8888P88 dP dP '88888P' '8888P88 dP dP  dP  dP '88888P' '88888P' '88888P' 
              .88                     .88                                          
          d8888P                  d8888P`,
        text: `Syllogimous v4 takes classic logic challenges and turns them
into a brain workout.`,
        href: "https://4skinskywalker.github.io/Syllogimous-v4/",
        name: "Syllogimous v4",
    },
    {
        asciiart: `
dP     dP                                         888888ba           dP                         dP       
88     88                                         88    '8b          88                         88       
88aaaaa88a dP    dP 88d888b. .d8888b. 88d888b.    88     88          88d888b. .d8888b. .d8888b. 88  .dP  
88     88  88    88 88'  '88 88ooood8 88'  '88    88     88 88888888 88'  '88 88'  '88 88'  '"" 88888"   
88     88  88.  .88 88.  .88 88.  ... 88          88     88          88.  .88 88.  .88 88.  ... 88  '8b. 
dP     dP  '8888P88 88Y888P' '88888P' dP          dP     dP          88Y8888' '88888P8 '88888P' dP   'YP 
                .88 88                                                                                   
            d8888P  dP`,
        text: `Hyper-dimensional n-back, improving traditional n-back tasks
by engaging multiple cognitive dimensions.`,
        href: "https://4skinskywalker.github.io/3D-Hyper-N-back/",
        name: "Hyper 3D N-back",
    },
    {
        asciiart: `
 .d888888             dP   oo   dP                  dP          
d8'    88             88        88                  88          
88aaaaa88a 88d888b. d8888P dP d8888P dP    dP .d888b88 .d8888b. 
88     88  88'  '88   88   88   88   88    88 88'  '88 88ooood8 
88     88  88.  .88   88   88   88   88.  .88 88.  .88 88.  ... 
88     88  88Y888P'   dP   dP   dP   '88888P' '88888P8 '88888P' 
           88                                                   
           dP`,
        text: `Aptitude Tests is an app where you can take tests to prepare
for various assessments and improve your skills.`,
        href: "https://4skinskywalker.github.io/aptitude-tests/",
        name: "Aptitude Tests",
    },
    {
        asciiart: `
 d888888P                                .d888888                                      
    88                                  d8'    88                                      
    88    dP    dP 88d888b. .d8888b.    88aaaaa88a 88d888b. .d8888b. 88d888b. .d8888b. 
    88    88    88 88'  '88 88ooood8    88     88  88'  '88 88ooood8 88'  '88 88'  '88 
    88    88.  .88 88.  .88 88.  ...    88     88  88       88.  ... 88    88 88.  .88 
    dP    '8888P88 88Y888P' '88888P'    88     88  dP       '88888P' dP    dP '88888P8 
               .88 88                                                                  
           d8888P  dP  `,
        text: `Engage in fast typing challenges with your friends at Type
Arena! This is for training in multiplayer typing battles.`,
        href: "https://4skinskywalker.github.io/type-arena/",
        name: "Type Arena",
    },
    {
        asciiart: `
 a88888b. .d88888b  .d88888b      .d888888                                      
d8'   '88 88.    "' 88.    "'    d8'    88                                      
88        'Y88888b. 'Y88888b.    88aaaaa88a 88d888b. .d8888b. 88d888b. .d8888b. 
88              '8b       '8b    88     88  88'  '88 88ooood8 88'  '88 88'  '88 
Y8.   .88 d8'   .8P d8'   .8P    88     88  88       88.  ... 88    88 88.  .88 
 Y88888P'  Y88888P   Y88888P     88     88  dP       '88888P' dP    dP '88888P8`,
        text: `Play CSS challenges with your friends! This website serves as
a testing ground for exploring multiplayer opportunities.`,
        href: "https://4skinskywalker.github.io/CSS-Arena/",
        name: "CSS Arena",
    },
    {
        asciiart: `
       dP .d88888b      .d888888                                      
       88 88.    "'    d8'    88                                      
       88 'Y88888b.    88aaaaa88a 88d888b. .d8888b. 88d888b. .d8888b. 
       88       '8b    88     88  88'  '88 88ooood8 88'  '88 88'  '88 
88.  .d8P d8'   .8P    88     88  88       88.  ... 88    88 88.  .88 
 'Y8888'   Y88888P     88     88  dP       '88888P' dP    dP '88888P88`,
        text: `Play JavaScript challenges with your friends and compete in
real-time coding battles!`,
        href: "https://js-arena.dev/languages/js",
        name: "JS Arena",
    },
    {
        asciiart: `
.d88888b   .88888.   dP            .d888888                                             
88.    "' d8'   '8b  88           d8'    88                                               
'Y88888b. 88     88  88           88aaaaa88a 88d888b. .d8888b. .d8888b. 88d888b. .d8888b. 
      '8b 88  db 88  88           88     88  88'  '88 88ooood8 88'  '88 88'  '88 88'  '88 
d8'   .8P Y8.  Y88P  88           88     88  88       88.  ... 88.  .88 88    88 88.  .88 
 Y88888P   '8888PY8b 88888888P    88     88  dP       '88888P' '88888P8 dP    dP '88888P8`,
        text: `Engage in SQL challenges with colleagues and compete in
real-time database problems!`,
        href: "https://js-arena.dev/languages/sql",
        name: "SQL Arena",
    },
    {
        asciiart: `
dP   dP   dP                         dP    8888ba.88ba                                        oo                     dP   oo                   
88   88   88                         88    88  '8b  '8b                                                              88                        
88  .8P  .8P .d8888b. 88d888b. .d888b88    88   88   88 .d8888b. 88d8b.d8b. .d8888b. 88d888b. dP d888888b .d8888b. d8888P dP .d8888b. 88d888b. 
88  d8'  d8' 88'  '88 88'  '88 88'  '88    88   88   88 88ooood8 88''88''88 88'  '88 88'  '88 88    .d8P' 88'  '88   88   88 88'  '88 88'  '88 
88.d8P8.d8P  88.  .88 88       88.  .88    88   88   88 88.  ... 88  88  88 88.  .88 88       88  .Y8P    88.  .88   88   88 88.  .88 88    88 
8888' Y88'   '88888P' dP       '88888P8    dP   dP   dP '88888P' dP  dP  dP '88888P' dP       dP d888888P '88888P8   dP   dP '88888P' dP    dP`,
        text: `Word Memorization is an app designed to enhance memory
retention through fun and engaging training.`,
        href: "https://4skinskywalker.github.io/Word-Memorization-Training/",
        name: "Word Memorization",
    },
    {
        asciiart: `
 .d888888                                 88888888b dP                                a88888b. .d88888b  .d88888b  
d8'    88                                 88        88                               d8'   '88 88.    "' 88.    "' 
88aaaaa88a .d8888b. .d8888b. 88d888b.    a88aaaa    88 .d8888b. dP.  .dP dP.  .dP    88        'Y88888b. 'Y88888b. 
88     88  88ooood8 88'  '88 88'  '88     88        88 88ooood8  '8bd8'   '8bd8'     88              '8b       '8b 
88     88  88.  ... 88.  .88 88    88     88        88 88.  ...  .d88b.   .d88b.     Y8.   .88 d8'   .8P d8'   .8P 
88     88  '88888P' '88888P' dP    dP     dP        dP '88888P' dP'  'dP dP'  'dP     Y88888P'  Y88888P   Y88888P`,
        text: `Aeon Flexx CSS is a retro-futuristic stylesheet that
transforms your interface into a cyberpunk terminal.`,
        href: "https://4skinskywalker.github.io/Aeon-Flexx-CSS/",
        name: "Aeon Flexx CSS",
    },
    {
        asciiart: `
88888888b                         dP                                     
88                                88                                     
a88aaaa    88d888b. .d8888b. .d888b88 .d8888b. 88d888b. .d8888b. 88d888b. 
88        88'  '88 88ooood8 88'  '88 88'  '88 88'  '88 88ooood8 88'  '88 
88        88       88.  ... 88.  .88 88.  .88 88.  .88 88.  ... 88    88 
dP        dP       '88888P' '88888P8 '88888P' 88Y888P' '88888P' dP    dP 
                                              88                         
                                              dP`,
        text: `Fredopen is a tool for editing html, css, and javascript with
realtime preview. It's very similar to Codepen.`,
        onClickFn: "openFredopen()",
        name: "Fredopen",
    }
];