- [ ] Evaluate testsuite. Eliminate low value tests, fix high value ones.
  - [x] Located a past commit with an extensive passing test suite: 1523f05
  - Current conclusion:
    - the testsuite from the CRA version can actually run and is well executed
    - The darkmode of the original CRA version looks a bit better
    - The functionality of the new Next.js+Tailwind app is better
    - The test suite was broken during the shift to redux saga, and again more severely by the shift to Next.js
    - The web app functionality was broken during the shift to redux saga

- [ ] CI for testsuite
- [ ] Automatic deployments:
    - Github Pages can handle CRA or a frontend only Next.js
    - Vercel can handle Next.js or CRA
- [ ] Explain Befunge briefly in README, and link to wikipedia
- [ ] Document existing feature set, and come up with a short list of bugfixes and simple usability improvements.


# Future Features
- [ ] Prepopulate app with interesting befunge programs.

## Old TODO (from 2019)
- UI visual for Stack & stack frames.
  - way to inspect stack elements as numbers & corresponding ascii characters
- UI visual for Console output
- Console for input
- Make editor more editor like
- Make editor resizable
  - able to add/collapse rows & columns
- Separate modes between edit & run modes
- Implement undo button
- Make buttons pop better
