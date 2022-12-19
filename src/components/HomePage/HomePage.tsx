import React, { useState } from "react";
import { Project } from "../../types/project";
import { API } from "../../services/apiService";
import { parseProject, parseUserListItem } from "../../utils/response";
import { useQuery } from "react-query";
import { GET_PROJECTS, GET_USERS } from "../../constants/queryKeys";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./HomePage.module.css";
import { UserListItem } from "../../types/user";

interface ProjectData {
  name: string;
}

interface TaskData {
  name: string;
  description: string;
}

interface CommentData {
  content: string;
}

const projectSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, "Слишком короткое имя")
    .max(64, "Слишком длинное имя")
    .required("Обязательное поле"),
});

const taskSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, "Слишком короткое имя")
    .max(64, "Слишком длинное имя")
    .required("Обязательное поле"),
  description: Yup.string().required("Обязательное поле"),
});

const commentSchema = Yup.object().shape({
  content: Yup.string().required("Обязательное поле"),
});

const projectInitialValues: ProjectData = {
  name: "",
};

const taskInitialValues: TaskData = {
  name: "",
  description: "",
};

const commentInitialValues: CommentData = {
  content: "",
};

const HomePage: React.FC = () => {
  const [commonError, setCommonError] = useState<string | null>(null);

  const { data: projects, refetch } = useQuery(
    GET_PROJECTS,
    async (): Promise<Array<Project>> => {
      return await API()
        .get("/api/tasks/project")
        .then((response) => response.data.map(parseProject));
    }
  );

  const { data: availableUsers } = useQuery(
    GET_USERS,
    async (): Promise<Array<UserListItem>> => {
      return await API()
        .get("/api/users/list")
        .then((response) => response.data.map(parseUserListItem));
    }
  );

  const handleCreateProjectSubmit = async (values: ProjectData) => {
    API()
      .post("/api/tasks/project", { name: values.name })
      .then(() => {
        refetch();
      })
      .catch(() => {
        setCommonError("Ошибка создания проекта");
      });
  };

  const handleDeleteProject = async (projectId: number) => {
    API()
      .delete("/api/tasks/project", { data: { id: projectId } })
      .then(() => {
        refetch();
      });
  };

  const handleCreateTaskSubmit = async (
    values: TaskData,
    projectId: number
  ) => {
    API()
      .post("/api/tasks/task", {
        name: values.name,
        description: values.description,
        project: projectId,
      })
      .then(() => {
        refetch();
      })
      .catch(() => {
        setCommonError("Ошибка создания задачи");
      });
  };

  const handleCreateCommentSubmit = async (
    values: CommentData,
    taskId: number
  ) => {
    API()
      .post("/api/tasks/comment", {
        task: taskId,
        content: values.content,
      })
      .then(() => {
        refetch();
      })
      .catch(() => {
        setCommonError("Ошибка публикации комментария");
      });
  };

  const handleDeleteTask = async (taskId: number) => {
    API()
      .delete("/api/tasks/task", { data: { id: taskId } })
      .then(() => {
        refetch();
      });
  };

  const handleChangeStatus = async (taskId: number) => {
    API()
      .put("/api/tasks/task", { data: { id: taskId } })
      .then(() => {
        refetch();
      });
  };

  const handleAddNewUser = async (projectId: number, userId: number) => {
    API()
      .put("/api/tasks/project", { data: { project: projectId, user: userId } })
      .then(() => {
        refetch();
      });
  };

  return projects ? (
    <div className={styles.container}>
      <div className={styles.error}>{commonError}</div>
      <div className={styles.projectCreateContainer}>
        <div className={styles.localTitle}>Создать новый проект</div>
        <Formik
          initialValues={projectInitialValues}
          onSubmit={handleCreateProjectSubmit}
          validationSchema={projectSchema}
        >
          <Form className={styles.form}>
            <div>
              <label htmlFor="name">Имя проекта</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <button type="submit">Создать</button>
            </div>
          </Form>
        </Formik>
      </div>
      <div className={styles.projectCreateContainer}>
        <div className={styles.localTitle}>Проекты</div>
        {projects.map((project) => (
          <div key={project.id}>
            <div>{project.name}</div>
            <div className={styles.buttonContainer}>
              <button onClick={() => handleDeleteProject(project.id)}>
                Удалить
              </button>
            </div>
            <div>
              <div>
                <div className={styles.localTitle}>Пользователи</div>
                {project.users.map((user) => (
                  <div key={user.id} className={styles.accent}>
                    {user.firstName} {user.lastName}
                  </div>
                ))}
                <div className={styles.localTitle}>Пригласить</div>
                {availableUsers?.map((userItem) => (
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={() => handleAddNewUser(project.id, userItem.id)}
                    >
                      {userItem.firstName} {userItem.lastName}
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <div className={styles.projectCreateContainer}>
                  <div className={styles.localTitle}>Создать новую задачу</div>
                  <Formik
                    initialValues={taskInitialValues}
                    onSubmit={(values) =>
                      handleCreateTaskSubmit(values, project.id)
                    }
                    validationSchema={taskSchema}
                  >
                    <Form className={styles.form}>
                      <div>
                        <label htmlFor="nameTask">Имя задачи</label>
                        <Field type="text" name="name" id="nameTask" />
                        <ErrorMessage name="name" />
                      </div>
                      <div>
                        <label htmlFor="descriptionTask">Описание</label>
                        <Field
                          type="text"
                          name="description"
                          id="descriptionTask"
                        />
                        <ErrorMessage name="description" />
                      </div>
                      <div>
                        <button type="submit">Создать</button>
                      </div>
                    </Form>
                  </Formik>
                  <div>{commonError}</div>
                </div>
                <div className={styles.localTitle}>Задачи</div>
                {project.tasks.map((task) => (
                  <div key={task.id}>
                    <div>{task.name}</div>
                    <div className={styles.buttonContainer}>
                      <button onClick={() => handleDeleteTask(task.id)}>
                        Удалить
                      </button>
                    </div>
                    <div>{task.description}</div>
                    <div className={styles.status}>
                      {task.isDone ? "Готово" : "Выполняется"}
                    </div>
                    <div className={styles.buttonContainer}>
                      <button onClick={() => handleChangeStatus(task.id)}>
                        Изменить статус
                      </button>
                    </div>
                    <div>
                      <div className={styles.localTitle}>Комментарии</div>
                      {task.comments.map((comment) => (
                        <div key={comment.id}>
                          <div className={styles.accent}>
                            {comment.user.lastName}
                          </div>
                          <div className={styles.accent}>{comment.content}</div>
                        </div>
                      ))}
                      <Formik
                        initialValues={commentInitialValues}
                        onSubmit={(values) =>
                          handleCreateCommentSubmit(values, task.id)
                        }
                        validationSchema={commentSchema}
                      >
                        <Form className={styles.form}>
                          <div>
                            <label htmlFor="content">Комментарий</label>
                            <Field type="text" name="content" id="content" />
                            <ErrorMessage name="content" />
                          </div>
                          <div>
                            <button type="submit">Опубликовать</button>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default HomePage;
