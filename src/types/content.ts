// Frontmatter interfaces for content files

export interface BaseFrontmatter {
  title: string;
  description: string;
  slug?: string;
  tags?: string[];
  cover?: string;
  draft?: boolean;
}

export interface PostFrontmatter extends BaseFrontmatter {
  date: string; // ISO 8601 string
}

export interface ProjectFrontmatter extends BaseFrontmatter {
  date?: string; // ISO 8601 string - optional for projects
}

export interface Post {
  frontmatter: PostFrontmatter;
  compiledContent: () => string;
  slug: string;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  compiledContent: () => string;
  slug: string;
}
