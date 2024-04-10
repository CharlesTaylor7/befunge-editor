# Features
- [ ] Sync programs to local storage
- [ ] Allow writing a name & description for each program 
- [ ] Legend explaining befunge commands. 
- [ ] Github repo badge in corner
- [ ] Variable speed of execution
- [ ] instruction set legend below editor
- [ ] Show stack elements as both ascii or numbers  
- [ ] able to buffer multiple inputs to stdin ahead of time
- [ ] Make grid editor able to add/remove rows & columns
- [ ] Make grid editor drag and dropable
- [ ] Pause, step, and play buttons
    - icons
    - layout
    - functionality

- [x] Prepopulate app with dropdown of interesting befunge programs.
  - [x] Factorial
  - [x] Quine
  - [ ] Prime Number Generator


# Tech Debt
- [ ] Eliminate Immutable JS 
    We don't need immutable persistent collections with alpine. I had those in place for use with React. Alpine will be more efficient with mutable collections all the way down.
- [ ] Eliminate Ramda.
    I don't like auto currying in JS anymore.
