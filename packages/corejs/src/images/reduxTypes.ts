import { EntityReducerPayloadTypes } from '../createEntityReducer';
import { GetOneImageResponse } from './apiTypes';

/**
 * A type-mapping interface that defines the types of the action payload related to the image entity.
 */
export interface ImagePayloadTypes extends EntityReducerPayloadTypes {
  /**
   * The payload type for the images/gotOne action.
   */
  GotOne: GetOneImageResponse,
}
