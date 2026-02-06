// utils/skillQuestions.ts
export interface SkillQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'medium' | 'hard' | 'expert';
  domain: string;
  timeRequired: number; // seconds
}

export const DOMAIN_QUESTIONS: Record<string, SkillQuestion[]> = {
  'python': [
    {
      id: 'py1',
      text: 'What will be the output of `print([i for i in range(10) if i % 2 == 0][:3])` after applying `filter(lambda x: x > 2, ...)`?',
      options: [
        '[0, 2, 4]',
        '[4, 6, 8]',
        '[2, 4, 6]',
        'Error: filter cannot be applied to list comprehension'
      ],
      correctAnswer: 1,
      explanation: 'The list comprehension creates [0,2,4,6,8]. Filter removes elements ≤2, leaving [4,6,8]. Slicing [:3] gives [4,6,8].',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 45
    },
    {
      id: 'py2',
      text: 'Which GIL (Global Interpreter Lock) optimization technique allows true parallelism in Python multiprocessing?',
      options: [
        'Using asyncio with async/await',
        'Multiprocessing with separate memory spaces',
        'Threading with concurrent.futures',
        'Using Jython or IronPython'
      ],
      correctAnswer: 1,
      explanation: 'Multiprocessing creates separate Python processes with their own GIL, enabling true parallelism unlike threading.',
      difficulty: 'expert',
      domain: 'python',
      timeRequired: 60
    },
    {
      id: 'py3',
      text: 'What is the time complexity of finding an element in a Python set with 1 million elements?',
      options: [
        'O(1) average, O(n) worst-case',
        'O(log n)',
        'O(n)',
        'O(n log n)'
      ],
      correctAnswer: 0,
      explanation: 'Python sets use hash tables providing O(1) average lookup, but can degrade to O(n) in worst-case collisions.',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 30
    },
    {
      id: 'py4',
      text: 'What does `@lru_cache(maxsize=128)` decorator do when applied to a recursive Fibonacci function?',
      options: [
        'Memoizes results for 128 most recent calls',
        'Caches all results up to Fibonacci(128)',
        'Limits recursion depth to 128',
        'Converts recursion to iteration'
      ],
      correctAnswer: 0,
      explanation: 'LRU cache stores results of recent calls, dramatically improving performance for overlapping subproblems.',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 40
    },
    {
      id: 'py5',
      text: 'What is the output of `print((lambda x: x ** 2)(5) if True else 0)`?',
      options: [
        '25',
        '0',
        'SyntaxError',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'Lambda function squares 5 = 25, ternary always evaluates True branch.',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 25
    },
    {
      id: 'py6',
      text: 'Which metaclass pattern ensures Singleton behavior in Python?',
      options: [
        'Using `__new__` method',
        'Metaclass with `__call__` overriding',
        'Decorator pattern',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'All three patterns can implement Singleton in Python with varying trade-offs.',
      difficulty: 'expert',
      domain: 'python',
      timeRequired: 50
    },
    {
      id: 'py7',
      text: 'What is the purpose of `__slots__` in a Python class?',
      options: [
        'Prevents dynamic attribute creation',
        'Reduces memory usage',
        'Improves attribute access speed',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: '__slots__ optimizes memory by preventing __dict__ creation and speeds up attribute access.',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 35
    },
    {
      id: 'py8',
      text: 'What will `"".join(reversed("Python"))` produce?',
      options: [
        'nohtyP',
        'Python',
        'Pytho',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'reversed returns iterator, join concatenates characters in reverse order.',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 20
    },
    {
      id: 'py9',
      text: 'What is the difference between `is` and `==` for Python integers?',
      options: [
        '`is` checks identity, `==` checks equality',
        'Both are identical for integers',
        '`is` works only for small integers due to interning',
        'Both A and C'
      ],
      correctAnswer: 3,
      explanation: '`is` checks object identity, while `==` checks value equality. Python interns small integers (-5 to 256).',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 40
    },
    {
      id: 'py10',
      text: 'What does Python\'s GIL prevent?',
      options: [
        'Multiple threads executing Python bytecode simultaneously',
        'Multiple processes accessing same memory',
        'Deadlocks in concurrent programs',
        'Memory leaks in long-running processes'
      ],
      correctAnswer: 0,
      explanation: 'GIL allows only one thread to execute Python bytecode at a time, preventing true parallelism.',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 35
    },
    {
      id: 'py11',
      text: 'What is the output of `print([x for x in range(10) if x % 2 == 0 if x % 3 == 0])`?',
      options: [
        '[0, 6]',
        '[0, 2, 4, 6, 8]',
        '[6]',
        '[0]'
      ],
      correctAnswer: 0,
      explanation: 'Numbers divisible by both 2 and 3 (i.e., divisible by 6) within range 0-9.',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 30
    },
    {
      id: 'py12',
      text: 'What does `yield from` do in a generator?',
      options: [
        'Delegates to another generator',
        'Returns control to caller',
        'Raises StopIteration',
        'All of the above'
      ],
      correctAnswer: 0,
      explanation: '`yield from` delegates generation to another iterable/generator.',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 35
    },
    {
      id: 'py13',
      text: 'What is method resolution order (MRO) in Python multiple inheritance?',
      options: [
        'C3 linearization algorithm',
        'Depth-first left-to-right',
        'Breadth-first search',
        'Random order'
      ],
      correctAnswer: 0,
      explanation: 'Python uses C3 linearization for MRO to maintain monotonicity.',
      difficulty: 'expert',
      domain: 'python',
      timeRequired: 50
    },
    {
      id: 'py14',
      text: 'What is the time complexity of sorting a list of n tuples by second element?',
      options: [
        'O(n log n)',
        'O(n²)',
        'O(n)',
        'Depends on tuple size'
      ],
      correctAnswer: 0,
      explanation: 'Python\'s Timsort is O(n log n) regardless of sort key complexity.',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 25
    },
    {
      id: 'py15',
      text: 'What does `@staticmethod` decorator do?',
      options: [
        'Converts method to function that doesn\'t receive self',
        'Makes method private',
        'Allows method overriding',
        'Caches method results'
      ],
      correctAnswer: 0,
      explanation: 'Static methods don\'t receive implicit first argument (self or cls).',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 25
    },
    {
      id: 'py16',
      text: 'What is the purpose of `contextlib.contextmanager`?',
      options: [
        'Creates context managers using generators',
        'Manages database connections',
        'Handles exceptions in contexts',
        'All of the above'
      ],
      correctAnswer: 0,
      explanation: 'Decorator that converts generator function into context manager.',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 40
    },
    {
      id: 'py17',
      text: 'What will `print(bool("False"))` output?',
      options: [
        'True',
        'False',
        'Error',
        'None'
      ],
      correctAnswer: 0,
      explanation: 'Non-empty strings are truthy in Python, regardless of content.',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 20
    },
    {
      id: 'py18',
      text: 'What is duck typing in Python?',
      options: [
        'Focus on object behavior rather than type',
        'Dynamic type checking at runtime',
        'Interface implementation checking',
        'All of the above'
      ],
      correctAnswer: 0,
      explanation: '\'If it walks like a duck and quacks like a duck, it\'s a duck.\'',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 30
    },
    {
      id: 'py19',
      text: 'What does `sys.setrecursionlimit(10000)` do?',
      options: [
        'Sets maximum recursion depth',
        'Limits stack memory usage',
        'Prevents infinite recursion',
        'All of the above'
      ],
      correctAnswer: 0,
      explanation: 'Changes maximum depth of Python interpreter stack.',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 35
    },
    {
      id: 'py20',
      text: 'What is the output of `print([1, 2, 3] * 2)`?',
      options: [
        '[1, 2, 3, 1, 2, 3]',
        '[2, 4, 6]',
        '[[1, 2, 3], [1, 2, 3]]',
        'Error'
      ],
      correctAnswer: 0,
      explanation: 'List multiplication repeats elements, doesn\'t multiply values.',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 20
    },
    {
      id: 'py21',
      text: 'What is the purpose of `__enter__` and `__exit__` methods?',
      options: [
        'Define context manager protocol',
        'Handle resource cleanup',
        'Support `with` statement',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'These methods implement context manager for resource management.',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 35
    },
    {
      id: 'py22',
      text: 'What does `functools.partial` do?',
      options: [
        'Creates new function with some arguments pre-filled',
        'Partially applies function',
        'Curries function arguments',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'partial fixes certain arguments, creating a new function.',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 40
    },
    {
      id: 'py23',
      text: 'What is the difference between `append()` and `extend()` for lists?',
      options: [
        'append adds element, extend adds iterable elements',
        'extend is faster for single elements',
        'append works only with lists',
        'No difference'
      ],
      correctAnswer: 0,
      explanation: 'append adds object as single element, extend adds elements from iterable.',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 25
    },
    {
      id: 'py24',
      text: 'What does `*args` capture in function parameters?',
      options: [
        'Variable number of positional arguments',
        'Keyword arguments',
        'Default arguments',
        'All arguments'
      ],
      correctAnswer: 0,
      explanation: '*args collects extra positional arguments as tuple.',
      difficulty: 'medium',
      domain: 'python',
      timeRequired: 25
    },
    {
      id: 'py25',
      text: 'What is the output of `print(0.1 + 0.2 == 0.3)`?',
      options: [
        'False',
        'True',
        'Error',
        'Depends on Python version'
      ],
      correctAnswer: 0,
      explanation: 'Floating-point precision error: 0.1 + 0.2 = 0.30000000000000004',
      difficulty: 'hard',
      domain: 'python',
      timeRequired: 35
    }
  ],
  
  'web development': [
    {
      id: 'web1',
      text: 'What is the time complexity difference between React.memo() and useMemo()?',
      options: [
        'memo prevents re-renders, useMemo prevents recomputation',
        'Both are identical',
        'useMemo works only with functions',
        'memo caches props, useMemo caches values'
      ],
      correctAnswer: 0,
      explanation: 'React.memo memoizes component rendering, useMemo memoizes computed values.',
      difficulty: 'expert',
      domain: 'web development',
      timeRequired: 50
    },
    {
      id: 'web2',
      text: 'What does Next.js incremental static regeneration (ISR) provide?',
      options: [
        'Dynamic page updates without rebuild',
        'Static pages with revalidation periods',
        'Hybrid static/dynamic rendering',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'ISR allows static pages to be updated periodically without full rebuild.',
      difficulty: 'expert',
      domain: 'web development',
      timeRequired: 55
    },
    // Add 23 more web development questions...
  ],
  
  'data science': [
    {
      id: 'ds1',
      text: 'What is the bias-variance tradeoff in gradient boosting?',
      options: [
        'Increasing trees reduces variance, increases bias',
        'Increasing depth increases variance, reduces bias',
        'Learning rate affects both bias and variance',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'GBM hyperparameters interact complexly with bias-variance tradeoff.',
      difficulty: 'expert',
      domain: 'data science',
      timeRequired: 60
    },
    // Add 24 more data science questions...
  ]
};

export const getDomainQuestions = (domain: string): SkillQuestion[] => {
  const normalizedDomain = domain.toLowerCase();
  if (normalizedDomain.includes('python')) return DOMAIN_QUESTIONS.python;
  if (normalizedDomain.includes('web')) return DOMAIN_QUESTIONS['web development'];
  if (normalizedDomain.includes('data')) return DOMAIN_QUESTIONS['data science'];
  return DOMAIN_QUESTIONS.python; // default
};
