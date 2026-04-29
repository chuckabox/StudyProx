# Design Annotations: StudyProx

This document provides a technical and psychological rationalization for the design decisions made in the StudyProx prototype, explicitly linking them to usability heuristics and HCI principles.

---

## 1. AI Task Architect
**Decision**: Multi-step generative deconstruction with "Quick Start History".
- **Principle**: **Cognitive Load Reduction**. By deconstructing a large goal (e.g., "Final Exam") into micro-steps, the app prevents "Magnitude Paralysis."
- **Heuristic**: **Recognition over Recall**. The "Quick Start History" allows users to tap on previous goals rather than typing them from scratch, reducing cognitive effort.
- **Story Link**: *"As a stressed student, I want to start studying without having to plan the details myself."*

## 2. Hard-Lock Focus Timer
**Decision**: Modal setup with "Focus Shield" persistence.
- **Principle**: **Environmental Mirroring**. The interface changes from a productive "Planning" state to a restrictive "Focus" state, mirroring the user's internal need for discipline.
- **Heuristic**: **Visibility of System Status**. The Persistence Shield and "Hard-Lock Active" pulse provide constant reassurance that the system is functioning and protecting the focus session.
- **Accessibility**: Uses high-contrast typography and clear labels for users with attention challenges (ADHD).

## 3. Spaced Repetition Library
**Decision**: Folder-based filing with "Due Today" indicators.
- **Principle**: **Active Recall & Spaced Repetition**. The app prioritizes what to study based on memory decay, automating the decision-making process.
- **Heuristic**: **Consistency and Standards**. Uses the "folder" metaphor for academic subjects, matching the user's mental model of a physical filing system.
- **Accessibility**: Removed accuracy percentages to reduce "Performance Anxiety," focusing instead on the actionable "Due" status.

## 4. Social Analytics & Monthly Grid
**Decision**: High-density activity heat-map with interactive day-detail modal.
- **Principle**: **Social Proof**. The leaderboard uses the "Group Motivation" principle to turn individual study into a shared habit.
- **Heuristic**: **Flexibility and Efficiency of Use**. The Week/Month toggle allows users to view both high-level trends and granular daily details.
- **Accessibility**: Interactive modal ensures that even small calendar cells can be explored for "Small Details," assisting users with vision or motor control needs.

## 5. Responsive Device Frame
**Decision**: Conditionally hidden chassis with Dynamic Island.
- **Principle**: **Fidelity vs. Usability**. Provides a "premium" prototype feel on desktop while yielding to the native boundaries of real mobile devices.
- **Accessibility**: Ensures that mobile users are not hindered by a simulated UI-within-a-UI, respecting the device's native accessible interactions.
