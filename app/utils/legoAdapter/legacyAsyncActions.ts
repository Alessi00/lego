import type { ID } from 'app/store/models';
import type Entities from 'app/store/models/entities';
import type { EntityType } from 'app/store/models/entities';
import type { AsyncActionType } from 'app/types';
import type { AnyAction } from '@reduxjs/toolkit';

export interface BaseMeta {
  queryString: string;
  cursor: string;
  errorMessage: string;
  enableOptimistic: boolean;
  endpoint: string;
  schemaKey: EntityType;
}

export interface FetchMeta extends BaseMeta {
  paginationKey?: string;
  query?: {
    [key: string]: string;
  };
}

interface AsyncAction<Meta extends BaseMeta = BaseMeta> {
  type: string;
  meta: Meta;
  payload: object | null;
}

interface AsyncActionBegin<Meta extends BaseMeta = BaseMeta>
  extends AsyncAction<Meta> {
  type: `${string}.BEGIN`;
}

interface AsyncActionFailure<Meta extends BaseMeta = BaseMeta>
  extends AsyncAction<Meta> {
  type: `${string}.FAILURE`;
}

export interface FetchPayload {
  actionGrant?: string[];
  entities: Partial<Entities>;
  result?: ID[];
  next?: string;
  previous?: string;
}

export interface AsyncActionSuccess<
  Meta extends BaseMeta = BaseMeta,
  Payload extends FetchPayload | [] = FetchPayload | []
> extends AsyncAction<Meta> {
  type: `${string}.SUCCESS`;
  payload: Payload;
}

export type AsyncFetchActionSuccess = AsyncActionSuccess<
  FetchMeta,
  FetchPayload
>;

interface AsyncActionSuccessWithEntityType<T extends EntityType>
  extends AsyncFetchActionSuccess {
  payload: AsyncFetchActionSuccess['payload'] & {
    entities: Pick<Entities, T>;
  };
}

export const isAsyncActionBegin = (
  action: AnyAction
): action is AsyncActionBegin => action.type.endsWith('.BEGIN');
isAsyncActionBegin.matching =
  <Meta extends BaseMeta = BaseMeta>(actionTypes: AsyncActionType[]) =>
  (action: AnyAction): action is AsyncActionBegin<Meta> =>
    actionTypes.map((t) => t.BEGIN).includes(action.type);

export const isAsyncActionFailure = (
  action: AnyAction
): action is AsyncActionFailure => action.type.endsWith('.FAILURE');
isAsyncActionFailure.matching =
  <Meta extends BaseMeta = BaseMeta>(actionTypes: AsyncActionType[]) =>
  (action: AnyAction): action is AsyncActionFailure<Meta> =>
    actionTypes.map((t) => t.FAILURE).includes(action.type);

export const isAsyncActionSuccess = (
  action: AnyAction
): action is AsyncActionSuccess => action.type.endsWith('.SUCCESS');
isAsyncActionSuccess.matching =
  <
    Meta extends BaseMeta = BaseMeta,
    Payload extends FetchPayload | [] = FetchPayload | []
  >(
    actionTypes: AsyncActionType[]
  ) =>
  (action: AnyAction): action is AsyncActionSuccess<Meta, Payload> =>
    actionTypes.map((t) => t.SUCCESS).includes(action.type);
isAsyncActionSuccess.containingEntity =
  <T extends EntityType>(entityType: T) =>
  (action: AnyAction): action is AsyncActionSuccessWithEntityType<T> =>
    isAsyncActionSuccess(action) &&
    'entities' in action.payload &&
    entityType in action.payload.entities;
