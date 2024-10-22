export const enum UPDATE_TYPE {
  ADD = "ADD",
  DELETE = "DELETE",
  MODIFY = "MODIFY",
}

export const encodeUPDATE_TYPE: { [key: string]: number } = {
  ADD: 0,
  DELETE: 1,
  MODIFY: 2,
};

export const decodeUPDATE_TYPE: { [key: number]: UPDATE_TYPE } = {
  0: UPDATE_TYPE.ADD,
  1: UPDATE_TYPE.DELETE,
  2: UPDATE_TYPE.MODIFY,
};

export interface UpdateTreeSessionRequestDTO {
  vertices?: UpdateOrDeleteSessionVertexPairRequestDTO[];
  edges?: UpdateSessionEdgeRequestDTO[];
  sessionId?: string;
  imageBase64?: string;
}

export function encodeUpdateTreeSessionRequestDTO(message: UpdateTreeSessionRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateTreeSessionRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateTreeSessionRequestDTO(message: UpdateTreeSessionRequestDTO, bb: ByteBuffer): void {
  // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
  let array$vertices = message.vertices;
  if (array$vertices !== undefined) {
    for (let value of array$vertices) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeUpdateOrDeleteSessionVertexPairRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated UpdateSessionEdgeRequestDTO edges = 3;
  let array$edges = message.edges;
  if (array$edges !== undefined) {
    for (let value of array$edges) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeUpdateSessionEdgeRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string sessionId = 4;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sessionId);
  }

  // optional string imageBase64 = 5;
  let $imageBase64 = message.imageBase64;
  if ($imageBase64 !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $imageBase64);
  }
}

export function decodeUpdateTreeSessionRequestDTO(binary: Uint8Array): UpdateTreeSessionRequestDTO {
  return _decodeUpdateTreeSessionRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateTreeSessionRequestDTO(bb: ByteBuffer): UpdateTreeSessionRequestDTO {
  let message: UpdateTreeSessionRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.vertices || (message.vertices = []);
        values.push(_decodeUpdateOrDeleteSessionVertexPairRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // repeated UpdateSessionEdgeRequestDTO edges = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.edges || (message.edges = []);
        values.push(_decodeUpdateSessionEdgeRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // optional string sessionId = 4;
      case 4: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string imageBase64 = 5;
      case 5: {
        message.imageBase64 = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateCoordsTreeSessionRequestDTO {
  vertices?: UpdateOrDeleteSessionVertexPairRequestDTO[];
  edges?: UpdateSessionEdgeCoordsRequestDTO[];
  sessionId?: string;
  imageBase64?: string;
}

export function encodeUpdateCoordsTreeSessionRequestDTO(message: UpdateCoordsTreeSessionRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateCoordsTreeSessionRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateCoordsTreeSessionRequestDTO(message: UpdateCoordsTreeSessionRequestDTO, bb: ByteBuffer): void {
  // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
  let array$vertices = message.vertices;
  if (array$vertices !== undefined) {
    for (let value of array$vertices) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeUpdateOrDeleteSessionVertexPairRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated UpdateSessionEdgeCoordsRequestDTO edges = 3;
  let array$edges = message.edges;
  if (array$edges !== undefined) {
    for (let value of array$edges) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeUpdateSessionEdgeCoordsRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string sessionId = 4;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sessionId);
  }

  // optional string imageBase64 = 5;
  let $imageBase64 = message.imageBase64;
  if ($imageBase64 !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $imageBase64);
  }
}

export function decodeUpdateCoordsTreeSessionRequestDTO(binary: Uint8Array): UpdateCoordsTreeSessionRequestDTO {
  return _decodeUpdateCoordsTreeSessionRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateCoordsTreeSessionRequestDTO(bb: ByteBuffer): UpdateCoordsTreeSessionRequestDTO {
  let message: UpdateCoordsTreeSessionRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.vertices || (message.vertices = []);
        values.push(_decodeUpdateOrDeleteSessionVertexPairRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // repeated UpdateSessionEdgeCoordsRequestDTO edges = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.edges || (message.edges = []);
        values.push(_decodeUpdateSessionEdgeCoordsRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // optional string sessionId = 4;
      case 4: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string imageBase64 = 5;
      case 5: {
        message.imageBase64 = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateWeightedTreeSessionRequestDTO {
  vertices?: UpdateOrDeleteSessionVertexPairRequestDTO[];
  edges?: IUpdateSessionWeightedEdgeRequestDTO[];
  sessionId?: string;
  imageBase64?: string;
}

export function encodeUpdateWeightedTreeSessionRequestDTO(message: UpdateWeightedTreeSessionRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateWeightedTreeSessionRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateWeightedTreeSessionRequestDTO(message: UpdateWeightedTreeSessionRequestDTO, bb: ByteBuffer): void {
  // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
  let array$vertices = message.vertices;
  if (array$vertices !== undefined) {
    for (let value of array$vertices) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeUpdateOrDeleteSessionVertexPairRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated IUpdateSessionWeightedEdgeRequestDTO edges = 3;
  let array$edges = message.edges;
  if (array$edges !== undefined) {
    for (let value of array$edges) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeIUpdateSessionWeightedEdgeRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string sessionId = 4;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sessionId);
  }

  // optional string imageBase64 = 5;
  let $imageBase64 = message.imageBase64;
  if ($imageBase64 !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $imageBase64);
  }
}

export function decodeUpdateWeightedTreeSessionRequestDTO(binary: Uint8Array): UpdateWeightedTreeSessionRequestDTO {
  return _decodeUpdateWeightedTreeSessionRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateWeightedTreeSessionRequestDTO(bb: ByteBuffer): UpdateWeightedTreeSessionRequestDTO {
  let message: UpdateWeightedTreeSessionRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.vertices || (message.vertices = []);
        values.push(_decodeUpdateOrDeleteSessionVertexPairRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // repeated IUpdateSessionWeightedEdgeRequestDTO edges = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.edges || (message.edges = []);
        values.push(_decodeIUpdateSessionWeightedEdgeRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // optional string sessionId = 4;
      case 4: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string imageBase64 = 5;
      case 5: {
        message.imageBase64 = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateWeightedCoordsTreeSessionRequestDTO {
  vertices?: UpdateOrDeleteSessionVertexPairRequestDTO[];
  edges?: IUpdateSessionWeightedEdgeWithCoordsRequestDTO[];
  sessionId?: string;
  imageBase64?: string;
}

export function encodeUpdateWeightedCoordsTreeSessionRequestDTO(message: UpdateWeightedCoordsTreeSessionRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateWeightedCoordsTreeSessionRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateWeightedCoordsTreeSessionRequestDTO(message: UpdateWeightedCoordsTreeSessionRequestDTO, bb: ByteBuffer): void {
  // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
  let array$vertices = message.vertices;
  if (array$vertices !== undefined) {
    for (let value of array$vertices) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeUpdateOrDeleteSessionVertexPairRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated IUpdateSessionWeightedEdgeWithCoordsRequestDTO edges = 3;
  let array$edges = message.edges;
  if (array$edges !== undefined) {
    for (let value of array$edges) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeIUpdateSessionWeightedEdgeWithCoordsRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string sessionId = 4;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sessionId);
  }

  // optional string imageBase64 = 5;
  let $imageBase64 = message.imageBase64;
  if ($imageBase64 !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $imageBase64);
  }
}

export function decodeUpdateWeightedCoordsTreeSessionRequestDTO(binary: Uint8Array): UpdateWeightedCoordsTreeSessionRequestDTO {
  return _decodeUpdateWeightedCoordsTreeSessionRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateWeightedCoordsTreeSessionRequestDTO(bb: ByteBuffer): UpdateWeightedCoordsTreeSessionRequestDTO {
  let message: UpdateWeightedCoordsTreeSessionRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.vertices || (message.vertices = []);
        values.push(_decodeUpdateOrDeleteSessionVertexPairRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // repeated IUpdateSessionWeightedEdgeWithCoordsRequestDTO edges = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.edges || (message.edges = []);
        values.push(_decodeIUpdateSessionWeightedEdgeWithCoordsRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // optional string sessionId = 4;
      case 4: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string imageBase64 = 5;
      case 5: {
        message.imageBase64 = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateGraphSessionRequestDTO {
  vertices?: UpdateOrDeleteSessionVertexPairRequestDTO[];
  edges?: UpdateSessionEdgeRequestDTO[];
  sessionId?: string;
  imageBase64?: string;
}

export function encodeUpdateGraphSessionRequestDTO(message: UpdateGraphSessionRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateGraphSessionRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateGraphSessionRequestDTO(message: UpdateGraphSessionRequestDTO, bb: ByteBuffer): void {
  // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
  let array$vertices = message.vertices;
  if (array$vertices !== undefined) {
    for (let value of array$vertices) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeUpdateOrDeleteSessionVertexPairRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated UpdateSessionEdgeRequestDTO edges = 3;
  let array$edges = message.edges;
  if (array$edges !== undefined) {
    for (let value of array$edges) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeUpdateSessionEdgeRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string sessionId = 4;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sessionId);
  }

  // optional string imageBase64 = 5;
  let $imageBase64 = message.imageBase64;
  if ($imageBase64 !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $imageBase64);
  }
}

export function decodeUpdateGraphSessionRequestDTO(binary: Uint8Array): UpdateGraphSessionRequestDTO {
  return _decodeUpdateGraphSessionRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateGraphSessionRequestDTO(bb: ByteBuffer): UpdateGraphSessionRequestDTO {
  let message: UpdateGraphSessionRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.vertices || (message.vertices = []);
        values.push(_decodeUpdateOrDeleteSessionVertexPairRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // repeated UpdateSessionEdgeRequestDTO edges = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.edges || (message.edges = []);
        values.push(_decodeUpdateSessionEdgeRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // optional string sessionId = 4;
      case 4: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string imageBase64 = 5;
      case 5: {
        message.imageBase64 = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateCoordsGraphSessionRequestDTO {
  vertices?: UpdateOrDeleteSessionVertexPairRequestDTO[];
  edges?: UpdateSessionEdgeCoordsRequestDTO[];
  sessionId?: string;
  imageBase64?: string;
}

export function encodeUpdateCoordsGraphSessionRequestDTO(message: UpdateCoordsGraphSessionRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateCoordsGraphSessionRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateCoordsGraphSessionRequestDTO(message: UpdateCoordsGraphSessionRequestDTO, bb: ByteBuffer): void {
  // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
  let array$vertices = message.vertices;
  if (array$vertices !== undefined) {
    for (let value of array$vertices) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeUpdateOrDeleteSessionVertexPairRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated UpdateSessionEdgeCoordsRequestDTO edges = 3;
  let array$edges = message.edges;
  if (array$edges !== undefined) {
    for (let value of array$edges) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeUpdateSessionEdgeCoordsRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string sessionId = 4;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sessionId);
  }

  // optional string imageBase64 = 5;
  let $imageBase64 = message.imageBase64;
  if ($imageBase64 !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $imageBase64);
  }
}

export function decodeUpdateCoordsGraphSessionRequestDTO(binary: Uint8Array): UpdateCoordsGraphSessionRequestDTO {
  return _decodeUpdateCoordsGraphSessionRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateCoordsGraphSessionRequestDTO(bb: ByteBuffer): UpdateCoordsGraphSessionRequestDTO {
  let message: UpdateCoordsGraphSessionRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.vertices || (message.vertices = []);
        values.push(_decodeUpdateOrDeleteSessionVertexPairRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // repeated UpdateSessionEdgeCoordsRequestDTO edges = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.edges || (message.edges = []);
        values.push(_decodeUpdateSessionEdgeCoordsRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // optional string sessionId = 4;
      case 4: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string imageBase64 = 5;
      case 5: {
        message.imageBase64 = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateWeightedCoordsGraphSessionRequestDTO {
  vertices?: UpdateOrDeleteSessionVertexPairRequestDTO[];
  edges?: IUpdateSessionWeightedEdgeWithCoordsRequestDTO[];
  sessionId?: string;
  imageBase64?: string;
}

export function encodeUpdateWeightedCoordsGraphSessionRequestDTO(message: UpdateWeightedCoordsGraphSessionRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateWeightedCoordsGraphSessionRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateWeightedCoordsGraphSessionRequestDTO(message: UpdateWeightedCoordsGraphSessionRequestDTO, bb: ByteBuffer): void {
  // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
  let array$vertices = message.vertices;
  if (array$vertices !== undefined) {
    for (let value of array$vertices) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeUpdateOrDeleteSessionVertexPairRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated IUpdateSessionWeightedEdgeWithCoordsRequestDTO edges = 3;
  let array$edges = message.edges;
  if (array$edges !== undefined) {
    for (let value of array$edges) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeIUpdateSessionWeightedEdgeWithCoordsRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string sessionId = 4;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sessionId);
  }

  // optional string imageBase64 = 5;
  let $imageBase64 = message.imageBase64;
  if ($imageBase64 !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $imageBase64);
  }
}

export function decodeUpdateWeightedCoordsGraphSessionRequestDTO(binary: Uint8Array): UpdateWeightedCoordsGraphSessionRequestDTO {
  return _decodeUpdateWeightedCoordsGraphSessionRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateWeightedCoordsGraphSessionRequestDTO(bb: ByteBuffer): UpdateWeightedCoordsGraphSessionRequestDTO {
  let message: UpdateWeightedCoordsGraphSessionRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.vertices || (message.vertices = []);
        values.push(_decodeUpdateOrDeleteSessionVertexPairRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // repeated IUpdateSessionWeightedEdgeWithCoordsRequestDTO edges = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.edges || (message.edges = []);
        values.push(_decodeIUpdateSessionWeightedEdgeWithCoordsRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // optional string sessionId = 4;
      case 4: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string imageBase64 = 5;
      case 5: {
        message.imageBase64 = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateWeightedGraphSessionRequestDTO {
  vertices?: UpdateOrDeleteSessionVertexPairRequestDTO[];
  edges?: UpdateSessionWeightedEdgeRequestDTO[];
  sessionId?: string;
  imageBase64?: string;
}

export function encodeUpdateWeightedGraphSessionRequestDTO(message: UpdateWeightedGraphSessionRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateWeightedGraphSessionRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateWeightedGraphSessionRequestDTO(message: UpdateWeightedGraphSessionRequestDTO, bb: ByteBuffer): void {
  // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
  let array$vertices = message.vertices;
  if (array$vertices !== undefined) {
    for (let value of array$vertices) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeUpdateOrDeleteSessionVertexPairRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated UpdateSessionWeightedEdgeRequestDTO edges = 3;
  let array$edges = message.edges;
  if (array$edges !== undefined) {
    for (let value of array$edges) {
      writeVarint32(bb, 26);
      let nested = popByteBuffer();
      _encodeUpdateSessionWeightedEdgeRequestDTO(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string sessionId = 4;
  let $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $sessionId);
  }

  // optional string imageBase64 = 5;
  let $imageBase64 = message.imageBase64;
  if ($imageBase64 !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $imageBase64);
  }
}

export function decodeUpdateWeightedGraphSessionRequestDTO(binary: Uint8Array): UpdateWeightedGraphSessionRequestDTO {
  return _decodeUpdateWeightedGraphSessionRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateWeightedGraphSessionRequestDTO(bb: ByteBuffer): UpdateWeightedGraphSessionRequestDTO {
  let message: UpdateWeightedGraphSessionRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated UpdateOrDeleteSessionVertexPairRequestDTO vertices = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.vertices || (message.vertices = []);
        values.push(_decodeUpdateOrDeleteSessionVertexPairRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // repeated UpdateSessionWeightedEdgeRequestDTO edges = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        let values = message.edges || (message.edges = []);
        values.push(_decodeUpdateSessionWeightedEdgeRequestDTO(bb));
        bb.limit = limit;
        break;
      }

      // optional string sessionId = 4;
      case 4: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string imageBase64 = 5;
      case 5: {
        message.imageBase64 = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateSessionEdgeRequestDTO {
  id?: number;
  updateType?: UPDATE_TYPE;
  edge?: EdgeBase;
}

export function encodeUpdateSessionEdgeRequestDTO(message: UpdateSessionEdgeRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateSessionEdgeRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateSessionEdgeRequestDTO(message: UpdateSessionEdgeRequestDTO, bb: ByteBuffer): void {
  // optional int32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($id));
  }

  // optional UPDATE_TYPE updateType = 2;
  let $updateType = message.updateType;
  if ($updateType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeUPDATE_TYPE[$updateType]);
  }

  // optional EdgeBase edge = 3;
  let $edge = message.edge;
  if ($edge !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeEdgeBase($edge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeUpdateSessionEdgeRequestDTO(binary: Uint8Array): UpdateSessionEdgeRequestDTO {
  return _decodeUpdateSessionEdgeRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateSessionEdgeRequestDTO(bb: ByteBuffer): UpdateSessionEdgeRequestDTO {
  let message: UpdateSessionEdgeRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 id = 1;
      case 1: {
        message.id = readVarint32(bb);
        break;
      }

      // optional UPDATE_TYPE updateType = 2;
      case 2: {
        message.updateType = decodeUPDATE_TYPE[readVarint32(bb)];
        break;
      }

      // optional EdgeBase edge = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.edge = _decodeEdgeBase(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateSessionEdgeCoordsRequestDTO {
  id?: number;
  updateType?: UPDATE_TYPE;
  edge?: EdgeWithCoords;
}

export function encodeUpdateSessionEdgeCoordsRequestDTO(message: UpdateSessionEdgeCoordsRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateSessionEdgeCoordsRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateSessionEdgeCoordsRequestDTO(message: UpdateSessionEdgeCoordsRequestDTO, bb: ByteBuffer): void {
  // optional int32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($id));
  }

  // optional UPDATE_TYPE updateType = 2;
  let $updateType = message.updateType;
  if ($updateType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeUPDATE_TYPE[$updateType]);
  }

  // optional EdgeWithCoords edge = 3;
  let $edge = message.edge;
  if ($edge !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeEdgeWithCoords($edge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeUpdateSessionEdgeCoordsRequestDTO(binary: Uint8Array): UpdateSessionEdgeCoordsRequestDTO {
  return _decodeUpdateSessionEdgeCoordsRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateSessionEdgeCoordsRequestDTO(bb: ByteBuffer): UpdateSessionEdgeCoordsRequestDTO {
  let message: UpdateSessionEdgeCoordsRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 id = 1;
      case 1: {
        message.id = readVarint32(bb);
        break;
      }

      // optional UPDATE_TYPE updateType = 2;
      case 2: {
        message.updateType = decodeUPDATE_TYPE[readVarint32(bb)];
        break;
      }

      // optional EdgeWithCoords edge = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.edge = _decodeEdgeWithCoords(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateSessionWeightedEdgeRequestDTO {
  id?: number;
  updateType?: UPDATE_TYPE;
  edge?: WeightedEdge;
}

export function encodeUpdateSessionWeightedEdgeRequestDTO(message: UpdateSessionWeightedEdgeRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateSessionWeightedEdgeRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateSessionWeightedEdgeRequestDTO(message: UpdateSessionWeightedEdgeRequestDTO, bb: ByteBuffer): void {
  // optional int32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($id));
  }

  // optional UPDATE_TYPE updateType = 2;
  let $updateType = message.updateType;
  if ($updateType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeUPDATE_TYPE[$updateType]);
  }

  // optional WeightedEdge edge = 3;
  let $edge = message.edge;
  if ($edge !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeWeightedEdge($edge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeUpdateSessionWeightedEdgeRequestDTO(binary: Uint8Array): UpdateSessionWeightedEdgeRequestDTO {
  return _decodeUpdateSessionWeightedEdgeRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateSessionWeightedEdgeRequestDTO(bb: ByteBuffer): UpdateSessionWeightedEdgeRequestDTO {
  let message: UpdateSessionWeightedEdgeRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 id = 1;
      case 1: {
        message.id = readVarint32(bb);
        break;
      }

      // optional UPDATE_TYPE updateType = 2;
      case 2: {
        message.updateType = decodeUPDATE_TYPE[readVarint32(bb)];
        break;
      }

      // optional WeightedEdge edge = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.edge = _decodeWeightedEdge(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateSessionWeightedEdgeWithCoordsRequestDTO {
  id?: number;
  updateType?: UPDATE_TYPE;
  edge?: WeightedEdgeWithCoords;
}

export function encodeUpdateSessionWeightedEdgeWithCoordsRequestDTO(message: UpdateSessionWeightedEdgeWithCoordsRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateSessionWeightedEdgeWithCoordsRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateSessionWeightedEdgeWithCoordsRequestDTO(message: UpdateSessionWeightedEdgeWithCoordsRequestDTO, bb: ByteBuffer): void {
  // optional int32 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($id));
  }

  // optional UPDATE_TYPE updateType = 2;
  let $updateType = message.updateType;
  if ($updateType !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeUPDATE_TYPE[$updateType]);
  }

  // optional WeightedEdgeWithCoords edge = 3;
  let $edge = message.edge;
  if ($edge !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeWeightedEdgeWithCoords($edge, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeUpdateSessionWeightedEdgeWithCoordsRequestDTO(binary: Uint8Array): UpdateSessionWeightedEdgeWithCoordsRequestDTO {
  return _decodeUpdateSessionWeightedEdgeWithCoordsRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateSessionWeightedEdgeWithCoordsRequestDTO(bb: ByteBuffer): UpdateSessionWeightedEdgeWithCoordsRequestDTO {
  let message: UpdateSessionWeightedEdgeWithCoordsRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 id = 1;
      case 1: {
        message.id = readVarint32(bb);
        break;
      }

      // optional UPDATE_TYPE updateType = 2;
      case 2: {
        message.updateType = decodeUPDATE_TYPE[readVarint32(bb)];
        break;
      }

      // optional WeightedEdgeWithCoords edge = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.edge = _decodeWeightedEdgeWithCoords(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface EdgeBase {
  index?: number;
  startVertex?: number;
  endVertex?: number;
  isShortest?: boolean;
}

export function encodeEdgeBase(message: EdgeBase): Uint8Array {
  let bb = popByteBuffer();
  _encodeEdgeBase(message, bb);
  return toUint8Array(bb);
}

function _encodeEdgeBase(message: EdgeBase, bb: ByteBuffer): void {
  // optional int32 index = 1;
  let $index = message.index;
  if ($index !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($index));
  }

  // optional int32 startVertex = 2;
  let $startVertex = message.startVertex;
  if ($startVertex !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($startVertex));
  }

  // optional int32 endVertex = 3;
  let $endVertex = message.endVertex;
  if ($endVertex !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($endVertex));
  }

  // optional bool isShortest = 4;
  let $isShortest = message.isShortest;
  if ($isShortest !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $isShortest ? 1 : 0);
  }
}

export function decodeEdgeBase(binary: Uint8Array): EdgeBase {
  return _decodeEdgeBase(wrapByteBuffer(binary));
}

function _decodeEdgeBase(bb: ByteBuffer): EdgeBase {
  let message: EdgeBase = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 index = 1;
      case 1: {
        message.index = readVarint32(bb);
        break;
      }

      // optional int32 startVertex = 2;
      case 2: {
        message.startVertex = readVarint32(bb);
        break;
      }

      // optional int32 endVertex = 3;
      case 3: {
        message.endVertex = readVarint32(bb);
        break;
      }

      // optional bool isShortest = 4;
      case 4: {
        message.isShortest = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface WeightedEdge {
  index?: number;
  startVertex?: number;
  endVertex?: number;
  isShortest?: boolean;
  weight?: number;
}

export function encodeWeightedEdge(message: WeightedEdge): Uint8Array {
  let bb = popByteBuffer();
  _encodeWeightedEdge(message, bb);
  return toUint8Array(bb);
}

function _encodeWeightedEdge(message: WeightedEdge, bb: ByteBuffer): void {
  // optional int32 index = 1;
  let $index = message.index;
  if ($index !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($index));
  }

  // optional int32 startVertex = 2;
  let $startVertex = message.startVertex;
  if ($startVertex !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($startVertex));
  }

  // optional int32 endVertex = 3;
  let $endVertex = message.endVertex;
  if ($endVertex !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($endVertex));
  }

  // optional bool isShortest = 4;
  let $isShortest = message.isShortest;
  if ($isShortest !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $isShortest ? 1 : 0);
  }

  // optional float weight = 5;
  let $weight = message.weight;
  if ($weight !== undefined) {
    writeVarint32(bb, 45);
    writeFloat(bb, $weight);
  }
}

export function decodeWeightedEdge(binary: Uint8Array): WeightedEdge {
  return _decodeWeightedEdge(wrapByteBuffer(binary));
}

function _decodeWeightedEdge(bb: ByteBuffer): WeightedEdge {
  let message: WeightedEdge = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 index = 1;
      case 1: {
        message.index = readVarint32(bb);
        break;
      }

      // optional int32 startVertex = 2;
      case 2: {
        message.startVertex = readVarint32(bb);
        break;
      }

      // optional int32 endVertex = 3;
      case 3: {
        message.endVertex = readVarint32(bb);
        break;
      }

      // optional bool isShortest = 4;
      case 4: {
        message.isShortest = !!readByte(bb);
        break;
      }

      // optional float weight = 5;
      case 5: {
        message.weight = readFloat(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface WeightedEdgeWithCoords {
  index?: number;
  startVertex?: number;
  endVertex?: number;
  isShortest?: boolean;
  weight?: number;
  top?: number;
  left?: number;
  angle?: number;
}

export function encodeWeightedEdgeWithCoords(message: WeightedEdgeWithCoords): Uint8Array {
  let bb = popByteBuffer();
  _encodeWeightedEdgeWithCoords(message, bb);
  return toUint8Array(bb);
}

function _encodeWeightedEdgeWithCoords(message: WeightedEdgeWithCoords, bb: ByteBuffer): void {
  // optional int32 index = 1;
  let $index = message.index;
  if ($index !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($index));
  }

  // optional int32 startVertex = 2;
  let $startVertex = message.startVertex;
  if ($startVertex !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($startVertex));
  }

  // optional int32 endVertex = 3;
  let $endVertex = message.endVertex;
  if ($endVertex !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($endVertex));
  }

  // optional bool isShortest = 4;
  let $isShortest = message.isShortest;
  if ($isShortest !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $isShortest ? 1 : 0);
  }

  // optional float weight = 5;
  let $weight = message.weight;
  if ($weight !== undefined) {
    writeVarint32(bb, 45);
    writeFloat(bb, $weight);
  }

  // optional float top = 6;
  let $top = message.top;
  if ($top !== undefined) {
    writeVarint32(bb, 53);
    writeFloat(bb, $top);
  }

  // optional float left = 7;
  let $left = message.left;
  if ($left !== undefined) {
    writeVarint32(bb, 61);
    writeFloat(bb, $left);
  }

  // optional float angle = 8;
  let $angle = message.angle;
  if ($angle !== undefined) {
    writeVarint32(bb, 69);
    writeFloat(bb, $angle);
  }
}

export function decodeWeightedEdgeWithCoords(binary: Uint8Array): WeightedEdgeWithCoords {
  return _decodeWeightedEdgeWithCoords(wrapByteBuffer(binary));
}

function _decodeWeightedEdgeWithCoords(bb: ByteBuffer): WeightedEdgeWithCoords {
  let message: WeightedEdgeWithCoords = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 index = 1;
      case 1: {
        message.index = readVarint32(bb);
        break;
      }

      // optional int32 startVertex = 2;
      case 2: {
        message.startVertex = readVarint32(bb);
        break;
      }

      // optional int32 endVertex = 3;
      case 3: {
        message.endVertex = readVarint32(bb);
        break;
      }

      // optional bool isShortest = 4;
      case 4: {
        message.isShortest = !!readByte(bb);
        break;
      }

      // optional float weight = 5;
      case 5: {
        message.weight = readFloat(bb);
        break;
      }

      // optional float top = 6;
      case 6: {
        message.top = readFloat(bb);
        break;
      }

      // optional float left = 7;
      case 7: {
        message.left = readFloat(bb);
        break;
      }

      // optional float angle = 8;
      case 8: {
        message.angle = readFloat(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface EdgeWithCoords {
  index?: number;
  startVertex?: number;
  endVertex?: number;
  isShortest?: boolean;
  top?: number;
  left?: number;
  angle?: number;
}

export function encodeEdgeWithCoords(message: EdgeWithCoords): Uint8Array {
  let bb = popByteBuffer();
  _encodeEdgeWithCoords(message, bb);
  return toUint8Array(bb);
}

function _encodeEdgeWithCoords(message: EdgeWithCoords, bb: ByteBuffer): void {
  // optional int32 index = 1;
  let $index = message.index;
  if ($index !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($index));
  }

  // optional int32 startVertex = 2;
  let $startVertex = message.startVertex;
  if ($startVertex !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($startVertex));
  }

  // optional int32 endVertex = 3;
  let $endVertex = message.endVertex;
  if ($endVertex !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($endVertex));
  }

  // optional bool isShortest = 4;
  let $isShortest = message.isShortest;
  if ($isShortest !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $isShortest ? 1 : 0);
  }

  // optional float top = 6;
  let $top = message.top;
  if ($top !== undefined) {
    writeVarint32(bb, 53);
    writeFloat(bb, $top);
  }

  // optional float left = 7;
  let $left = message.left;
  if ($left !== undefined) {
    writeVarint32(bb, 61);
    writeFloat(bb, $left);
  }

  // optional float angle = 8;
  let $angle = message.angle;
  if ($angle !== undefined) {
    writeVarint32(bb, 69);
    writeFloat(bb, $angle);
  }
}

export function decodeEdgeWithCoords(binary: Uint8Array): EdgeWithCoords {
  return _decodeEdgeWithCoords(wrapByteBuffer(binary));
}

function _decodeEdgeWithCoords(bb: ByteBuffer): EdgeWithCoords {
  let message: EdgeWithCoords = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 index = 1;
      case 1: {
        message.index = readVarint32(bb);
        break;
      }

      // optional int32 startVertex = 2;
      case 2: {
        message.startVertex = readVarint32(bb);
        break;
      }

      // optional int32 endVertex = 3;
      case 3: {
        message.endVertex = readVarint32(bb);
        break;
      }

      // optional bool isShortest = 4;
      case 4: {
        message.isShortest = !!readByte(bb);
        break;
      }

      // optional float top = 6;
      case 6: {
        message.top = readFloat(bb);
        break;
      }

      // optional float left = 7;
      case 7: {
        message.left = readFloat(bb);
        break;
      }

      // optional float angle = 8;
      case 8: {
        message.angle = readFloat(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UpdateOrDeleteSessionVertexPairRequestDTO {
  updateType?: UPDATE_TYPE;
  id?: number;
  vertex?: VertexPair;
}

export function encodeUpdateOrDeleteSessionVertexPairRequestDTO(message: UpdateOrDeleteSessionVertexPairRequestDTO): Uint8Array {
  let bb = popByteBuffer();
  _encodeUpdateOrDeleteSessionVertexPairRequestDTO(message, bb);
  return toUint8Array(bb);
}

function _encodeUpdateOrDeleteSessionVertexPairRequestDTO(message: UpdateOrDeleteSessionVertexPairRequestDTO, bb: ByteBuffer): void {
  // optional UPDATE_TYPE updateType = 1;
  let $updateType = message.updateType;
  if ($updateType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, encodeUPDATE_TYPE[$updateType]);
  }

  // optional int32 id = 2;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($id));
  }

  // optional VertexPair vertex = 3;
  let $vertex = message.vertex;
  if ($vertex !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeVertexPair($vertex, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeUpdateOrDeleteSessionVertexPairRequestDTO(binary: Uint8Array): UpdateOrDeleteSessionVertexPairRequestDTO {
  return _decodeUpdateOrDeleteSessionVertexPairRequestDTO(wrapByteBuffer(binary));
}

function _decodeUpdateOrDeleteSessionVertexPairRequestDTO(bb: ByteBuffer): UpdateOrDeleteSessionVertexPairRequestDTO {
  let message: UpdateOrDeleteSessionVertexPairRequestDTO = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional UPDATE_TYPE updateType = 1;
      case 1: {
        message.updateType = decodeUPDATE_TYPE[readVarint32(bb)];
        break;
      }

      // optional int32 id = 2;
      case 2: {
        message.id = readVarint32(bb);
        break;
      }

      // optional VertexPair vertex = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.vertex = _decodeVertexPair(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface VertexPair {
  pair?: number[];
}

export function encodeVertexPair(message: VertexPair): Uint8Array {
  let bb = popByteBuffer();
  _encodeVertexPair(message, bb);
  return toUint8Array(bb);
}

function _encodeVertexPair(message: VertexPair, bb: ByteBuffer): void {
  // repeated int32 pair = 1;
  let array$pair = message.pair;
  if (array$pair !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$pair) {
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 10);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
}

export function decodeVertexPair(binary: Uint8Array): VertexPair {
  return _decodeVertexPair(wrapByteBuffer(binary));
}

function _decodeVertexPair(bb: ByteBuffer): VertexPair {
  let message: VertexPair = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated int32 pair = 1;
      case 1: {
        let values = message.pair || (message.pair = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}

interface ByteBuffer {
  bytes: Uint8Array;
  offset: number;
  limit: number;
}

function pushTemporaryLength(bb: ByteBuffer): number {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb: ByteBuffer, type: number): void {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value: string): Long {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value: Long): string {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value: number): Long {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack: ByteBuffer[] = [];

function popByteBuffer(): ByteBuffer {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb: ByteBuffer): void {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes: Uint8Array): ByteBuffer {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb: ByteBuffer): Uint8Array {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb: ByteBuffer, offset: number): void {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb: ByteBuffer): boolean {
  return bb.offset >= bb.limit;
}

function grow(bb: ByteBuffer, count: number): number {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb: ByteBuffer, count: number): number {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb: ByteBuffer, count: number): Uint8Array {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb: ByteBuffer, buffer: Uint8Array): void {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb: ByteBuffer, count: number): string {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2: number, c3: number, c4: number, c: number;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb: ByteBuffer, text: string): void {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb: ByteBuffer, buffer: ByteBuffer): void {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb: ByteBuffer): number {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb: ByteBuffer): number {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb: ByteBuffer, unsigned: boolean): Long {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb: ByteBuffer, value: Long): void {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb: ByteBuffer): number {
  let c = 0;
  let value = 0;
  let b: number;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb: ByteBuffer, value: number): void {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb: ByteBuffer, unsigned: boolean): Long {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b: number;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb: ByteBuffer, value: Long): void {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb: ByteBuffer): number {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb: ByteBuffer, value: number): void {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb: ByteBuffer): Long {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb: ByteBuffer, value: Long): void {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
