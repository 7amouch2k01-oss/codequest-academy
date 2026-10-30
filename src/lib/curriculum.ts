// Curriculum catalogue for ByteDojo. Front-end demo data: everything the
// learner sees is defined here as plain literals, no server calls.

export type LangId = "python" | "c" | "cpp" | "html";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  why: string;
}

export interface LessonTask {
  prompt: string;
  starter: string;
  hint: string;
  solution: string;
}

export interface TeachSection {
  heading: string;
  body: string;
}

export interface Lesson {
  id: string;
  unit: string;
  title: string;
  minutes: number;
  xp: number;
  blurb: string;
  teach: TeachSection[];
  sample: { code: string; out?: string };
  quiz: QuizQuestion[];
  task: LessonTask;
}

export interface Level {
  id: number;
  name: string;
  tagline: string;
  free: boolean;
  lessons: Lesson[];
  exam: {
    title: string;
    minutes: number;
    xp: number;
    questions: QuizQuestion[];
  };
}

export interface Language {
  id: LangId;
  name: string;
  short: string;
  blurb: string;
  token: string; // css custom property holding the language accent
  levels: Level[];
}

export const PASS_MARK = 80;

const PLACEHOLDER_QUIZ: QuizQuestion[] = [
  {
    q: "This level is unlocked with a ByteDojo Pro plan. What does the plan open?",
    options: [
      "Every lesson, quiz, challenge and final exam of all four levels",
      "Only the first two lessons",
      "Nothing, it is a cosmetic badge",
      "Only the certificate",
    ],
    answer: 0,
    why: "Pro unlocks the full path for a language: lessons, challenges, final exam and certificate.",
  },
];

/** Compact lesson used for paid levels: the map shows it, the player gates it. */
function paid(
  id: string,
  unit: string,
  title: string,
  blurb: string,
  minutes = 12,
  xp = 120,
): Lesson {
  return {
    id,
    unit,
    title,
    minutes,
    xp,
    blurb,
    teach: [],
    sample: { code: "" },
    quiz: PLACEHOLDER_QUIZ,
    task: { prompt: blurb, starter: "", hint: "", solution: "" },
  };
}

const python: Language = {
  id: "python",
  name: "Python",
  short: "PY",
  blurb: "The friendliest way in. Readable code, instant results, endless uses.",
  token: "--lang-python",
  levels: [
    {
      id: 1,
      name: "Beginner",
      tagline: "Type real code from minute one.",
      free: true,
      lessons: [
        {
          id: "py-1-1",
          unit: "First steps",
          title: "Say hello to Python",
          minutes: 8,
          xp: 40,
          blurb: "Print your first line of text and learn how Python reads a file top to bottom.",
          teach: [
            {
              heading: "print() talks back",
              body: "Python runs one line at a time, top to bottom. print(value) sends whatever you hand it to the screen. Text must live inside quotes — Python treats unquoted words as names it has to look up.",
            },
            {
              heading: "Comments are for humans",
              body: "Anything after a # is ignored by Python. Use it to leave notes for your future self: why you did something, not what the code literally says.",
            },
            {
              heading: "Strings can be joined",
              body: 'Two strings written next to each other with a + are glued together: "py" + "thon" gives "python". To repeat a string, multiply it: "-" * 10 gives ten dashes.',
            },
          ],
          sample: {
            code: 'print("Hello, ByteDojo!")\nprint("I am learning Python.")\nprint("snack" + "time")\n# the line above glues two words together\nprint("-" * 10)',
            out: "Hello, ByteDojo!\nI am learning Python.\nsnacktime\n----------",
          },
          quiz: [
            {
              q: "Which line prints the word hello correctly?",
              options: ['print("hello")', "print(hello)", "print hello", 'echo "hello"'],
              answer: 0,
              why: "Text needs quotes, and print() needs parentheses. Without quotes, Python hunts for a variable called hello and crashes.",
            },
            {
              q: "What does # at the start of a line mean?",
              options: [
                "The line is a note Python ignores",
                "The line is a heading",
                "Python runs it twice",
                "The line is an error",
              ],
              answer: 0,
              why: "# marks a comment: Python skips everything after it on that line.",
            },
            {
              q: 'What does print("ab" * 2) output?',
              options: ["abab", "ab2", '"ab" * 2', "ab ab"],
              answer: 0,
              why: "Multiplying a string repeats it that many times, so ab becomes abab.",
            },
          ],
          task: {
            prompt: "Print your own ninja name and one thing you want to build this month.",
            starter: 'print("My ninja name is ...")\nprint("This month I will build ...")',
            hint: "Every piece of text needs quotes, and every print needs parentheses.",
            solution: 'print("My ninja name is Kaido")\nprint("This month I will build a quiz game")',
          },
        },
        {
          id: "py-1-2",
          unit: "First steps",
          title: "Variables: boxes for values",
          minutes: 10,
          xp: 50,
          blurb: "Store values under names you choose, then reuse them anywhere in the program.",
          teach: [
            {
              heading: "The = sign means 'store'",
              body: "score = 10 puts the number 10 into a box labelled score. Read = right to left: take what is on the right, drop it in the box on the left. Later you can overwrite the box with a new value.",
            },
            {
              heading: "Naming rules",
              body: "Names use letters, digits and underscores, never start with a digit, and are case sensitive: Score and score are two different boxes. Pick names that say what the value is — xp_earned, not x.",
            },
            {
              heading: "f-strings for neat sentences",
              body: 'Put an f before the quotes and drop variables inside curly braces: f"You scored {score} XP". Python fills the braces in for you.',
            },
          ],
          sample: {
            code: 'name = "Kaido"\nxp = 40\nxp = xp + 10\nprint(f"{name} now has {xp} XP")',
            out: "Kaido now has 50 XP",
          },
          quiz: [
            {
              q: "Which variable name is allowed?",
              options: ["xp_earned", "2xp", "xp earned", "class"],
              answer: 0,
              why: "Names may contain underscores but cannot start with a digit, contain spaces, or use a reserved word like class.",
            },
            {
              q: "What does count = count + 1 do?",
              options: [
                "Adds 1 to the value already in count and stores it back",
                "Creates a second variable called count + 1",
                "Compares count with 1",
                "Resets count to 1",
              ],
              answer: 0,
              why: "Python evaluates the right side first, then stores the result in the box on the left.",
            },
            {
              q: 'Which line prints "I have 3 lives"?',
              options: [
                'print(f"I have {lives} lives")',
                'print("I have {lives} lives")',
                "print(I have lives lives)",
                'print("I have " lives " lives")',
              ],
              answer: 0,
              why: "The f prefix is what makes Python replace {lives} with the value inside the box.",
            },
          ],
          task: {
            prompt: "Store your name, your daily XP goal and your current XP, then print one f-string sentence with all three.",
            starter: 'name = ""\ngoal = 0\nxp = 0\nprint(f"")',
            hint: "Assign each value first, then reference them inside the curly braces of one f-string.",
            solution: 'name = "Kaido"\ngoal = 100\nxp = 40\nprint(f"{name} has {xp} XP of a {goal} XP goal")',
          },
        },
        {
          id: "py-1-3",
          unit: "Numbers & choices",
          title: "Math, input and the % trick",
          minutes: 12,
          xp: 60,
          blurb: "Do arithmetic, ask the user for a value, and use the remainder operator for cycles.",
          teach: [
            {
              heading: "Operators",
              body: "+ - * / behave as in maths. // throws away the decimals (7 // 2 is 3), ** raises to a power (2 ** 3 is 8) and % gives what is left over after dividing (7 % 2 is 1).",
            },
            {
              heading: "input() always returns text",
              body: "answer = input(\"Your guess: \") waits for typing and hands you a string. To do maths with it, convert first: int(answer) for whole numbers, float(answer) for decimals.",
            },
            {
              heading: "Why % is a ninja tool",
              body: "n % 2 is 0 for even numbers and 1 for odd ones. n % 60 turns seconds into minutes, n % 7 turns days into weekdays — anything that repeats uses the remainder.",
            },
          ],
          sample: {
            code: 'print(7 // 2, 7 % 2)\nprint(2 ** 3)\nseconds = 137\nprint(f"{seconds // 60} min {seconds % 60} sec")',
            out: "3 1\n8\n2 min 17 sec",
          },
          quiz: [
            {
              q: "What does 9 % 4 give?",
              options: ["1", "2", "2.25", "0"],
              answer: 0,
              why: "4 fits twice into 9 with 1 left over — % reports the leftovers.",
            },
            {
              q: "input() gives you a value. To add it to a number you must...",
              options: [
                "convert it with int() or float() first",
                "put it in quotes",
                "multiply it by 1",
                "nothing, it is already a number",
              ],
              answer: 0,
              why: "input() hands back a string, and strings cannot be added to numbers.",
            },
            {
              q: "Which expression tells you a number n is even?",
              options: ["n % 2 == 0", "n / 2 == 0", "n % 2 == 1", "n // 2"],
              answer: 0,
              why: "Even numbers leave no remainder when divided by 2.",
            },
          ],
          task: {
            prompt: "Ask for a number of minutes and print how many full hours and leftover minutes that is.",
            starter: 'minutes = int(input("Minutes: "))\nprint(f"")',
            hint: "Use // for full hours and % for the leftover minutes.",
            solution: 'minutes = int(input("Minutes: "))\nprint(f"{minutes // 60} h {minutes % 60} min")',
          },
        },
        {
          id: "py-1-4",
          unit: "Numbers & choices",
          title: "If this, then that",
          minutes: 14,
          xp: 70,
          blurb: "Make the program pick a path with if, elif and else — the heart of every quiz app.",
          teach: [
            {
              heading: "Conditions are True or False",
              body: "A comparison such as score >= 80 produces a boolean: True or False. Use == to compare, = to store; > and < for size; != for different.",
            },
            {
              heading: "Indentation is the block",
              body: "Python has no braces. Lines indented under an if belong to it — four spaces, always the same amount. Unindent to end the block.",
            },
            {
              heading: "elif and else",
              body: "if runs the first block whose test is True. elif adds extra tests, only tried when the ones above failed. else catches everything left. And/or/not combine tests: if xp >= 80 and streak > 3.",
            },
          ],
          sample: {
            code: 'score = 86\nif score >= 80:\n    print("Level passed")\nelif score >= 60:\n    print("Retry tonight")\nelse:\n    print("Ask the tutor")',
            out: "Level passed",
          },
          quiz: [
            {
              q: "Which operator checks that two values are equal?",
              options: ["==", "=", "===", "!=",],
              answer: 0,
              why: "One = stores a value; the double == compares them.",
            },
            {
              q: "How does Python know which lines belong to an if?",
              options: [
                "They are indented under it",
                "They end with a colon",
                "They are inside braces",
                "They are written in caps",
              ],
              answer: 0,
              why: "Indentation defines blocks in Python — the colon just announces that a block follows.",
            },
            {
              q: "With score = 55, which branch runs in the sample?",
              options: ["Ask the tutor", "Level passed", "Retry tonight", "None of them"],
              answer: 0,
              why: "55 fails >= 80 and >= 60, so only the else block runs.",
            },
          ],
          task: {
            prompt: "Read a quiz score and print 'Passed' at 80 or above, 'Retry' from 50 to 79, and 'Get a hint' below 50.",
            starter: 'score = int(input("Score: "))\n',
            hint: "Three branches: if / elif / else. Remember the colon and the four spaces.",
            solution: 'score = int(input("Score: "))\nif score >= 80:\n    print("Passed")\nelif score >= 50:\n    print("Retry")\nelse:\n    print("Get a hint")',
          },
        },
      ],
      exam: {
        title: "Beginner final exam",
        minutes: 20,
        xp: 250,
        questions: [
          {
            q: "Which line stores 20 in a box called xp?",
            options: ["xp = 20", "20 = xp", "xp == 20", "let xp = 20"],
            answer: 0,
            why: "Assignment writes right to left: value on the right, name on the left.",
          },
          {
            q: 'What does print("7" + "3") show?',
            options: ["73", "10", '"7+3"', "an error"],
            answer: 0,
            why: "Quoted digits are text, and + glues text: 7 and 3 become 73.",
          },
          {
            q: "Which value makes n % 3 == 0 true?",
            options: ["9", "10", "8", "7"],
            answer: 0,
            why: "3 divides 9 exactly, so the remainder is 0.",
          },
          {
            q: "A block of code under an if is recognised by...",
            options: ["consistent indentation", "curly braces", "a semicolon", "bold text"],
            answer: 0,
            why: "Python reads structure from indentation.",
          },
          {
            q: "You want a message that mixes text and the value in name. Use...",
            options: ['f"Hi {name}"', '"Hi {name}"', "Hi + name", "print(name, Hi)"],
            answer: 0,
            why: "The f prefix turns the string into a template whose braces get filled in.",
          },
          {
            q: "score = 79. Which branch prints 'Passed'?",
            options: [
              "if score >= 80: print('Passed')",
              "if score > 80: print('Passed')",
              "if score == 80: print('Passed')",
              "if score != 80: print('Passed')",
            ],
            answer: 3,
            why: "Only != is true for 79 — the other three tests all fail at 79.",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Intermediate",
      tagline: "Lists, dicts, functions and files.",
      free: false,
      lessons: [
        paid("py-2-1", "Collections", "Lists: rows of values", "Create, index, slice and loop over lists."),
        paid("py-2-2", "Collections", "Dictionaries: labelled boxes", "Store values under keys and look them up instantly."),
        paid("py-2-3", "Control", "Loops that matter", "for, while, break, continue and nested loops."),
        paid("py-2-4", "Reuse", "Functions and return", "Package logic once, call it anywhere, hand values back."),
        paid("py-2-5", "Files", "Read and write files", "Persist a save game between runs."),
        paid("py-2-6", "Safety", "Errors and try/except", "Catch crashes and keep the program alive."),
      ],
      exam: { title: "Intermediate final exam", minutes: 30, xp: 400, questions: PLACEHOLDER_QUIZ },
    },
    {
      id: 3,
      name: "Advanced",
      tagline: "Classes, modules, APIs and testing.",
      free: false,
      lessons: [
        paid("py-3-1", "Design", "Classes and objects", "Model a ninja as data plus behaviour."),
        paid("py-3-2", "Design", "Inheritance and dunder methods", "Reuse and extend existing classes."),
        paid("py-3-3", "Ecosystem", "Modules, packages and virtual envs", "Ship code that installs cleanly."),
        paid("py-3-4", "Data", "JSON, APIs and requests", "Talk to a real web service."),
        paid("py-3-5", "Quality", "pytest and coverage", "Prove your code still works."),
        paid("py-3-6", "Speed", "Comprehensions and generators", "Do more with less memory."),
      ],
      exam: { title: "Advanced final exam", minutes: 40, xp: 600, questions: PLACEHOLDER_QUIZ },
    },
    {
      id: 4,
      name: "Expert",
      tagline: "Async, design, and a portfolio project.",
      free: false,
      lessons: [
        paid("py-4-1", "Concurrency", "asyncio in practice", "Run a hundred tasks without threads."),
        paid("py-4-2", "Craft", "Decorators and context managers", "Write the tools other people import."),
        paid("py-4-3", "Scale", "Caching, profiling, big-O", "Find and fix the slow path."),
        paid("py-4-4", "Ship", "Packaging and CI", "Publish a package people trust."),
        paid("py-4-5", "Capstone", "Portfolio project", "Design, build and defend a real app."),
      ],
      exam: { title: "Expert final exam + project defence", minutes: 60, xp: 900, questions: PLACEHOLDER_QUIZ },
    },
  ],
};

const cLang: Language = {
  id: "c",
  name: "C",
  short: "C",
  blurb: "Go close to the metal: memory, pointers, and total control.",
  token: "--lang-c",
  levels: [
    {
      id: 1,
      name: "Beginner",
      tagline: "Compile, run, and understand every byte.",
      free: true,
      lessons: [
        {
          id: "c-1-1",
          unit: "First steps",
          title: "Your first C program",
          minutes: 10,
          xp: 40,
          blurb: "Write, compile and run the smallest legal C program, then read printf's format codes.",
          teach: [
            {
              heading: "The skeleton",
              body: "Every C program needs stdio.h for screen output and a function named main. The operating system calls main and reads the number it returns: 0 means 'finished cleanly'.",
            },
            {
              heading: "printf and its codes",
              body: 'printf takes text with placeholders: %d for whole numbers, %s for text, %f for decimals, %c for one character. \\n moves to a new line — printf never adds one for you.',
            },
            {
              heading: "Compile then run",
              body: "gcc hello.c -o hello turns source into a program; ./hello runs it. C is compiled ahead of time, so a typo stops the whole build instead of failing on one line.",
            },
          ],
          sample: {
            code: '#include <stdio.h>\n\nint main(void) {\n    int xp = 40;\n    printf("Hello from C\\n");\n    printf("XP: %d\\n", xp);\n    return 0;\n}',
            out: "Hello from C\nXP: 40",
          },
          quiz: [
            {
              q: "Which header do you include to use printf?",
              options: ["<stdio.h>", "<printf.h>", "<string.h>", "<iostream>"],
              answer: 0,
              why: "stdio.h declares the standard input/output functions, including printf.",
            },
            {
              q: "What does main returning 0 tell the system?",
              options: ["The program finished with no error", "The program printed nothing", "The program will restart", "The program is a function"],
              answer: 0,
              why: "A zero exit status means success; anything else signals a problem.",
            },
            {
              q: "Which placeholder prints a whole number?",
              options: ["%d", "%s", "%f", "%c"],
              answer: 0,
              why: "%d is for decimal integers; %s text, %f floats, %c single characters.",
            },
          ],
          task: {
            prompt: "Print your ninja name on one line and your XP on the next, using %d.",
            starter: '#include <stdio.h>\n\nint main(void) {\n    int xp = 0;\n    // print name and XP here\n    return 0;\n}',
            hint: "Two printf calls, each ending with \\n; pass xp as the second argument.",
            solution: '#include <stdio.h>\n\nint main(void) {\n    int xp = 40;\n    printf("Kaido\\n");\n    printf("XP: %d\\n", xp);\n    return 0;\n}',
          },
        },
        {
          id: "c-1-2",
          unit: "First steps",
          title: "Types, scanf and the & sign",
          minutes: 12,
          xp: 50,
          blurb: "Declare variables with a type, and read a number from the keyboard with scanf.",
          teach: [
            {
              heading: "Every variable has one type",
              body: "int xp; reserves space for a whole number, float for decimals, char for a single character, double for precise decimals. Declaring a variable reserves exactly the bytes that type needs.",
            },
            {
              heading: "scanf wants an address",
              body: 'scanf("%d", &xp) reads text and writes the number into xp. The & means 'the address of' — without it scanf writes to a random place and crashes.',
            },
            {
              heading: "Initialise, always",
              body: "An uninitialised variable holds leftover junk from memory. Write int xp = 0; so behaviour is predictable, and keep declarations near first use.",
            },
          ],
          sample: {
            code: '#include <stdio.h>\n\nint main(void) {\n    int xp = 0;\n    float rate = 1.5f;\n    printf("Enter XP: ");\n    scanf("%d", &xp);\n    printf("Bonus: %d\\n", (int)(xp * rate));\n    return 0;\n}',
            out: "Enter XP: 40\nBonus: 60",
          },
          quiz: [
            {
              q: "Why does scanf need &xp?",
              options: [
                "It needs the memory address to write into",
                "Because xp is a string",
                "To print the value",
                "It is optional in modern C",
              ],
              answer: 0,
              why: "scanf writes the parsed value at the address you hand it; & gives that address.",
            },
            {
              q: "Which type stores a single letter?",
              options: ["char", "int", "float", "string"],
              answer: 0,
              why: "char holds one character; C has no built-in string type.",
            },
            {
              q: "What is wrong with: int xp; printf(\"%d\", xp);",
              options: ["xp was never given a value", "printf needs %s", "int cannot be printed", "The quotes are wrong"],
              answer: 0,
              why: "Uninitialised memory prints junk — always set a starting value.",
            },
          ],
          task: {
            prompt: "Read two whole numbers and print their sum with %d.",
            starter: '#include <stdio.h>\n\nint main(void) {\n    int a = 0, b = 0;\n    return 0;\n}',
            hint: "Two scanf calls with \"%d\" and &, then one printf with a + b.",
            solution: '#include <stdio.h>\n\nint main(void) {\n    int a = 0, b = 0;\n    scanf("%d %d", &a, &b);\n    printf("Sum: %d\\n", a + b);\n    return 0;\n}',
          },
        },
        {
          id: "c-1-3",
          unit: "Control",
          title: "Decisions: if, else and switch",
          minutes: 13,
          xp: 60,
          blurb: "Branch on a condition, compare strings the C way, and pick between many values.",
          teach: [
            {
              heading: "Any non-zero is true",
              body: "if (xp >= 80) needs no colon and no indentation rules — braces mark the block. C treats 0 as false and every other number as true, so if (n % 2) means 'n is odd'.",
            },
            {
              heading: "strcmp, not ==",
              body: "Comparing two char arrays with == compares addresses, not letters. Use strcmp(a, b) == 0 from <string.h> to ask whether the text matches.",
            },
            {
              heading: "switch for fixed choices",
              body: "switch (level) { case 1: ...; break; } jumps to the matching case. Forget break and execution falls through into the next case — a classic bug.",
            },
          ],
          sample: {
            code: '#include <stdio.h>\n\nint main(void) {\n    int score = 86;\n    if (score >= 80) {\n        printf("Passed\\n");\n    } else {\n        printf("Retry\\n");\n    }\n    return 0;\n}',
            out: "Passed",
          },
          quiz: [
            {
              q: "How do you compare two C strings for equality?",
              options: ["strcmp(a, b) == 0", "a == b", "a.equals(b)", "str == b"],
              answer: 0,
              why: "== on arrays compares pointers; strcmp returns 0 only when the text matches.",
            },
            {
              q: "What happens if you forget break in a switch case?",
              options: [
                "Execution continues into the next case",
                "The compiler errors",
                "The switch restarts",
                "Nothing, break is optional in effect",
              ],
              answer: 0,
              why: "Cases fall through unless break stops them — a famous C footgun.",
            },
            {
              q: "In C, if (n % 2) runs when...",
              options: ["n is odd", "n is even", "n is zero", "never"],
              answer: 0,
              why: "Odd n gives remainder 1, and 1 counts as true.",
            },
          ],
          task: {
            prompt: "Read a score and print Passed at 80 or more, Retry at 50-79, otherwise Tutor.",
            starter: '#include <stdio.h>\n\nint main(void) {\n    int score = 0;\n    scanf("%d", &score);\n    return 0;\n}',
            hint: "if / else if / else with braces; compare with >= and >.",
            solution: '#include <stdio.h>\n\nint main(void) {\n    int score = 0;\n    scanf("%d", &score);\n    if (score >= 80) printf("Passed\\n");\n    else if (score >= 50) printf("Retry\\n");\n    else printf("Tutor\\n");\n    return 0;\n}',
          },
        },
        {
          id: "c-1-4",
          unit: "Control",
          title: "Loops and arrays",
          minutes: 15,
          xp: 70,
          blurb: "Repeat work with for and while, and keep a row of numbers in an array.",
          teach: [
            {
              heading: "The three parts of for",
              body: "for (int i = 0; i < n; i++) sets a counter, tests it before each pass, then steps it. The body runs only while the test is true, so the loop stops on its own.",
            },
            {
              heading: "while and do-while",
              body: "while (condition) checks before each pass; do { } while (condition) runs once first — perfect for 'ask until the answer is valid'.",
            },
            {
              heading: "Arrays are numbered boxes",
              body: "int xp[5] reserves five neighbours and the first is xp[0]. C never checks the index for you: writing xp[5] walks off the end and corrupts something else.",
            },
          ],
          sample: {
            code: '#include <stdio.h>\n\nint main(void) {\n    int xp[4] = {10, 20, 30, 40};\n    int total = 0;\n    for (int i = 0; i < 4; i++) {\n        total += xp[i];\n    }\n    printf("Total: %d\\n", total);\n    return 0;\n}',
            out: "Total: 100",
          },
          quiz: [
            {
              q: "What is the first index of int xp[5]?",
              options: ["xp[0]", "xp[1]", "xp[-1]", "xp[5]"],
              answer: 0,
              why: "C arrays are zero-based, so valid indexes are 0 through 4.",
            },
            {
              q: "Which loop always runs its body at least once?",
              options: ["do { } while (c);", "while (c) { }", "for (;;) { }", "if (c) { }"],
              answer: 0,
              why: "do-while tests the condition after the first pass.",
            },
            {
              q: "How many times does for (int i = 0; i < 4; i++) run?",
              options: ["4", "3", "5", "Forever"],
              answer: 0,
              why: "i takes 0, 1, 2, 3 — four passes, stopping when i reaches 4.",
            },
          ],
          task: {
            prompt: "Fill an array with the first five multiples of 3 and print their total.",
            starter: '#include <stdio.h>\n\nint main(void) {\n    int total = 0;\n    return 0;\n}',
            hint: "Loop i from 0 to 4, store 3 * (i + 1), and add each value to total.",
            solution: '#include <stdio.h>\n\nint main(void) {\n    int values[5];\n    int total = 0;\n    for (int i = 0; i < 5; i++) {\n        values[i] = 3 * (i + 1);\n        total += values[i];\n    }\n    printf("Total: %d\\n", total);\n    return 0;\n}',
          },
        },
      ],
      exam: {
        title: "Beginner final exam",
        minutes: 20,
        xp: 250,
        questions: [
          {
            q: "Which function does the operating system call first?",
            options: ["main", "printf", "start", "init"],
            answer: 0,
            why: "C programs begin executing in main.",
          },
          {
            q: "&xp means...",
            options: ["the address of xp", "the value of xp", "xp doubled", "xp is a pointer"],
            answer: 0,
            why: "& is the address-of operator; it yields where xp lives in memory.",
          },
          {
            q: "Valid indexes of int a[3] are...",
            options: ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3", "-1 to 2"],
            answer: 0,
            why: "Size 3 gives slots 0 through 2.",
          },
          {
            q: "Which prints a single character?",
            options: ["%c", "%d", "%s", "%f"],
            answer: 0,
            why: "%c is the char placeholder.",
          },
          {
            q: "Without break, a switch case...",
            options: ["falls into the next case", "exits the switch", "loops forever", "fails to compile"],
            answer: 0,
            why: "Execution continues into following cases.",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Intermediate",
      tagline: "Pointers, strings, structs and files.",
      free: false,
      lessons: [
        paid("c-2-1", "Memory", "Pointers and addresses", "Store where, not what — and pass by reference."),
        paid("c-2-2", "Memory", "malloc, free and leaks", "Ask the heap for space and give it back."),
        paid("c-2-3", "Text", "char arrays and string.h", "Build, copy and compare text safely."),
        paid("c-2-4", "Data", "struct and typedef", "Group fields into your own types."),
        paid("c-2-5", "Files", "fopen, fread, fclose", "Read and write real files."),
        paid("c-2-6", "Structure", "Multi-file programs", "Split a project across .c and .h files."),
      ],
      exam: { title: "Intermediate final exam", minutes: 30, xp: 400, questions: PLACEHOLDER_QUIZ },
    },
    {
      id: 3,
      name: "Advanced",
      tagline: "Data structures, bit tricks, systems calls.",
      free: false,
      lessons: [
        paid("c-3-1", "Structures", "Linked lists and queues", "Grow a chain of nodes at runtime."),
        paid("c-3-2", "Structures", "Hash tables", "Bucket, collide, and resize."),
        paid("c-3-3", "Bits", "Bitwise operations and masks", "Set, clear and test single bits."),
        paid("c-3-4", "Systems", "File descriptors and processes", "Talk to the kernel directly."),
        paid("c-3-5", "Safety", "Make, valgrind, sanitizers", "Catch the bug before the user does."),
      ],
      exam: { title: "Advanced final exam", minutes: 45, xp: 600, questions: PLACEHOLDER_QUIZ },
    },
    {
      id: 4,
      name: "Expert",
      tagline: "Concurrency, performance, a real system.",
      free: false,
      lessons: [
        paid("c-4-1", "Concurrency", "Threads and mutexes", "Share state without corrupting it."),
        paid("c-4-2", "Network", "Sockets", "A server that serves many clients."),
        paid("c-4-3", "Speed", "Cache-aware design and profiling", "Make the CPU's job easy."),
        paid("c-4-4", "Capstone", "Build a system from scratch", "Ship and defend your own project."),
      ],
      exam: { title: "Expert final exam + project defence", minutes: 60, xp: 900, questions: PLACEHOLDER_QUIZ },
    },
  ],
};

const cpp: Language = {
  id: "cpp",
  name: "C++",
  short: "++",
  blurb: "C's power with objects, containers and a huge standard library.",
  token: "--lang-cpp",
  levels: [
    {
      id: 1,
      name: "Beginner",
      tagline: "Streams, vectors and your first objects.",
      free: true,
      lessons: [
        {
          id: "cpp-1-1",
          unit: "First steps",
          title: "Hello, streams",
          minutes: 10,
          xp: 40,
          blurb: "Print with std::cout, read with std::cin, and see why C++ prefers streams to printf.",
          teach: [
            {
              heading: "cout and <<",
              body: 'std::cout << "Hi" << std::endl sends text to the screen. << keeps chaining, so numbers and text mix in one statement with no format codes to remember.',
            },
            {
              heading: "std:: and using",
              body: "Everything in the library lives in the namespace std. Write std:: each time, or add using namespace std; in a small program — the second is fine to learn with, bad practice in real headers.",
            },
            {
              heading: "cin wants the variable",
              body: "std::cin >> xp reads a value straight into an existing variable — no & needed, because >> already writes into it.",
            },
          ],
          sample: {
            code: '#include <iostream>\n\nint main() {\n    int xp = 40;\n    std::cout << "Hello, C++" << std::endl;\n    std::cout << "XP: " << xp << std::endl;\n    return 0;\n}',
            out: "Hello, C++\nXP: 40",
          },
          quiz: [
            {
              q: "Which header gives you std::cout?",
              options: ["<iostream>", "<stdio.h>", "<string>", "<print>"],
              answer: 0,
              why: "iostream declares the stream objects cout and cin.",
            },
            {
              q: "std::cin >> xp is safe because...",
              options: [
                ">> writes directly into xp",
                "cin returns a copy",
                "xp is printed first",
                "it needs &xp anyway",
              ],
              answer: 0,
              why: "The extraction operator stores the parsed value into the variable you give it.",
            },
            {
              q: "std::endl does what a plain \\n does plus...",
              options: ["flushing the output buffer", "printing a number", "starting a new file", "ending main"],
              answer: 0,
              why: "endl moves to a new line and flushes, so the text appears immediately.",
            },
          ],
          task: {
            prompt: "Print your ninja name and XP on separate lines with two cout statements.",
            starter: "#include <iostream>\n\nint main() {\n    int xp = 0;\n    return 0;\n}",
            hint: "Chain text and values with << and finish each line with std::endl.",
            solution: '#include <iostream>\n\nint main() {\n    int xp = 40;\n    std::cout << "Kaido" << std::endl;\n    std::cout << "XP: " << xp << std::endl;\n    return 0;\n}',
          },
        },
        {
          id: "cpp-1-2",
          unit: "First steps",
          title: "Types, auto and const",
          minutes: 12,
          xp: 50,
          blurb: "Pick the right type, let auto infer it, and mark values that must not change.",
          teach: [
            {
              heading: "auto means 'work it out'",
              body: "auto xp = 40; is an int; auto rate = 1.5; is a double. The compiler decides the type from the value — the variable is still fixed after that, not dynamically typed.",
            },
            {
              heading: "const locks the box",
              body: "const int MAX_XP = 100; cannot be reassigned. Writing const where a value should not change turns a mistake into a compile error.",
            },
            {
              heading: "Narrowing is refused",
              body: "int xp = 1.5; is a warning, not a silent truncation, and brace initialisation like int xp{1.5}; is rejected outright. C++ checks types harder than C does.",
            },
          ],
          sample: {
            code: "#include <iostream>\n\nint main() {\n    const int GOAL = 100;\n    auto xp = 40;\n    xp += 20;\n    std::cout << xp << \"/\" << GOAL << std::endl;\n    return 0;\n}",
            out: "60/100",
          },
          quiz: [
            {
              q: "auto xp = 3.7 makes xp...",
              options: ["a double", "an int", "a string", "unknown until runtime"],
              answer: 0,
              why: "The literal 3.7 is a double, so auto picks double.",
            },
            {
              q: "Writing to a const variable causes...",
              options: ["a compile error", "a runtime crash", "silence", "it works but warns only"],
              answer: 0,
              why: "const is checked by the compiler, so the mistake never becomes a program.",
            },
            {
              q: "Which is the safest way to say 'this never changes'?",
              options: ["const", "static", "auto", "private"],
              answer: 0,
              why: "const expresses immutability; the others mean something else entirely.",
            },
          ],
          task: {
            prompt: "Declare a const daily goal, an auto current XP, add 25, and print both.",
            starter: "#include <iostream>\n\nint main() {\n    return 0;\n}",
            hint: "const int GOAL = ...; auto xp = ...; xp += 25; then one cout line.",
            solution: "#include <iostream>\n\nint main() {\n    const int GOAL = 100;\n    auto xp = 40;\n    xp += 25;\n    std::cout << xp << \" of \" << GOAL << std::endl;\n    return 0;\n}",
          },
        },
        {
          id: "cpp-1-3",
          unit: "Control",
          title: "Decisions and functions",
          minutes: 14,
          xp: 60,
          blurb: "Write a function with parameters and a return value, and branch with if and switch.",
          teach: [
            {
              heading: "Functions need a signature",
              body: "int bonus(int xp) { return xp / 2; } names the return type, the parameters, and the body. A function with no result uses void.",
            },
            {
              heading: "Pass by value, pass by reference",
              body: "Default copying means changes inside the function vanish. Take const std::string& to hand over a big value without copying it, and std::string& (no const) when you intend to change it.",
            },
            {
              heading: "if, else if, switch",
              body: "Same rules as C, plus switch can now be written with ranges in newer standards. Keep each branch short and return early.",
            },
          ],
          sample: {
            code: "#include <iostream>\n\nint bonus(int xp) {\n    return xp / 2;\n}\n\nint main() {\n    int xp = 90;\n    if (xp >= 80) {\n        std::cout << \"Passed, bonus \" << bonus(xp) << std::endl;\n    }\n    return 0;\n}",
            out: "Passed, bonus 45",
          },
          quiz: [
            {
              q: "Which signature returns nothing?",
              options: ["void log(int n)", "int log(int n)", "auto log(int n)", "return log(int n)"],
              answer: 0,
              why: "void says the function hands no value back.",
            },
            {
              q: "Why take const std::string&?",
              options: [
                "To avoid copying a big value while keeping it safe",
                "Because strings cannot be copied",
                "To make the function faster to compile",
                "It is required by the compiler",
              ],
              answer: 0,
              why: "A const reference passes the original without a copy and forbids modifying it.",
            },
            {
              q: "A change made to a by-value parameter...",
              options: ["disappears when the function ends", "changes the caller's variable", "is a compile error", "is saved globally"],
              answer: 0,
              why: "By value means a copy; the original is untouched.",
            },
          ],
          task: {
            prompt: "Write int rank(int score) returning 3 for 80+, 2 for 50-79 and 1 below, then print the result.",
            starter: "#include <iostream>\n\nint rank(int score) {\n    return 0;\n}\n\nint main() {\n    return 0;\n}",
            hint: "Use if / else if / else inside rank, then call it from main.",
            solution: "#include <iostream>\n\nint rank(int score) {\n    if (score >= 80) return 3;\n    if (score >= 50) return 2;\n    return 1;\n}\n\nint main() {\n    std::cout << \"Rank \" << rank(86) << std::endl;\n    return 0;\n}",
          },
        },
        {
          id: "cpp-1-4",
          unit: "Control",
          title: "std::vector and loops",
          minutes: 15,
          xp: 70,
          blurb: "Use a vector instead of a raw array, and loop it three useful ways.",
          teach: [
            {
              heading: "vector grows for you",
              body: "std::vector<int> xp; then xp.push_back(10) adds an item and resizes automatically. xp.size() is the count and xp[i] is an element — no fixed capacity to guess.",
            },
            {
              heading: "Three loops",
              body: "for (auto v : xp) reads each value, for (auto& v : xp) lets you change it in place, and the classic for (size_t i = 0; i < xp.size(); ++i) keeps the index.",
            },
            {
              heading: "Bounds",
              body: "xp[i] does no checking; xp.at(i) throws std::out_of_range instead of corrupting memory. Prefer range-for whenever you do not need the index.",
            },
          ],
          sample: {
            code: "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> xp = {10, 20, 30};\n    xp.push_back(40);\n    int total = 0;\n    for (auto v : xp) total += v;\n    std::cout << \"Total: \" << total << std::endl;\n    return 0;\n}",
            out: "Total: 100",
          },
          quiz: [
            {
              q: "Adding an item to a vector uses...",
              options: ["push_back", "append", "add", "insert_last"],
              answer: 0,
              why: "push_back appends and grows the storage automatically.",
            },
            {
              q: "for (auto& v : xp) differs from for (auto v : xp) because...",
              options: [
                "it lets you modify the real elements",
                "it is faster to compile",
                "it skips the first item",
                "it needs an index",
              ],
              answer: 0,
              why: "The & gives a reference to each element instead of a copy.",
            },
            {
              q: "xp.at(99) on a small vector...",
              options: ["throws out_of_range", "returns 0", "crashes silently", "grows the vector"],
              answer: 0,
              why: "at() checks the index and throws; xp[99] would not check.",
            },
          ],
          task: {
            prompt: "Push the first five multiples of 2 into a vector and print the total.",
            starter: "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> values;\n    return 0;\n}",
            hint: "Loop i from 1 to 5, push_back(2 * i), then sum with a range-for.",
            solution: "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> values;\n    for (int i = 1; i <= 5; ++i) values.push_back(2 * i);\n    int total = 0;\n    for (auto v : values) total += v;\n    std::cout << \"Total: \" << total << std::endl;\n    return 0;\n}",
          },
        },
      ],
      exam: {
        title: "Beginner final exam",
        minutes: 20,
        xp: 250,
        questions: [
          {
            q: "std::cout uses which operator?",
            options: ["<<", ">>", "++", "::"],
            answer: 0,
            why: "<< sends values into the output stream.",
          },
          {
            q: "auto xp = 5; gives xp the type...",
            options: ["int", "auto", "double", "variant"],
            answer: 0,
            why: "auto is replaced by the deduced type — here int.",
          },
          {
            q: "Which grows with new items?",
            options: ["std::vector", "int a[5]", "char buf[10]", "const int n"],
            answer: 0,
            why: "A raw array has fixed size; vector reallocates as needed.",
          },
          {
            q: "A function that must not change its string parameter should take...",
            options: ["const std::string&", "std::string", "char*", "std::string&"],
            answer: 0,
            why: "const reference avoids the copy and forbids modification.",
          },
          {
            q: "xp.at(i) versus xp[i]: at()...",
            options: ["checks the index", "is always faster", "copies the value", "resizes the vector"],
            answer: 0,
            why: "at() validates the index and throws when it is out of range.",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Intermediate",
      tagline: "Classes, containers, RAII and smart pointers.",
      free: false,
      lessons: [
        paid("cpp-2-1", "Objects", "Classes, constructors, access", "Wrap data and behaviour together."),
        paid("cpp-2-2", "Objects", "RAII and destructors", "Own resources so they are always released."),
        paid("cpp-2-3", "Containers", "map, set and iterators", "Pick the right container for the job."),
        paid("cpp-2-4", "Memory", "unique_ptr and shared_ptr", "No more manual delete."),
        paid("cpp-2-5", "Reuse", "Operator overloading", "Make your types behave like built-ins."),
        paid("cpp-2-6", "Errors", "Exceptions and RAII", "Fail cleanly without leaks."),
      ],
      exam: { title: "Intermediate final exam", minutes: 30, xp: 400, questions: PLACEHOLDER_QUIZ },
    },
    {
      id: 3,
      name: "Advanced",
      tagline: "Templates, move semantics, concurrency.",
      free: false,
      lessons: [
        paid("cpp-3-1", "Generic", "Function and class templates", "Write the algorithm once for every type."),
        paid("cpp-3-2", "Generic", "Concepts and constraints", "Say exactly what a template accepts."),
        paid("cpp-3-3", "Speed", "Move semantics and perfect forwarding", "Steal buffers instead of copying them."),
        paid("cpp-3-4", "Algorithms", "STL algorithms and lambdas", "Compose behaviour instead of hand-writing loops."),
        paid("cpp-3-5", "Parallel", "std::thread, async, atomics", "Use every core without races."),
      ],
      exam: { title: "Advanced final exam", minutes: 45, xp: 600, questions: PLACEHOLDER_QUIZ },
    },
    {
      id: 4,
      name: "Expert",
      tagline: "Architecture, performance, a shipped library.",
      free: false,
      lessons: [
        paid("cpp-4-1", "Design", "SOLID and interfaces in C++", "Structure that survives change."),
        paid("cpp-4-2", "Build", "CMake, packages, sanitizers", "A build other people can trust."),
        paid("cpp-4-3", "Speed", "Cache, SIMD, profiling", "Squeeze the last 10%."),
        paid("cpp-4-4", "Capstone", "Ship a library", "Publish, document and defend it."),
      ],
      exam: { title: "Expert final exam + project defence", minutes: 60, xp: 900, questions: PLACEHOLDER_QUIZ },
    },
  ],
};

const html: Language = {
  id: "html",
  name: "HTML",
  short: "H5",
  blurb: "Build real pages from day one and see the result instantly.",
  token: "--lang-html",
  levels: [
    {
      id: 1,
      name: "Beginner",
      tagline: "Structure a page the web understands.",
      free: true,
      lessons: [
        {
          id: "html-1-1",
          unit: "First steps",
          title: "The page skeleton",
          minutes: 8,
          xp: 40,
          blurb: "Write the five lines every document needs and understand what the browser does with them.",
          teach: [
            {
              heading: "Tags wrap content",
              body: "A tag like <p> opens, content follows, </p> closes. The browser turns that tree into the page you see — no braces, no semicolons, just nesting.",
            },
            {
              heading: "The skeleton",
              body: "<!DOCTYPE html> tells the browser to use modern rules. <html> is the root, <head> holds machine info (title, links, meta), and <body> holds everything visible.",
            },
            {
              heading: "Attributes add detail",
              body: 'Attributes live in the opening tag as name="value": <html lang="en">, <meta charset="utf-8">. They configure the element instead of adding new ones.',
            },
          ],
          sample: {
            code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>My dojo</title>\n  </head>\n  <body>\n    <h1>Welcome to the dojo</h1>\n  </body>\n</html>',
          },
          quiz: [
            {
              q: "Where does the page title (the tab text) belong?",
              options: ["in <head>", "in <body>", "in <footer>", "outside <html>"],
              answer: 0,
              why: "The <title> element lives inside <head> with the other document settings.",
            },
            {
              q: "<!DOCTYPE html> tells the browser to...",
              options: [
                "use modern standards mode",
                "run JavaScript",
                "download a font",
                "open a new tab",
              ],
              answer: 0,
              why: "It switches the renderer to standards mode instead of legacy quirks mode.",
            },
            {
              q: "lang=\"en\" is an example of...",
              options: ["an attribute", "an element", "a comment", "a tag name"],
              answer: 0,
              why: "Name/value pairs inside an opening tag are attributes.",
            },
          ],
          task: {
            prompt: "Write a full skeleton with a title of your choice and one <h1> inside the body.",
            starter: "<!DOCTYPE html>\n<html>\n</html>",
            hint: "head needs meta charset and title; body needs the h1.",
            solution: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>My dojo</title>\n  </head>\n  <body>\n    <h1>Welcome to my dojo</h1>\n  </body>\n</html>',
          },
        },
        {
          id: "html-1-2",
          unit: "First steps",
          title: "Text and structure",
          minutes: 10,
          xp: 50,
          blurb: "Headings, paragraphs, lists and emphasis — and why the browser cares which one you pick.",
          teach: [
            {
              heading: "Headings are an outline",
              body: "h1 to h6 mark section levels, not sizes. One h1 per page, then h2 for major sections, h3 inside those. Screen readers and search engines read that outline as the page's shape.",
            },
            {
              heading: "Lists",
              body: "<ul> for a bag of items, <ol> when order matters. Only <li> may be a direct child — no bare text inside the list.",
            },
            {
              heading: "Meaning, not looks",
              body: "<strong> means important (browsers bold it, readers announce it); <em> means stressed. <b> and <i> only change appearance, so reach for the meaningful pair first.",
            },
          ],
          sample: {
            code: "<h1>ByteDojo</h1>\n<h2>Today's plan</h2>\n<ul>\n  <li><strong>Lesson</strong>: loops</li>\n  <li>Quiz</li>\n  <li>Battle</li>\n</ul>",
          },
          quiz: [
            {
              q: "How many <h1> elements should a page normally have?",
              options: ["One", "As many as needed", "Exactly three", "None"],
              answer: 0,
              why: "One h1 names the page; the rest nest below it.",
            },
            {
              q: "Which list shows numbers?",
              options: ["<ol>", "<ul>", "<dl>", "<li>"],
              answer: 0,
              why: "ol is ordered, so the browser numbers the items.",
            },
            {
              q: "<strong> differs from <b> because it...",
              options: [
                "carries meaning for readers and crawlers",
                "is always bigger",
                "cannot be styled",
                "is deprecated",
              ],
              answer: 0,
              why: "strong marks importance; b is a presentational shortcut.",
            },
          ],
          task: {
            prompt: "Mark up a plan: an h1, an h2, and an ordered list of three study steps.",
            starter: "<h1></h1>\n<h2></h2>\n<ol>\n</ol>",
            hint: "Each step goes in its own <li> inside the <ol>.",
            solution: "<h1>ByteDojo</h1>\n<h2>Today's plan</h2>\n<ol>\n  <li>Read the lesson</li>\n  <li>Pass the quiz</li>\n  <li>Finish the challenge</li>\n</ol>",
          },
        },
        {
          id: "html-1-3",
          unit: "Connections",
          title: "Links, images and paths",
          minutes: 12,
          xp: 60,
          blurb: "Connect pages and place pictures, with the accessibility details people skip.",
          teach: [
            {
              heading: "<a href>",
              body: "The href names a page: a full URL, a relative path like lessons/loops.html, or #top to jump within the page. Meaningful link text beats 'click here' for everyone using assistive tech.",
            },
            {
              heading: "<img src alt>",
              body: "img is self-closing: src points at the file, alt describes it. alt is read aloud, shown when the file fails, and used by search — never leave it out.",
            },
            {
              heading: "Relative vs absolute",
              body: "Absolute paths start with https://, relative ones start at the current folder. Use relative inside your own site so it keeps working if the domain changes.",
            },
          ],
          sample: {
            code: '<a href="lessons/loops.html">Go to loops</a>\n<img src="img/mascot.jpg" alt="ByteDojo robot ninja" width="120" />',
          },
          quiz: [
            {
              q: "alt is required because it...",
              options: [
                "describes the image when it cannot be seen",
                "sets the image size",
                "links the image",
                "caches the file",
              ],
              answer: 0,
              why: "alt text is read by screen readers and shown if the file fails to load.",
            },
            {
              q: "Which link goes to another site?",
              options: [
                'href="https://example.com"',
                'href="example.html"',
                'href="#top"',
                'href="./docs"',
              ],
              answer: 0,
              why: "A full URL with a scheme points off-site; the others are local or in-page.",
            },
            {
              q: "Best link text is...",
              options: [
                "a short phrase describing the destination",
                "\"click here\"",
                "the raw URL",
                "an icon only",
              ],
              answer: 0,
              why: "Descriptive text makes sense out of context, which assistive tech relies on.",
            },
          ],
          task: {
            prompt: "Add a link to your profile page and a mascot image with proper alt text.",
            starter: '<a href=""></a>\n<img src="" alt="" />',
            hint: "href takes a relative path; alt takes a real description.",
            solution: '<a href="profile.html">Open my profile</a>\n<img src="img/mascot.jpg" alt="ByteDojo robot ninja with a glowing blade" width="120" />',
          },
        },
        {
          id: "html-1-4",
          unit: "Connections",
          title: "Forms that actually send",
          minutes: 15,
          xp: 70,
          blurb: "Collect input with label, input, select and button — and know what each type does.",
          teach: [
            {
              heading: "label and input pair up",
              body: 'Every control needs a label. Give the input an id and point the label at it with for="email" — clicking the label then focuses the box, and screen readers announce it.',
            },
            {
              heading: "Types do the work",
              body: "type=\"email\" and type=\"number\" bring the right keyboard and a built-in sanity check; type=\"password\" hides text; type=\"checkbox\" and \"radio\" collect choices.",
            },
            {
              heading: "Sending it",
              body: 'Wrap controls in <form action="/signup" method="post">. name="email" is the key the server reads; a <button type="submit"> sends the form.',
            },
          ],
          sample: {
            code: '<form action="/signup" method="post">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required />\n  <button type="submit">Join</button>\n</form>',
          },
          quiz: [
            {
              q: "Which attribute must match a label's for value?",
              options: ["id", "name", "class", "type"],
              answer: 0,
              why: "for points at the control's id.",
            },
            {
              q: "The server reads the value under the key given by...",
              options: ["name", "id", "action", "placeholder"],
              answer: 0,
              why: "name becomes the field key in the submitted data.",
            },
            {
              q: "Which input type checks an address for you?",
              options: ["email", "text", "url", "search"],
              answer: 0,
              why: "type=\"email\" asks for @ and a dot before submitting.",
            },
          ],
          task: {
            prompt: "Build a signup form with a labelled email field, a password field, and a submit button.",
            starter: "<form>\n</form>",
            hint: "Two labels with for, two inputs with matching ids, and a submit button.",
            solution: '<form action="/signup" method="post">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required />\n  <label for="pw">Password</label>\n  <input id="pw" name="pw" type="password" required />\n  <button type="submit">Join</button>\n</form>',
          },
        },
      ],
      exam: {
        title: "Beginner final exam",
        minutes: 20,
        xp: 250,
        questions: [
          {
            q: "Visible content belongs in...",
            options: ["<body>", "<head>", "<title>", "<meta>"],
            answer: 0,
            why: "The body holds everything rendered on screen.",
          },
          {
            q: "Which element is self-closing?",
            options: ["<img>", "<p>", "<div>", "<a>"],
            answer: 0,
            why: "img has no content, so it closes itself.",
          },
          {
            q: "for=\"email\" on a label matches the input's...",
            options: ["id", "name", "type", "value"],
            answer: 0,
            why: "label for references the control's id.",
          },
          {
            q: "Which list is for ranked steps?",
            options: ["<ol>", "<ul>", "<li>", "<dl>"],
            answer: 0,
            why: "Ordered lists number items, showing rank.",
          },
          {
            q: "href=\"#top\" does what?",
            options: [
              "Jumps to an anchor in the same page",
              "Opens a new site",
              "Downloads a file",
              "Reloads the page",
            ],
            answer: 0,
            why: "A bare fragment link scrolls to that id on the current page.",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Intermediate",
      tagline: "Semantic layout, modern CSS, responsive pages.",
      free: false,
      lessons: [
        paid("html-2-1", "Layout", "Flexbox", "Line things up and distribute space."),
        paid("html-2-2", "Layout", "CSS Grid", "Two-dimensional pages without hacks."),
        paid("html-2-3", "Responsive", "Media queries and clamp", "One page, every screen."),
        paid("html-2-4", "Semantics", "Landmarks and a11y", "nav, main, aside and ARIA basics."),
        paid("html-2-5", "CSS", "Custom properties and theming", "Design tokens in plain CSS."),
        paid("html-2-6", "Forms", "Validation and accessibility", "Helpful errors, no dead ends."),
      ],
      exam: { title: "Intermediate final exam", minutes: 30, xp: 400, questions: PLACEHOLDER_QUIZ },
    },
    {
      id: 3,
      name: "Advanced",
      tagline: "Animation, components, performance budgets.",
      free: false,
      lessons: [
        paid("html-3-1", "Motion", "Transitions and keyframes", "Interfaces that explain themselves."),
        paid("html-3-2", "Structure", "Web components and templates", "Reusable, framework-free parts."),
        paid("html-3-3", "Data", "Fetch, storage and history", "Pages that remember you."),
        paid("html-3-4", "Speed", "Core Web Vitals and images", "Fast by default."),
        paid("html-3-5", "Craft", "Design systems in HTML/CSS", "Consistency at scale."),
      ],
      exam: { title: "Advanced final exam", minutes: 45, xp: 600, questions: PLACEHOLDER_QUIZ },
    },
    {
      id: 4,
      name: "Expert",
      tagline: "Ship a production front end.",
      free: false,
      lessons: [
        paid("html-4-1", "Architecture", "Islands, streaming, SSR", "Structure that survives growth."),
        paid("html-4-2", "Quality", "Testing and auditing", "Lighthouse, Playwright, axe."),
        paid("html-4-3", "Capstone", "Portfolio site", "Design, build and defend it."),
      ],
      exam: { title: "Expert final exam + project defence", minutes: 60, xp: 900, questions: PLACEHOLDER_QUIZ },
    },
  ],
};

export const LANGUAGES: Language[] = [python, cLang, cpp, html];

export function getLanguage(id: string | undefined): Language | undefined {
  return LANGUAGES.find((l) => l.id === id);
}

export function allLessons(lang: Language): Lesson[] {
  return lang.levels.flatMap((level) => level.lessons);
}

export function findLesson(lang: Language, lessonId: string): Lesson | undefined {
  return allLessons(lang).find((l) => l.id === lessonId);
}

/** The lesson that comes next on the path, or undefined at the end. */
export function nextLesson(lang: Language, lessonId: string): Lesson | undefined {
  const flat = allLessons(lang);
  const i = flat.findIndex((l) => l.id === lessonId);
  return i >= 0 ? flat[i + 1] : undefined;
}

export function levelOfLesson(lang: Language, lessonId: string): Level | undefined {
  return lang.levels.find((level) => level.lessons.some((l) => l.id === lessonId));
}
