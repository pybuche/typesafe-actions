import { Todo } from 'MyModels';
import cuid from 'cuid';
import { createStandardAction, createAsyncAction } from 'typesafe-actions';

export const addTodo = createStandardAction('ADD_TODO').map(
  ({ title }: { title: string }): { payload: Todo } => ({
    payload: {
      title,
      id: cuid(),
    },
  })
);

export const removeTodo = createStandardAction('REMOVE_TODO')<string>();

export const loadTodosAsync = createAsyncAction(
  'LOAD_TODOS_REQUEST',
  'LOAD_TODOS_SUCCESS',
  'LOAD_TODOS_FAILURE',
  'LOAD_TODOS_CANCEL'
)<undefined, Todo[], string, undefined>();

export const saveTodosAsync = createAsyncAction(
  'SAVE_TODOS_REQUEST',
  'SAVE_TODOS_SUCCESS',
  'SAVE_TODOS_FAILURE',
  'SAVE_TODOS_CANCEL'
)<undefined, undefined, string, undefined>();
