import { Project, Snippet, BlogPost } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI Video Editor',
    description: 'A browser-based video editing tool leveraging WebAssembly and WebGL for real-time effects.',
    tags: ['Next.js', 'Wasm', 'WebGL', 'TensorFlow'],
    link: 'https://example.com/video-editor',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Distributed Task Queue',
    description: 'High-performance distributed task queue written in Rust with Python bindings.',
    tags: ['Rust', 'Python', 'gRPC', 'Redis'],
    link: 'https://example.com/task-queue',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'E-Commerce Analytics',
    description: 'Real-time analytics dashboard for e-commerce stores using MongoDB time-series.',
    tags: ['TypeScript', 'MongoDB', 'D3.js', 'Tailwind'],
    link: 'https://example.com/analytics',
    github: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
  }
];

export const SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'useLocalStorage Hook',
    description: 'A typed React hook to persist state in local storage with error handling.',
    category: 'Hooks',
    language: 'typescript',
    filename: 'hooks/use-local-storage.ts',
    code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}`
  },
  {
    id: '2',
    title: 'useDebounce Hook',
    description: 'Delays updating a value until a specified time has passed. Essential for search inputs to reduce API calls.',
    category: 'Hooks',
    language: 'typescript',
    filename: 'hooks/use-debounce.ts',
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`
  },
  {
     id: '3',
     title: 'API Client Wrapper',
     description: 'A type-safe fetch wrapper with automatic error handling, default headers, and interceptor support.',
     category: 'Network',
     language: 'typescript',
     filename: 'lib/api-client.ts',
     code: `interface RequestConfig extends RequestInit {
  data?: any;
}

export async function apiClient<T>(
  endpoint: string,
  { data, headers: customHeaders, ...customConfig }: RequestConfig = {}
): Promise<T> {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : '',
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(endpoint, config).then(async response => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}`
  },
  {
      id: '4',
      title: 'Python Retry Decorator',
      description: 'A robust Python decorator to retry failing operations (like API calls) with exponential backoff.',
      category: 'Python',
      language: 'python',
      filename: 'utils/retry.py',
      code: `import time
import functools
import logging

def retry(max_retries=3, delay=1, backoff=2, exceptions=(Exception,)):
    """
    Retry a function with exponential backoff.
    
    :param max_retries: Total number of retries allowed.
    :param delay: Initial delay between retries in seconds.
    :param backoff: Multiplier applied to delay between attempts.
    :param exceptions: Tuple of exceptions to catch and retry upon.
    """
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            mtries, mdelay = max_retries, delay
            while mtries > 1:
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    logging.warning(f"Retrying {func.__name__} in {mdelay}s... Error: {e}")
                    time.sleep(mdelay)
                    mtries -= 1
                    mdelay *= backoff
            return func(*args, **kwargs)
        return wrapper
    return decorator`
  },
  {
      id: '5',
      title: 'PostgreSQL Connection Pool',
      description: 'Singleton pattern for managing PostgreSQL connections efficiently in a Node.js serverless environment.',
      category: 'Database',
      language: 'typescript',
      filename: 'lib/db.ts',
      code: `import { Pool } from 'pg';

let pool: Pool;

export const getPool = () => {
  if (!pool) {
    pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: parseInt(process.env.PG_PORT || '5432'),
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
};

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const pool = getPool();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
};`
  },
   {
    id: '6',
    title: 'useOnClickOutside',
    description: 'React hook to detect clicks outside a specific component. Vital for closing modals and dropdowns.',
    category: 'Hooks',
    language: 'typescript',
    filename: 'hooks/use-click-outside.ts',
    code: `import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};`
   },
   {
       id: '7',
       title: 'JWT Auth Middleware',
       description: 'Next.js Edge middleware to verify JSON Web Tokens (JWT) on protected routes for security.',
       category: 'Security',
       language: 'typescript',
       filename: 'middleware.ts',
       code: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};`
   },
   {
       id: '8',
       title: 'useSSE (Server-Sent Events)',
       description: 'Hook to consume a Server-Sent Events stream for real-time updates without websockets.',
       category: 'Network',
       language: 'typescript',
       filename: 'hooks/use-sse.ts',
       code: `import { useEffect, useState } from 'react';

export function useSSE<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Event | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
      } catch (e) {
        setData(event.data);
      }
    };

    eventSource.onerror = (e) => {
      setError(e);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return { data, error };
}`
   },
   {
       id: '9',
       title: 'Rust Thread-Safe Counter',
       description: 'A thread-safe counter implementation using Mutex and Arc in Rust for concurrent systems.',
       category: 'Rust',
       language: 'rust',
       filename: 'src/counter.rs',
       code: `use std::sync::{Arc, Mutex};
use std::thread;

pub struct SafeCounter {
    count: Arc<Mutex<i32>>,
}

impl SafeCounter {
    pub fn new() -> Self {
        SafeCounter { count: Arc::new(Mutex::new(0)) }
    }

    pub fn increment(&self) {
        let mut num = self.count.lock().unwrap();
        *num += 1;
    }

    pub fn get(&self) -> i32 {
        *self.count.lock().unwrap()
    }
}

fn main() {
    let counter = SafeCounter::new();
    let counter_ref = counter.count.clone();

    let handle = thread::spawn(move || {
        let mut num = counter_ref.lock().unwrap();
        *num += 10;
    });

    handle.join().unwrap();
    println!("Count: {}", counter.get());
}`
   },
    {
    id: '10',
    title: 'cn Utility',
    description: 'A utility to merge Tailwind CSS classes conditionally without conflicts. Standard in Shadcn UI.',
    category: 'Utils',
    language: 'typescript',
    filename: 'utils/cn.ts',
    code: `import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of React: Server Components Explained',
    excerpt: 'Deep dive into how React Server Components are reshaping modern web architecture, reducing bundle sizes, and simplifying data fetching patterns.',
    date: 'Oct 24, 2023',
    readTime: '6 min read',
    tags: ['React', 'Next.js', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1600&auto=format&fit=crop',
    content: `
      <p>React Server Components (RSC) represent one of the most significant shifts in the React ecosystem since hooks were introduced. By allowing components to render exclusively on the server, we can drastically reduce the amount of JavaScript sent to the client.</p>

      <h3>Why RSC Matters</h3>
      <p>Traditional React applications (CSR) send a large JavaScript bundle to the browser, which then hydrates to become interactive. SSR improved the initial load, but the hydration cost remained. RSCs change this equation by doing the heavy lifting on the server and sending only the result (HTML-like data) to the client.</p>

      <h3>Key Benefits</h3>
      <ul>
        <li><strong>Zero Bundle Size:</strong> Dependencies used in server components aren't included in the client bundle.</li>
        <li><strong>Direct Backend Access:</strong> Query databases or file systems directly within your components.</li>
        <li><strong>Automatic Code Splitting:</strong> Client components imported by server components are automatically split.</li>
      </ul>

      <p>As the ecosystem matures, frameworks like Next.js are making RSCs the default, signaling a new era of hybrid rendering architectures that offer the best of both worlds: the interactivity of the client and the performance of the server.</p>
    `
  },
  {
    id: '2',
    title: 'Why I\'m Betting on Rust for Web Tooling',
    excerpt: 'From Turbopack to Roland, Rust is becoming the standard for high-performance web infrastructure. Here is why I switched my toolchain.',
    date: 'Nov 12, 2023',
    readTime: '4 min read',
    tags: ['Rust', 'Tooling', 'WebAssembly'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
    content: `
      <p>The JavaScript ecosystem is massive, but the tools we use to manage it—bundlers, linters, transpilers—are hitting a performance ceiling. Enter Rust.</p>

      <h3>Performance that Matters</h3>
      <p>Tools written in Rust, like SWC (Speedy Web Compiler) and Turbopack, are demonstrating performance gains of 10x-100x over their JS-based counterparts. This isn't just about saving milliseconds; it's about maintaining developer flow state.</p>

      <h3>Memory Safety & Concurrency</h3>
      <p>Rust's ownership model ensures memory safety without a garbage collector, leading to predictable performance. Its fearless concurrency model allows tools to utilize all available CPU cores efficiently, something Node.js struggles with due to its single-threaded nature.</p>

      <p>I believe the future of web infrastructure is not written in JavaScript, but in languages that can compile to native code. Rust is currently leading that charge.</p>
    `
  },
  {
    id: '3',
    title: 'Building Scalable AI Agents',
    excerpt: 'Lessons learned from deploying autonomous agents in production. Handling context windows, tool use, and reliable structured outputs.',
    date: 'Dec 05, 2023',
    readTime: '8 min read',
    tags: ['AI', 'LLM', 'Python', 'LangChain'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop',
    content: `
      <p>Deploying Large Language Models (LLMs) is easy; building reliable, autonomous agents is hard. After building several production agents, patterns have started to emerge.</p>

      <h3>The Context Window Challenge</h3>
      <p>Even with 128k context windows, stuffing everything into the prompt is a recipe for hallucination and high costs. Efficient RAG (Retrieval Augmented Generation) and smart context management are crucial. We need to treat context like a limited cache resource.</p>

      <h3>Reliability via Structured Outputs</h3>
      <p>Asking an LLM to "be helpful" is vague. For production systems, we need structured outputs (JSON). Frameworks that enforce schema validation on LLM outputs are non-negotiable for reliable downstream processing.</p>

      <h3>Tool Use & Planning</h3>
      <p>The real power of agents lies in their ability to use tools. However, giving an agent too many tools can confuse it. Scoping agents to specific domains and giving them distinct, well-documented tools leads to higher success rates in task execution.</p>
    `
  },
   {
    id: '4',
    title: 'Tailwind CSS: From Skeptic to Superfan',
    excerpt: 'I used to hate utility-first CSS. I thought it was messy and cluttered. Now, I can\'t build without it. Here is what changed my mind.',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    tags: ['CSS', 'Tailwind', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1600&auto=format&fit=crop',
    content: `
      <p>Like many developers, I looked at Tailwind CSS code initially and saw "inline styles with extra steps." It violated the separation of concerns principle I had been taught for years.</p>
      
      <h3>The Colocation Benefit</h3>
      <p>The "separation of concerns" argument often conflates file separation with logical separation. By keeping styles right next to the markup, we actually reduce cognitive load. You don't have to jump between a .js file and a .css file to understand how a component looks.</p>
      
      <h3>Consistency System</h3>
      <p>Tailwind isn't just a library; it's a design system constraint. It prevents "magic numbers" (like <code>margin-left: 13px</code>) by forcing you to pick from a pre-defined scale. This leads to UIs that look more consistent and professional by default.</p>
      
      <p>Once you get past the initial visual noise of the class names, the productivity boost is undeniable.</p>
    `
  }
];