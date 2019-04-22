import {
  TypeConstant,
  ActionCreatorBuilder,
  ActionCreatorTypeMetadata,
  ActionBuilder,
} from './type-helpers';
import { createCustomAction } from './create-custom-action';
import {
  checkIsEmpty,
  throwIsEmpty,
  checkInvalidActionType,
  throwInvalidActionType,
} from './utils/validation';

/**
 * @description create an action-creator of a given function that contains hidden "type" metadata
 */
export function createAction<
  TType extends TypeConstant,
  TPayload extends any = undefined,
  TMeta extends any = undefined,
  TArgs extends any[] = any[]
>(
  type: TType,
  payloadCreator: undefined | ((...args: TArgs) => TPayload),
  metaCreator?: (...args: TArgs) => TMeta
): () => (...args: TArgs) => ActionBuilder<TType, TPayload, TMeta>;

export function createAction<TType extends TypeConstant>(
  type: TType
): <TPayload = undefined, TMeta = undefined>() => ActionCreatorBuilder<
  TType,
  TPayload,
  TMeta
>;

export function createAction<
  TType extends TypeConstant,
  TPayload extends any = undefined,
  TMeta extends any = undefined,
  TArgs extends any[] = any[]
>(
  type: TType,
  payloadCreator?: undefined | ((...args: TArgs) => TPayload),
  metaCreator?: (...args: TArgs) => TMeta
):
  | (() => (...args: TArgs) => ActionBuilder<TType, TPayload, TMeta>)
  | (<TPayload = undefined, TMeta = undefined>() => ActionCreatorBuilder<
      TType,
      TPayload,
      TMeta
    >) {
  if (checkIsEmpty(type)) {
    throwIsEmpty(1);
  }

  if (checkInvalidActionType(type)) {
    throwInvalidActionType(1);
  }

  if (payloadCreator != null || metaCreator != null) {
    return <TPayload, TMeta = undefined>() => {
      return createCustomAction(type, (...args: TArgs) => {
        const payload =
          payloadCreator != null ? payloadCreator(...args) : undefined;
        const meta = metaCreator != null ? metaCreator(...args) : undefined;

        return {
          ...(payload !== undefined && { payload }),
          ...(meta !== undefined && { meta }),
        };
      }) as ActionCreatorBuilder<TType, TPayload, TMeta>;
    };
  }

  return <TPayload, TMeta = undefined>() => {
    return createCustomAction(type, (...args: TArgs) => {
      const payload = args[0];
      const meta = args[1];

      return {
        ...(payload !== undefined && { payload }),
        ...(meta !== undefined && { meta }),
      };
    }) as ActionCreatorBuilder<TType, TPayload, TMeta>;
  };
}
