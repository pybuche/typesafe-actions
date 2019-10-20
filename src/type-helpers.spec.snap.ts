import * as TH from './type-helpers';
import { testType } from './utils/testing';
import { getType } from './get-type';
import { isOfType } from './is-of-type';
import { isActionOf } from './is-action-of';
import { StateType, ActionType } from './type-helpers';

import { actions, types } from './type-helpers-fixtures';
const {
  withTypeOnly,
  withPayload,
  withPayloadMeta,
  withMappedPayload,
  withMappedPayloadMeta,
  asyncAction,
} = actions;

describe('StateType', () => {
  const reducer = (
    state: boolean = false,
    action: ActionType<typeof withTypeOnly>
  ) => {
    switch (action.type) {
      case getType(withTypeOnly):
        return true;
      default:
        return false;
    }
  };

  // @dts-jest:pass:snap -> boolean
  testType<StateType<typeof reducer>>();
  // @dts-jest:pass:snap -> boolean
  reducer(undefined, withTypeOnly()); // => true
});

describe('ActionType', () => {
  // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error>
  testType<ActionType<typeof actions>>();
  type RootAction = ActionType<typeof actions>;

  function getTypeReducer(action: RootAction): RootAction | undefined {
    switch (action.type) {
      case getType(actions.deep.nested.withTypeOnly): {
        return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
      }
      case getType(withTypeOnly): {
        return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
      }
      case getType(withPayload): {
        return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
      }
      case getType(withPayloadMeta): {
        return testType<{
          type: 'WITH_PAYLOAD_META';
          payload: number;
          meta: string;
        }>(action);
      }
      case getType(withMappedPayload): {
        return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(
          action
        );
      }
      case getType(withMappedPayloadMeta): {
        return testType<{
          type: 'WITH_MAPPED_PAYLOAD_META';
          payload: number;
          meta: string;
        }>(action);
      }
      case getType(asyncAction.request): {
        return testType<{
          type: 'FETCH_USER_REQUEST';
        }>(action);
      }
      case getType(asyncAction.success): {
        return testType<{
          type: 'FETCH_USER_SUCCESS';
          payload: { firstName: string; lastName: string };
        }>(action);
      }
      case getType(asyncAction.failure): {
        return testType<{
          type: 'FETCH_USER_FAILURE';
          payload: Error;
        }>(action);
      }

      default:
        return undefined;
    }
  }

  function isActionOfReducer(action: RootAction): RootAction | undefined {
    if (isActionOf(actions.deep.nested.withTypeOnly, action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withTypeOnly, action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withPayload, action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf(withPayloadMeta, action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf(withMappedPayload, action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf(withMappedPayloadMeta, action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf(asyncAction.request, action)) {
      return testType<{
        type: 'FETCH_USER_REQUEST';
      }>(action);
    }

    return undefined;
  }

  function isActionOfCurriedReducer(
    action: RootAction
  ): RootAction | undefined {
    if (isActionOf(actions.deep.nested.withTypeOnly)(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withTypeOnly)(action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf(withPayload)(action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf(withPayloadMeta)(action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf(withMappedPayload)(action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf(withMappedPayloadMeta)(action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf(asyncAction.request)(action)) {
      return testType<{
        type: 'FETCH_USER_REQUEST';
      }>(action);
    }

    return undefined;
  }

  function isActionOfArrayReducer(action: RootAction): RootAction | undefined {
    if (isActionOf([actions.deep.nested.withTypeOnly])(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf([withTypeOnly])(action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf([withTypeOnly])(action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isActionOf([withPayload])(action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf([withPayloadMeta])(action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf([withMappedPayload])(action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isActionOf([withMappedPayloadMeta])(action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isActionOf([asyncAction.request])(action)) {
      return testType<{
        type: 'FETCH_USER_REQUEST';
      }>(action);
    }

    return undefined;
  }

  function isOfTypeReducer(action: RootAction): RootAction | undefined {
    if (isOfType(types.VERY_DEEP_WITH_TYPE_ONLY, action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_TYPE_ONLY, action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_PAYLOAD, action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isOfType(types.WITH_PAYLOAD_META, action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isOfType(types.WITH_MAPPED_PAYLOAD, action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isOfType(types.WITH_MAPPED_PAYLOAD_META, action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isOfType('FETCH_USER_REQUEST', action)) {
      return testType<{ type: 'FETCH_USER_REQUEST' }>(action);
    }

    return undefined;
  }

  function isOfTypeCurriedReducer(action: RootAction): RootAction | undefined {
    if (isOfType(types.VERY_DEEP_WITH_TYPE_ONLY)(action)) {
      return testType<{ type: 'VERY_DEEP_WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_TYPE_ONLY)(action)) {
      return testType<{ type: 'WITH_TYPE_ONLY' }>(action);
    } else if (isOfType(types.WITH_PAYLOAD)(action)) {
      return testType<{ type: 'WITH_PAYLOAD'; payload: number }>(action);
    } else if (isOfType(types.WITH_PAYLOAD_META)(action)) {
      return testType<{
        type: 'WITH_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isOfType(types.WITH_MAPPED_PAYLOAD)(action)) {
      return testType<{ type: 'WITH_MAPPED_PAYLOAD'; payload: number }>(action);
    } else if (isOfType(types.WITH_MAPPED_PAYLOAD_META)(action)) {
      return testType<{
        type: 'WITH_MAPPED_PAYLOAD_META';
        payload: number;
        meta: string;
      }>(action);
    } else if (isOfType('FETCH_USER_REQUEST')(action)) {
      return testType<{ type: 'FETCH_USER_REQUEST' }>(action);
    }

    return undefined;
  }

  describe('action-helpers - createStandardAction', () => {
    describe('should return action with type only', () => {
      const actual = withTypeOnly();
      const expected = { type: 'WITH_TYPE_ONLY' };
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      getTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfCurriedReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfArrayReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeCurriedReducer(actual); // => expected
    });

    describe('should return action with payload', () => {
      const actual = withPayload(2);
      const expected = { type: 'WITH_PAYLOAD', payload: 2 };
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      getTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfCurriedReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfArrayReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeCurriedReducer(actual); // => expected
    });

    describe('should return action with payload and meta', () => {
      const actual = withPayloadMeta(2, 'metaValue');
      const expected = {
        type: 'WITH_PAYLOAD_META',
        payload: 2,
        meta: 'metaValue',
      };
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      getTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfCurriedReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfArrayReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeCurriedReducer(actual); // => expected
    });

    describe('should return action with mapped payload', () => {
      const actual = withMappedPayload(2);
      const expected = { type: 'WITH_MAPPED_PAYLOAD', payload: 2 };
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      getTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfCurriedReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfArrayReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeCurriedReducer(actual); // => expected
    });

    describe('should return action with mapped payload and meta', () => {
      const actual = withMappedPayloadMeta(2, 'metaValue');
      const expected = {
        type: 'WITH_MAPPED_PAYLOAD_META',
        payload: 2,
        meta: 'metaValue',
      };
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      getTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfCurriedReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfArrayReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeCurriedReducer(actual); // => expected
    });

    describe('should return action with async action', () => {
      const actual = asyncAction.request();
      const expected = {
        type: 'FETCH_USER_REQUEST',
      };
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      getTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfCurriedReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isActionOfArrayReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeReducer(actual); // => expected
      // @dts-jest:pass:snap -> TH.EmptyAction<"WITH_TYPE_ONLY"> | { type: "VERY_DEEP_WITH_TYPE_ONLY"; } | TH.PayloadAction<"WITH_PAYLOAD", number> | TH.PayloadAction<"WITH_OPTIONAL_PAYLOAD", number | undefined> | TH.PayloadMetaAction<"WITH_PAYLOAD_META", number, string> | TH.PayloadAction<"WITH_MAPPED_PAYLOAD", number> | TH.PayloadMetaAction<"WITH_MAPPED_PAYLOAD_META", number, string> | TH.EmptyAction<"FETCH_USER_REQUEST"> | TH.PayloadAction<"FETCH_USER_SUCCESS", { firstName: string; lastName: string; }> | TH.PayloadAction<"FETCH_USER_FAILURE", Error> | undefined
      isOfTypeCurriedReducer(actual); // => expected
    });
  });
});
