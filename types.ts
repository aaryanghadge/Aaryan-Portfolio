
// Fix: Imported React to resolve the 'Cannot find namespace React' error when using React.ReactNode
import React from 'react';

export interface Project {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  link?: string;
  github?: string;
  image: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface Snippet {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  filename: string;
  code: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  image: string;
}

export enum Section {
  HOME = 'home',
  WORK = 'work',
  ABOUT = 'about',
  CONTACT = 'contact',
}