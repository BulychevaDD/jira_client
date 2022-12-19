export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
}

export interface Task {
  id: number;
  comments: Array<Comment>;
  name: string;
  description: string;
  isDone: boolean;
}

export interface Project {
  id: number;
  tasks: Array<Task>;
  name: string;
  users: Array<User>;
}
