// src/data/projects.js
// Placeholder case study data for Work page and detail views.

export const projects = [
  {
    id: 1,
    slug: 'doctor-availability-search',
    title: 'Doctor Availability in Search',
    category: 'UX Design · Healthcare',
    year: '2024',
    role: 'Frontend Engineer & Involved in Design',
    platform: 'Web · Mobile Web',
    shortDesc: 'Surfacing real-time doctor availability in search results.',
    coverColor: 'almondWash',
    coverImage: `${process.env.PUBLIC_URL || ''}/assets/search-availability.png`,

    overview: `Finding a doctor should be simple — but for most patients, it isn't. When someone searches for a physician online, they typically find a name and a phone number, then must navigate to a separate portal, call an office, or check another website just to learn whether that doctor is available. This project addresses that friction head-on. As Lead UX Designer at a healthcare startup, I led the design of a feature that surfaces a doctor's real-time appointment availability directly alongside their name in search results — giving patients the information they need to book immediately, without leaving the page.`,

    role_detail: `I owned the end-to-end design process from initial discovery through shipped MVP, working within a cross-functional team of a Product Manager, engineers, and internal stakeholders. I did user research planning and facilitation, competitive analysis of peer platforms (ZocDoc, Google Health, Healthgrades), usability testing, information architecture and user flow design, visual and interaction design through multiple iterations, and engineering handoff with close collaboration on data constraints and edge cases.`,

    research: {
      summary: `I recruited patients who had recently searched for a new doctor and conducted qualitative interviews to understand their mental model and where the process broke down. Competitive analysis revealed that while some platforms showed availability after clicking into a profile, none surfaced appointment slots directly in search results — a clear unmet opportunity.`,
      usabilityTesting: `Moderated usability tests with 6 participants using mid-fidelity prototypes. Sessions focused on three core tasks: finding a specific doctor, interpreting availability in search results, and completing a booking. Findings directly informed several design pivots.`,
    },

    designPrinciples: [
      'Reduce context switching',
      'Surface the right data at the right moment',
      'Enable booking without leaving the search experience',
    ],

    designSolutions: [
      {
        title: 'Availability Module in the Search Card',
        description: `The central design decision was embedding a compact availability strip directly within each doctor's search result card. Patients see the next 3–5 available appointment windows at a glance, with direct booking CTAs — no profile click required. Availability displayed as date chips (e.g., "Today 2pm", "Tomorrow 10am") to reduce cognitive load. Unavailable doctors clearly labeled ("Next available: 3 weeks") to set expectations.`,
      },
      {
        title: 'Progressive Disclosure for Power Users',
        description: `Research revealed a split in user behavior: some patients wanted the fastest path to booking, others wanted to compare doctors carefully. The design accommodates both — the card shows essential availability inline, with an expandable panel for full calendar detail.`,
      },
      {
        title: 'Real-Time Data Integration with Graceful Fallbacks',
        description: `Not all providers had real-time scheduling systems connected to the platform. I worked closely with engineering to design four states: (1) Real-time slots available — show date/time chips with instant booking. (2) Next available date known — show date with direct link to provider portal. (3) Accepting new patients, no date available — show contact CTA and estimated wait. (4) Not accepting new patients — clearly labeled with "Find similar doctors" suggestion.`,
      },
    ],

    iterations: [
      {
        title: 'Iteration 1 — Full Calendar Inline',
        description: `First concept placed a full week calendar inside the search card. Usability testing revealed it overwhelmed users scanning a list of results — participants skipped cards with the calendar entirely.`,
      },
      {
        title: 'Iteration 2 — Date Chips Only',
        description: `Stripped back to simple date chips. Cleaner and faster to scan, but usability testing revealed patients were uncertain whether tapping a chip would book or just show more details. The affordance was ambiguous.`,
      },
      {
        title: 'Iteration 3 — Chips + Grid (Shipped MVP)',
        description: `Final design combined date chips for scannability with a multi-day availability grid, a location selector, and a clear path to booking — all within the search card. User testing showed strong task completion rates and unprompted positive feedback. Multi-day grid (Wed through Mon) gives enough context to decide without overwhelming. Location dropdown lets patients with multiple clinic options self-select immediately. "Show More Availability" expands inline — zero context switching required.`,
      },
    ],

    outcome: `Following MVP launch, the feature delivered measurable improvements across the patient booking journey. Early data validated the core hypothesis: surfacing availability in context — not behind a click — meaningfully increases patient action. Usability participants described the experience as "finally useful" and "what Google should do for doctors." The MVP also opened conversations with provider groups about deeper EHR integrations, validating the feature as a platform differentiator.`,

    nextSteps: [
      'Insurance-aware filtering — automatically hiding doctors whose next opening is too far out given the patient\'s reason for visit',
      'Personalization — learning a user\'s scheduling preferences to surface the most relevant slots first',
      'Provider-side tooling — giving practices control over how their availability is presented',
      'Deeper EHR integration — moving from "link to booking portal" to true end-to-end scheduling within the search experience',
    ],

    reflection: `This project sharpened my ability to design within real technical constraints without compromising the user experience. The graceful fallback system — designing for four data states rather than one ideal state — was one of the most valuable thinking exercises of my career. It reinforced that great UX isn't just designing the happy path; it's designing every path with equal care.`,

    tags: ['UX Design', 'Healthcare', 'MVP', 'Shipped', 'User Research', 'Usability Testing'],
  },
  {
    id: 4,
    slug: 'provider-promotions-ranking',
    title: 'Promotions',
    category: 'UX Design · Frontend Architecture · Healthcare',
    year: '2023-2024 ',
    role: 'Frontend Engineer Lead & Involved in Design',
    platform: 'Web (Admin Dashboard)',
    shortDesc: 'Designed a provider ranking system that empowers hospital admins to optimize patient search experiences.',
    coverColor: 'weatheredSand',
    coverImage: `${process.env.PUBLIC_URL || ''}/assets/promotions.jpeg`,

    overview: `Hospital systems needed a way to surface the right providers to patients searching for specific specialties or clinical conditions. Rather than relying on rigid algorithmic sorting, I designed a flexible promotion system that puts ranking control directly in the hands of hospital admins who understand their providers' expertise and patient needs.

Hospital systems were struggling with a fundamental challenge: algorithmic provider rankings didn't account for institutional expertise, strategic priorities, or the nuanced understanding that hospital admins have about their providers' strengths.

The Core Need:

    🎯 Control: Hospital admins needed to prioritize providers based on their deep knowledge of clinical expertise
    🔍 Optimization: Patients needed to find the most appropriate providers for their specific needs
    ⚡ Flexibility: The system needed to adapt to different specialties and clinical terms without rigid constraints

Through conversations with clients and the sales team, a clear pattern emerged: hospitals wanted the expertise of medical groupings and provider prioritization to come from their own teams, not from our product's logic. This insight shaped the foundation of the Promotions feature.`,

    role_detail: `I led the full technical vision and design implementation for the Promotions feature, architecting the Redux state management system and implementing performance optimizations using RTK Query's caching capabilities. I designed the admin interface using react-virtualized for handling long lists and dnd-kit for intuitive drag-and-drop functionality.

I collaborated closely with a Product Manager and backend engineers to define ranking logic, API contracts, and data flows throughout the entire design and development process.`,

    impact: `The Promotions feature gave hospital admins direct control over provider visibility, enabling them to optimize patient search experiences based on institutional knowledge and strategic priorities. This flexibility improved patient-provider matching and strengthened the product's value proposition in the competitive healthcare search market.`,

    research: {
      summary: `The primary users of the Promotions dashboard were hospital administrators and marketing managers responsible for provider visibility and patient experience optimization.

USER GOALS

From client interviews and stakeholder discussions, I identified that users needed to:

    • Rank providers by specialty or clinical terms based on institutional knowledge
    • Adjust rankings dynamically as provider expertise, availability, or strategic priorities change
    • See immediate impact of their ranking decisions on patient-facing search results
    • Manage complex hierarchies across multiple specialties and clinical terms efficiently

USER PAIN POINTS

Users faced several challenges with existing systems:

    • No control over provider visibility in patient searches
    • Inability to highlight providers with specific clinical expertise
    • Manual, time-consuming processes to update provider information
    • Lack of flexibility to adapt rankings based on operational needs`,
      usabilityTesting: `During beta testing with select hospital admins, I gathered feedback on:

    • Ease of ranking: How intuitive was the drag-and-drop interface?
    • Information clarity: Did users understand the impact of their changes?
    • Performance perception: Did the system feel responsive?

Based on feedback, I made several refinements:

    • Added bulk action capabilities for faster initial setup
    • Improved visual feedback during drag operations
    • Enhanced the save confirmation flow with change summaries`,
    },

    requirements: {
      successMetrics: {
        product: [
          'Admin engagement with ranking tools (frequency of updates)',
          'Number of specialties/clinical terms actively managed',
          'Time to complete ranking updates',
        ],
        business: [
          'Increase in patient search satisfaction',
          'Provider utilization optimization',
          'Client retention and feature adoption rate',
        ],
        userExperience: [
          'Time to rank providers for a specialty',
          'Error rate in drag-and-drop operations',
          'System performance with large provider lists',
        ],
      },
      coreFunctionality: [
        'Ranking by Specialty: Allow admins to rank providers within medical specialties',
        'Ranking by Clinical Terms: Enable ranking for specific conditions (e.g., "knee pain," "diabetes management")',
        'Drag-and-Drop Interface: Provide intuitive reordering without complex forms',
        'Real-time Updates: Reflect ranking changes immediately in patient search results',
        'Performance at Scale: Handle long lists of providers and specialties efficiently',
      ],
    },

    technicalArchitecture: {
      stateManagement: `I designed a Redux state management system specifically optimized for the Promotions feature, considering:

    • Normalized data structures to handle relationships between providers, specialties, and clinical terms
    • Optimistic updates to provide immediate feedback during drag-and-drop operations
    • Efficient re-rendering to prevent performance degradation with large datasets`,
      performanceOptimization: {
        rtkQueryCaching: `    • Automatically cached API responses to reduce redundant network requests
    • Served previously fetched promotion data instantly on revisits
    • Set up cache invalidation policies to refresh stale data without disrupting the user experience`,
        listVirtualization: `    • Used react-virtualized to render only visible items in long specialty and provider lists
    • Prevented DOM bloat and maintained smooth scrolling performance
    • Supported thousands of entries without performance degradation`,
        dragAndDrop: `    • Implemented dnd-kit for smooth, accessible drag-and-drop functionality
    • Optimized state updates during drag operations to prevent jank
    • Ensured visual feedback remained responsive throughout interactions`,
      },
    },

    designProcess: {
      wireframing: `I started by sketching the fundamental user flows:

    • Selecting a specialty or clinical term to manage
    • Viewing the current provider ranking
    • Reordering providers through drag-and-drop
    • Saving changes and seeing confirmation

The wireframes focused on minimizing cognitive load and reducing the number of steps required to complete ranking tasks.`,
      userFlow: {
        title: 'User Flow: Promoting Providers for a Clinical Term',
        steps: [
          {
            number: 1,
            title: 'Entry Point',
            description: 'Admin navigates to "Search Results Promotions" from main navigation',
            isPrimary: true,
          },
          {
            number: 2,
            title: 'Select Category',
            description: 'Choose between "Specialties" or "Clinical Terms" tabs',
          },
          {
            number: 3,
            title: 'Browse/Search',
            description: 'Scroll through list or use search to find specific clinical term (e.g., "Dermatology")',
          },
          {
            type: 'decision',
            title: 'Has Existing Promotions?',
          },
          {
            number: '4a',
            title: 'View Promoted List',
            description: 'See currently promoted providers in ranked order (if promotions exist)',
          },
          {
            number: '4b',
            title: 'Empty State',
            description: 'Click "Promote Providers" button to start creating promotion list',
          },
          {
            number: 5,
            title: 'Reorder Providers',
            description: 'Drag and drop providers to desired ranking position using drag handles',
            isPrimary: true,
          },
          {
            number: 6,
            title: 'Add/Remove',
            description: 'Click "Remove" to delete provider from promotion list (up to 3 providers max)',
          },
          {
            number: 7,
            title: 'Collapse/Expand',
            description: 'Click chevron to collapse clinical term and view summary',
          },
          {
            number: 8,
            title: 'Auto-Save',
            description: 'Changes are saved automatically and reflected in patient-facing search results',
            isPrimary: true,
          },
        ],
        keyInsight: `The flow prioritizes speed and clarity. Hospital admins can make ranking changes in seconds without navigating through multiple screens or confirmation dialogs. Auto-save reduces cognitive load and prevents lost work.`,
      },
      wireframes: {
        mainDashboard: {
          title: 'Main Dashboard - Clinical Terms List',
          description: `The main dashboard displays clinical terms in a collapsible card format. Each card shows:

    • Clinical term name and subtitle (e.g., "Dermatology - General Dermatology")
    • Number of promoted providers (count badge)
    • "Promote Providers" button (primary when empty, secondary when populated)
    • Expand/collapse chevron
    • Synonym tags showing related search terms (e.g., "Dermatologist", "Skin Doctor")

The interface uses tabs to switch between "Specialties" and "Clinical Terms" views, with the active tab clearly indicated.`,
        },
        expandedView: {
          title: 'Expanded View - Promoted Providers',
          description: `When a clinical term is expanded, admins see:

    • Clinical term header with tags
    • Info message: "Promote up to 3 providers. Providers will only be promoted in searches related to the selected term."
    • Ranked list of promoted providers (1, 2, 3) with:
      - Drag handles (⋮⋮) for reordering
      - Provider name
      - Remove button
    • Visual rank indicators (numbered badges) provide instant feedback during drag operations`,
        },
        addProviderModal: {
          title: 'Modal - Add Providers to Promotion',
          description: `The add provider modal includes:

    • Search input for finding providers
    • Scrollable list of available providers with checkboxes
    • Provider cards showing name and specialty
    • "Cancel" and "Add Selected" buttons

This modal allows admins to quickly search and select providers to add to their promotion list.`,
        },
        emptyState: {
          title: 'Empty State - No Promotions Yet',
          description: `When no providers are promoted for a clinical term, the empty state displays:

    • Icon (📋)
    • Heading: "No Promoted Providers"
    • Descriptive text explaining the purpose
    • Primary CTA button: "Promote Providers"

This clear call-to-action guides admins toward their next action and prevents confusion about how to start.`,
        },
      },
      designDecisions: [
        {
          title: 'Visual Hierarchy',
          description: 'Clinical term cards use collapsible sections to reduce cognitive overload. Admins can scan the list quickly and focus only on terms they need to manage.',
        },
        {
          title: 'Drag Handles',
          description: '⋮⋮ icon signals draggability without instruction. Tested alternatives (whole card draggable) but users found it confusing when trying to click other elements.',
        },
        {
          title: 'Promotion Limit',
          description: 'Limited to 3 promoted providers per term based on UX research showing diminishing returns beyond top 3 results in search ranking.',
        },
        {
          title: 'Auto-Save vs Manual',
          description: 'Chose auto-save to reduce friction. Hospital admins make frequent small adjustments—requiring explicit save would slow workflow.',
        },
        {
          title: 'Clinical Tags',
          description: 'Display synonym tags (e.g., "Skin Doctor" for Dermatology) to help admins understand which patient search terms will trigger the promotion.',
        },
        {
          title: 'Performance',
          description: 'react-virtualized renders only visible rows. Without this, scrolling through 100+ clinical terms caused lag and poor UX.',
        },
        {
          title: 'Context Clarity',
          description: 'Info message "Providers will only be promoted in searches related to the selected term" clarifies scope—prevents confusion about global vs. term-specific ranking.',
        },
        {
          title: 'Zero State',
          description: 'Empty states guide admins toward next action. Without clear CTA, beta testers weren\'t sure how to start promoting providers.',
        },
        {
          title: 'Ranking Numbers',
          description: 'Visual rank indicators (1, 2, 3) provide instant feedback during drag operations. Numbered badges reinforce the ranking hierarchy.',
        },
      ],
      interactionDesign: `The drag-and-drop interface needed to feel natural and provide clear feedback:

    • Visual affordances indicating draggable items (drag handles)
    • Drop zone highlighting to show valid placement areas
    • Live preview of ranking changes before saving
    • Auto-save functionality to prevent lost work
    • Confirmation states to prevent accidental updates`,
      informationArchitecture: `I organized the dashboard to support two primary workflows:

Specialty-Based Rankings:

    • Browse by medical specialty
    • View and rank providers within each specialty
    • See provider credentials and relevant experience

Clinical Term-Based Rankings:

    • Search or browse clinical conditions
    • Rank providers by expertise for specific conditions
    • Support for multiple terms per provider`,
    },

    designPrinciples: [
      'User-centered flexibility — defer to hospital admins\' expertise rather than imposing algorithmic logic',
      'Performance must scale with datasets of 1,000+ providers',
      'Enable strategic control without overwhelming complexity',
    ],

    designSolutions: [
      {
        title: 'Specialty & Clinical Term Selection',
        description: `To handle potentially hundreds of specialties and clinical terms, I designed a combined browsing and search interface:

    • Category filters for quick navigation
    • Search functionality with autocomplete
    • Recently accessed items for quick returns
    • Usage indicators showing which terms have active rankings`,
      },
      {
        title: 'Provider Ranking Interface',
        description: `The core ranking interface balances information density with usability:

Left Panel:

    • List of providers with key information (name, credentials, current rank)
    • Virtualized rendering for performance with long lists
    • Search and filter capabilities

Drag-and-Drop Zone:

    • Clear visual hierarchy showing current ranking
    • Drag handles and hover states for interaction feedback
    • Automatic scrolling when dragging near edges
    • Immediate position updates with smooth animations

Right Panel:

    • Provider details when selected
    • Ranking history and change log
    • Save/cancel actions with confirmation`,
      },
      {
        title: 'Handling Edge Cases',
        description: `I designed for several important edge cases:

    • No providers in specialty: Clear empty state with guidance
    • Network errors during save: Optimistic updates with rollback on failure
    • Concurrent edits: Conflict detection and resolution flow
    • Large provider lists: Progressive loading with virtualization`,
      },
    ],

    constraints: [
      {
        challenge: 'Performance with Large Datasets',
        problem: `Some hospitals have hundreds of providers across dozens of specialties. Initial prototypes showed lag when rendering and reordering large lists.`,
        solution: `    • Implemented react-virtualized to render only visible list items
    • Used windowing techniques to maintain smooth scrolling
    • Optimized Redux selectors to prevent unnecessary re-renders`,
        result: 'Smooth performance even with 1,000+ providers',
      },
      {
        challenge: 'Cache Invalidation Strategy',
        problem: `Ranking updates needed to appear immediately on the patient-facing side while maintaining data consistency.`,
        solution: `    • Designed RTK Query cache invalidation policies based on update frequency
    • Implemented optimistic updates for immediate feedback
    • Set up selective cache refresh for affected specialties only`,
        result: 'Instant UI updates without sacrificing data accuracy',
      },
      {
        challenge: 'Accessibility in Drag-and-Drop',
        problem: `Standard drag-and-drop implementations often fail accessibility requirements.`,
        solution: `    • Leveraged dnd-kit's built-in keyboard navigation support
    • Added screen reader announcements for ranking changes
    • Provided alternative ranking input methods (numeric input, up/down buttons)`,
        result: 'Feature accessible to all users regardless of interaction method',
      },
    ],

    implementation: {
      designHandoff: `I created comprehensive documentation for the development team, including:

    • Component specifications with interaction states
    • State management architecture with data flow diagrams
    • Performance requirements and optimization strategies
    • Edge case handling and error states
    • Accessibility requirements and ARIA labels`,
      iteratingWithEngineering: `Throughout implementation, I worked closely with engineers to:

    • Refine the Redux state structure based on actual data patterns
    • Optimize cache invalidation timing based on usage analytics
    • Adjust virtualization parameters for different viewport sizes
    • Fine-tune drag-and-drop sensitivity and feedback`,
      userTesting: `During beta testing with select hospital admins, I gathered feedback on ease of ranking through the drag-and-drop interface, information clarity around the impact of changes, and performance perception of system responsiveness. Based on this feedback, I added bulk action capabilities for faster initial setup, improved visual feedback during drag operations, and enhanced the save confirmation flow with change summaries.`,
    },

    iterations: [
      {
        title: 'Initial Concept — Manual Input Fields',
        description: `The earliest version relied on manual input fields and up/down controls. While functional, the experience felt rigid and required too many interactions to reorder large lists.`,
      },
      {
        title: 'Iteration 1 — Basic Drag-and-Drop',
        description: `Introducing drag-and-drop improved usability significantly, but performance degraded when handling long specialty lists. Initial prototypes showed lag when rendering and reordering large lists — some hospitals have hundreds of providers across dozens of specialties.`,
      },
      {
        title: 'Iteration 2 — Performance Optimization Added',
        description: `Implemented react-virtualized to render only visible list items, used windowing techniques to maintain smooth scrolling, and optimized Redux selectors to prevent unnecessary re-renders. This achieved smooth performance even with 1,000+ providers.`,
      },
      {
        title: 'Final Implementation — Complete System',
        description: `The shipped version combined dnd-kit with react-virtualized and a refined Redux architecture with RTK Query. Rankings updated smoothly, scrolling remained performant, and API calls were optimized through intelligent caching. Added comprehensive edge case handling for no providers in specialty, network errors with rollback, concurrent edits with conflict detection, and large provider lists with progressive loading.`,
      },
    ],

    outcome: `The Promotions feature successfully empowered hospital admins to take control of provider visibility, leading to more optimized patient search experiences and stronger client satisfaction.

Key Achievements:

    • Flexible control system adopted by clients
    • Performance maintained with lists of 1,000+ providers
    • Reduced time to update provider rankings
    • Improved patient search relevance based on institutional expertise

The technical architecture and design patterns established for Promotions became a reference for subsequent features requiring complex state management and list optimization.`,

    reflection: {
      whatWorkedWell: [
        'User-Centered Flexibility: By designing a system that deferred to hospital admins\' expertise rather than imposing algorithmic logic, we created a feature that adapted to diverse institutional needs.',
        'Performance-First Approach: Implementing virtualization and caching from the start prevented technical debt and ensured scalability.',
        'Iterative Technical Design: Working closely with engineering throughout allowed for architecture decisions that balanced ideal UX with technical reality.',
      ],
      whatIdDoDifferently: [
        'Earlier User Testing: Getting prototypes in front of hospital admins sooner would have surfaced workflow preferences earlier in the design process.',
        'More Robust Analytics: Building in deeper tracking of ranking patterns could have provided insights into common use cases and informed future optimizations.',
        'Template System: Adding ranking templates for common specialty groupings could have reduced initial setup time for new clients.',
      ],
    },

    nextSteps: [
      'Earlier user testing — getting prototypes in front of hospital admins sooner would have surfaced workflow preferences earlier in the design process',
      'More robust analytics — building in deeper tracking of ranking patterns to provide insights into common use cases',
      'Template system — adding ranking templates for common specialty groupings to reduce initial setup time for new clients',
      'Bulk Provider Management — For enterprise clients managing 50+ clinical terms, exploring bulk import/export functionality and template-based promotion strategies. This would reduce initial setup time from hours to minutes. Flow: (1) Upload CSV with clinical terms and provider rankings, (2) System validates provider IDs, term matches, and ranking limits, (3) Preview & Confirm changes before applying to live search results',
      'Advanced features — time-bound promotional campaigns and AI-assisted ranking suggestions while preserving admin control',
    ],

    beyondPromotions: `The technical patterns and design principles from Promotions influenced several subsequent features, including advanced search filtering and provider availability management. The Redux architecture and caching strategies became foundational patterns adopted across the product.`,

    tags: ['UX Design', 'Frontend Architecture', 'React', 'Redux', 'RTK Query', 'Healthcare', 'Performance Optimization', 'State Management'],
  },
  {
    id: 3,
    slug: 'syncaila-redesign',
    title: 'Syncaila Redesign',
    category: 'Video Production · Post-Production · Desktop',
    year: '2024 ',
    role: 'Lead UX Designer',
    platform: 'Desktop (macOS/Windows)',
    shortDesc: 'A comprehensive redesign of Syncaila\'s multi-camera sync workflow into an intuitive, production-grade tool.',
    coverColor: 'almondWash',
    coverImage: `${process.env.PUBLIC_URL || ''}/assets/syncaila.jpg`,
    customLayout: 'syncaila',
  },
];

