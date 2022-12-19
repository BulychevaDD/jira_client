import { Comment, Project, Task, User } from "../types/project";
import { UserListItem } from "../types/user";

export const parseUser = (data: any): User => {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
  };
};

export const parseComment = (data: any): Comment => {
  return {
    id: data.id,
    user: parseUser(data.user),
    content: data.content,
  };
};

export const parseTask = (data: any): Task => {
  return {
    id: data.id,
    isDone: data.is_done,
    name: data.name,
    comments: data.comments.map(parseComment),
    description: data.description,
  };
};

export const parseProject = (data: any): Project => {
  return {
    id: data.id,
    name: data.name,
    tasks: data.tasks.map(parseTask),
    users: data.users.map(parseUser),
  };
};

export const parseUserListItem = (data: any): UserListItem => {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
  };
};
