class BiographyEntry {
    constructor(year, icon, iconColor, paragraphs) {
        this.year = year;
        this.icon = icon;
        this.iconColor = iconColor;
        this.paragraphs = paragraphs;
    }
}

export const BIOGRAPHY_ENTRIES = [
    new BiographyEntry('1995', 'baby-carriage', '#1565c0',
        ["I was born. The more I say about this, the greater the risk of identity theft, so I’ll just leave it at that."]
    ),
    new BiographyEntry('2008', 'briefcase', '#4e342e',
        ["I started my first job as a paperboy for the News of Delaware County. When I say I made a lot of money, I’m kidding."]
    ),
    new BiographyEntry('2012', 'calculator', '#ff5f52',
        ["I wrote my first computer program on a TI-84 calculator. It ran the quadratic formula with values read in from user input."]
    ),
    new BiographyEntry('2014', 'seedling', '#558b2f',
        ["I learned Python through a Coursera course the summer after graduating high school. I owe the instructor, Charles Severance of the University of Michigan, for planting the seeds that guided me where I am today."]
    ),
    new BiographyEntry('2014', 'brain', '#039be5',
        ["I started college as a neuroscience major at the University of Pittsburgh. After seeing my grandparents affected by stroke and Alzheimer’s disease, I wanted to research neurological diseases to help people like them. I would complete two years of biology, physics, neuroscience, and organic chemistry courses before deciding to change my path—but more on that later."]
    ),
    new BiographyEntry('2015', 'microscope', '#6a1b9a',
        ["While a freshman at Pitt, I began doing undergraduate research in the lab of Stephen Meriney. I measured the electrical activity of ion channels embedded in cell membranes using a technique called patch-clamp electrophysiology. The work was interesting, but the procedure demanded a great deal of manual dexterity and muscle memory, and after a year of practice, I wasn’t satisfied with my progress."]
    ),
    new BiographyEntry('2016', 'code-branch', '#039be5',
        [
         "I brought up my concerns with my lab’s primary investigator, and we decided I could try out a new project—instead of measuring the activity of real ion channels, I would simulate the kinetics of ion channels with computer models.",
         "As I took on computer modeling and data analytics responsibilities, I was programming more than ever. Although I hadn’t been crazy about coding before, I caught the bug once I applied it to real-world problems.",
         "Alongside my research as a Brackenridge fellow in summer 2016, I taught myself Java and created things I never knew I had the potential to create—a clone of Pong, an animated gravity simulator, and an adventure game that involved talking goats. You know, normal people stuff."
        ]
    ),
    new BiographyEntry('2016', 'rocket', '#ad1457',
        [
         "I switched my major to computer science after two full years of studying neuroscience. It was a daunting leap, but as I gained more knowledge of both fields, it became increasingly clear this was the better path for me.",
         "I discontinued my research to focus on catching up in my new major. I loaded up on computer science courses and hunkered down in libraries, empty classrooms, parks, lounges, buses… okay, I didn’t hunker down. Everywhere I went, my coursework followed."
        ]
    ),
    new BiographyEntry('2017', 'code', '#37474f',
        [
         "I joined Carnegie Mellon University’s Human Computer Interaction Institute as an intern. Here I worked on a small team and taught myself the foundations of front-end web development (HTML, CSS, and JavaScript) from scratch. My knowledge of Python came in handy for the back end. Within a few weeks we were churning out features for an online learning platform used by participants in Wikimedia’s Wikipedia Education Program."
        ]
    ),
    new BiographyEntry('2018', 'mobile-alt', '#4e342e',
        [
         "I entered industry for the first time at UPMC. Here I taught myself mobile development as I built a cross-platform mobile app with NativeScript. The skills I learned would help me build my own mobile app, which eventually made it to the Android app store."
        ]
    ),
    new BiographyEntry('2019', 'mortar-pestle', '#283593',
        [
         "I began working for McKesson, a Fortune 7 company specializing in healthcare technology and logistics. Originally an independent startup, my team built one of the first centralized pharmacy management systems. Although our clients include thousands of pharmacies filling millions of prescriptions a day, it still feels like a small shop.",
         "Every day at work offers a new puzzle, and I’ve grown to love solving them. It’s fantastic to know that some of my work dealing with Covid-19 vaccinations and treatments for rare diseases is meaningfully helping pharmacies help patients. One day every codebase will be a legacy codebase, so I’m glad I’ve been exposed to technologies old and new and learned a lot about maintaining and modernizing legacy code."
        ]
    ),
    new BiographyEntry('Tomorrow', 'map', '#ad1457',
        [
         "I can't be certain what the future has in store, but I believe I'll always want to use technology to make the world a better place."
        ]
    )
];
