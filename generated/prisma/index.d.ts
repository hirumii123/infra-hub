
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model EmailQueue
 * 
 */
export type EmailQueue = $Result.DefaultSelection<Prisma.$EmailQueuePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model WhatsappLog
 * 
 */
export type WhatsappLog = $Result.DefaultSelection<Prisma.$WhatsappLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more EmailQueues
 * const emailQueues = await prisma.emailQueue.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more EmailQueues
   * const emailQueues = await prisma.emailQueue.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.emailQueue`: Exposes CRUD operations for the **EmailQueue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailQueues
    * const emailQueues = await prisma.emailQueue.findMany()
    * ```
    */
  get emailQueue(): Prisma.EmailQueueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.whatsappLog`: Exposes CRUD operations for the **WhatsappLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WhatsappLogs
    * const whatsappLogs = await prisma.whatsappLog.findMany()
    * ```
    */
  get whatsappLog(): Prisma.WhatsappLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    EmailQueue: 'EmailQueue',
    User: 'User',
    WhatsappLog: 'WhatsappLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "emailQueue" | "user" | "whatsappLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      EmailQueue: {
        payload: Prisma.$EmailQueuePayload<ExtArgs>
        fields: Prisma.EmailQueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailQueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailQueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload>
          }
          findFirst: {
            args: Prisma.EmailQueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailQueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload>
          }
          findMany: {
            args: Prisma.EmailQueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload>[]
          }
          create: {
            args: Prisma.EmailQueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload>
          }
          createMany: {
            args: Prisma.EmailQueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailQueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload>[]
          }
          delete: {
            args: Prisma.EmailQueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload>
          }
          update: {
            args: Prisma.EmailQueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload>
          }
          deleteMany: {
            args: Prisma.EmailQueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailQueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailQueueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload>[]
          }
          upsert: {
            args: Prisma.EmailQueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailQueuePayload>
          }
          aggregate: {
            args: Prisma.EmailQueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailQueue>
          }
          groupBy: {
            args: Prisma.EmailQueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailQueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailQueueCountArgs<ExtArgs>
            result: $Utils.Optional<EmailQueueCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      WhatsappLog: {
        payload: Prisma.$WhatsappLogPayload<ExtArgs>
        fields: Prisma.WhatsappLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WhatsappLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WhatsappLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload>
          }
          findFirst: {
            args: Prisma.WhatsappLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WhatsappLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload>
          }
          findMany: {
            args: Prisma.WhatsappLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload>[]
          }
          create: {
            args: Prisma.WhatsappLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload>
          }
          createMany: {
            args: Prisma.WhatsappLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WhatsappLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload>[]
          }
          delete: {
            args: Prisma.WhatsappLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload>
          }
          update: {
            args: Prisma.WhatsappLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload>
          }
          deleteMany: {
            args: Prisma.WhatsappLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WhatsappLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WhatsappLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload>[]
          }
          upsert: {
            args: Prisma.WhatsappLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WhatsappLogPayload>
          }
          aggregate: {
            args: Prisma.WhatsappLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWhatsappLog>
          }
          groupBy: {
            args: Prisma.WhatsappLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WhatsappLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WhatsappLogCountArgs<ExtArgs>
            result: $Utils.Optional<WhatsappLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    emailQueue?: EmailQueueOmit
    user?: UserOmit
    whatsappLog?: WhatsappLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model EmailQueue
   */

  export type AggregateEmailQueue = {
    _count: EmailQueueCountAggregateOutputType | null
    _avg: EmailQueueAvgAggregateOutputType | null
    _sum: EmailQueueSumAggregateOutputType | null
    _min: EmailQueueMinAggregateOutputType | null
    _max: EmailQueueMaxAggregateOutputType | null
  }

  export type EmailQueueAvgAggregateOutputType = {
    id: number | null
  }

  export type EmailQueueSumAggregateOutputType = {
    id: number | null
  }

  export type EmailQueueMinAggregateOutputType = {
    id: number | null
    to: string | null
    subject: string | null
    body: string | null
    bulan: string | null
    tahun: string | null
    sendAt: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type EmailQueueMaxAggregateOutputType = {
    id: number | null
    to: string | null
    subject: string | null
    body: string | null
    bulan: string | null
    tahun: string | null
    sendAt: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type EmailQueueCountAggregateOutputType = {
    id: number
    to: number
    subject: number
    body: number
    bulan: number
    tahun: number
    sendAt: number
    status: number
    createdAt: number
    _all: number
  }


  export type EmailQueueAvgAggregateInputType = {
    id?: true
  }

  export type EmailQueueSumAggregateInputType = {
    id?: true
  }

  export type EmailQueueMinAggregateInputType = {
    id?: true
    to?: true
    subject?: true
    body?: true
    bulan?: true
    tahun?: true
    sendAt?: true
    status?: true
    createdAt?: true
  }

  export type EmailQueueMaxAggregateInputType = {
    id?: true
    to?: true
    subject?: true
    body?: true
    bulan?: true
    tahun?: true
    sendAt?: true
    status?: true
    createdAt?: true
  }

  export type EmailQueueCountAggregateInputType = {
    id?: true
    to?: true
    subject?: true
    body?: true
    bulan?: true
    tahun?: true
    sendAt?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type EmailQueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailQueue to aggregate.
     */
    where?: EmailQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailQueues to fetch.
     */
    orderBy?: EmailQueueOrderByWithRelationInput | EmailQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailQueues
    **/
    _count?: true | EmailQueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailQueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailQueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailQueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailQueueMaxAggregateInputType
  }

  export type GetEmailQueueAggregateType<T extends EmailQueueAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailQueue[P]>
      : GetScalarType<T[P], AggregateEmailQueue[P]>
  }




  export type EmailQueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailQueueWhereInput
    orderBy?: EmailQueueOrderByWithAggregationInput | EmailQueueOrderByWithAggregationInput[]
    by: EmailQueueScalarFieldEnum[] | EmailQueueScalarFieldEnum
    having?: EmailQueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailQueueCountAggregateInputType | true
    _avg?: EmailQueueAvgAggregateInputType
    _sum?: EmailQueueSumAggregateInputType
    _min?: EmailQueueMinAggregateInputType
    _max?: EmailQueueMaxAggregateInputType
  }

  export type EmailQueueGroupByOutputType = {
    id: number
    to: string
    subject: string
    body: string
    bulan: string
    tahun: string
    sendAt: Date
    status: string
    createdAt: Date
    _count: EmailQueueCountAggregateOutputType | null
    _avg: EmailQueueAvgAggregateOutputType | null
    _sum: EmailQueueSumAggregateOutputType | null
    _min: EmailQueueMinAggregateOutputType | null
    _max: EmailQueueMaxAggregateOutputType | null
  }

  type GetEmailQueueGroupByPayload<T extends EmailQueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailQueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailQueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailQueueGroupByOutputType[P]>
            : GetScalarType<T[P], EmailQueueGroupByOutputType[P]>
        }
      >
    >


  export type EmailQueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    to?: boolean
    subject?: boolean
    body?: boolean
    bulan?: boolean
    tahun?: boolean
    sendAt?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["emailQueue"]>

  export type EmailQueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    to?: boolean
    subject?: boolean
    body?: boolean
    bulan?: boolean
    tahun?: boolean
    sendAt?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["emailQueue"]>

  export type EmailQueueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    to?: boolean
    subject?: boolean
    body?: boolean
    bulan?: boolean
    tahun?: boolean
    sendAt?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["emailQueue"]>

  export type EmailQueueSelectScalar = {
    id?: boolean
    to?: boolean
    subject?: boolean
    body?: boolean
    bulan?: boolean
    tahun?: boolean
    sendAt?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type EmailQueueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "to" | "subject" | "body" | "bulan" | "tahun" | "sendAt" | "status" | "createdAt", ExtArgs["result"]["emailQueue"]>

  export type $EmailQueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailQueue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      to: string
      subject: string
      body: string
      bulan: string
      tahun: string
      sendAt: Date
      status: string
      createdAt: Date
    }, ExtArgs["result"]["emailQueue"]>
    composites: {}
  }

  type EmailQueueGetPayload<S extends boolean | null | undefined | EmailQueueDefaultArgs> = $Result.GetResult<Prisma.$EmailQueuePayload, S>

  type EmailQueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailQueueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailQueueCountAggregateInputType | true
    }

  export interface EmailQueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailQueue'], meta: { name: 'EmailQueue' } }
    /**
     * Find zero or one EmailQueue that matches the filter.
     * @param {EmailQueueFindUniqueArgs} args - Arguments to find a EmailQueue
     * @example
     * // Get one EmailQueue
     * const emailQueue = await prisma.emailQueue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailQueueFindUniqueArgs>(args: SelectSubset<T, EmailQueueFindUniqueArgs<ExtArgs>>): Prisma__EmailQueueClient<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailQueue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailQueueFindUniqueOrThrowArgs} args - Arguments to find a EmailQueue
     * @example
     * // Get one EmailQueue
     * const emailQueue = await prisma.emailQueue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailQueueFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailQueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailQueueClient<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailQueue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailQueueFindFirstArgs} args - Arguments to find a EmailQueue
     * @example
     * // Get one EmailQueue
     * const emailQueue = await prisma.emailQueue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailQueueFindFirstArgs>(args?: SelectSubset<T, EmailQueueFindFirstArgs<ExtArgs>>): Prisma__EmailQueueClient<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailQueue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailQueueFindFirstOrThrowArgs} args - Arguments to find a EmailQueue
     * @example
     * // Get one EmailQueue
     * const emailQueue = await prisma.emailQueue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailQueueFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailQueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailQueueClient<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailQueues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailQueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailQueues
     * const emailQueues = await prisma.emailQueue.findMany()
     * 
     * // Get first 10 EmailQueues
     * const emailQueues = await prisma.emailQueue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailQueueWithIdOnly = await prisma.emailQueue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailQueueFindManyArgs>(args?: SelectSubset<T, EmailQueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailQueue.
     * @param {EmailQueueCreateArgs} args - Arguments to create a EmailQueue.
     * @example
     * // Create one EmailQueue
     * const EmailQueue = await prisma.emailQueue.create({
     *   data: {
     *     // ... data to create a EmailQueue
     *   }
     * })
     * 
     */
    create<T extends EmailQueueCreateArgs>(args: SelectSubset<T, EmailQueueCreateArgs<ExtArgs>>): Prisma__EmailQueueClient<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailQueues.
     * @param {EmailQueueCreateManyArgs} args - Arguments to create many EmailQueues.
     * @example
     * // Create many EmailQueues
     * const emailQueue = await prisma.emailQueue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailQueueCreateManyArgs>(args?: SelectSubset<T, EmailQueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailQueues and returns the data saved in the database.
     * @param {EmailQueueCreateManyAndReturnArgs} args - Arguments to create many EmailQueues.
     * @example
     * // Create many EmailQueues
     * const emailQueue = await prisma.emailQueue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailQueues and only return the `id`
     * const emailQueueWithIdOnly = await prisma.emailQueue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailQueueCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailQueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailQueue.
     * @param {EmailQueueDeleteArgs} args - Arguments to delete one EmailQueue.
     * @example
     * // Delete one EmailQueue
     * const EmailQueue = await prisma.emailQueue.delete({
     *   where: {
     *     // ... filter to delete one EmailQueue
     *   }
     * })
     * 
     */
    delete<T extends EmailQueueDeleteArgs>(args: SelectSubset<T, EmailQueueDeleteArgs<ExtArgs>>): Prisma__EmailQueueClient<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailQueue.
     * @param {EmailQueueUpdateArgs} args - Arguments to update one EmailQueue.
     * @example
     * // Update one EmailQueue
     * const emailQueue = await prisma.emailQueue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailQueueUpdateArgs>(args: SelectSubset<T, EmailQueueUpdateArgs<ExtArgs>>): Prisma__EmailQueueClient<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailQueues.
     * @param {EmailQueueDeleteManyArgs} args - Arguments to filter EmailQueues to delete.
     * @example
     * // Delete a few EmailQueues
     * const { count } = await prisma.emailQueue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailQueueDeleteManyArgs>(args?: SelectSubset<T, EmailQueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailQueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailQueues
     * const emailQueue = await prisma.emailQueue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailQueueUpdateManyArgs>(args: SelectSubset<T, EmailQueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailQueues and returns the data updated in the database.
     * @param {EmailQueueUpdateManyAndReturnArgs} args - Arguments to update many EmailQueues.
     * @example
     * // Update many EmailQueues
     * const emailQueue = await prisma.emailQueue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailQueues and only return the `id`
     * const emailQueueWithIdOnly = await prisma.emailQueue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailQueueUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailQueueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailQueue.
     * @param {EmailQueueUpsertArgs} args - Arguments to update or create a EmailQueue.
     * @example
     * // Update or create a EmailQueue
     * const emailQueue = await prisma.emailQueue.upsert({
     *   create: {
     *     // ... data to create a EmailQueue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailQueue we want to update
     *   }
     * })
     */
    upsert<T extends EmailQueueUpsertArgs>(args: SelectSubset<T, EmailQueueUpsertArgs<ExtArgs>>): Prisma__EmailQueueClient<$Result.GetResult<Prisma.$EmailQueuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailQueueCountArgs} args - Arguments to filter EmailQueues to count.
     * @example
     * // Count the number of EmailQueues
     * const count = await prisma.emailQueue.count({
     *   where: {
     *     // ... the filter for the EmailQueues we want to count
     *   }
     * })
    **/
    count<T extends EmailQueueCountArgs>(
      args?: Subset<T, EmailQueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailQueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailQueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailQueueAggregateArgs>(args: Subset<T, EmailQueueAggregateArgs>): Prisma.PrismaPromise<GetEmailQueueAggregateType<T>>

    /**
     * Group by EmailQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailQueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailQueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailQueueGroupByArgs['orderBy'] }
        : { orderBy?: EmailQueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailQueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailQueue model
   */
  readonly fields: EmailQueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailQueue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailQueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailQueue model
   */
  interface EmailQueueFieldRefs {
    readonly id: FieldRef<"EmailQueue", 'Int'>
    readonly to: FieldRef<"EmailQueue", 'String'>
    readonly subject: FieldRef<"EmailQueue", 'String'>
    readonly body: FieldRef<"EmailQueue", 'String'>
    readonly bulan: FieldRef<"EmailQueue", 'String'>
    readonly tahun: FieldRef<"EmailQueue", 'String'>
    readonly sendAt: FieldRef<"EmailQueue", 'DateTime'>
    readonly status: FieldRef<"EmailQueue", 'String'>
    readonly createdAt: FieldRef<"EmailQueue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailQueue findUnique
   */
  export type EmailQueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * Filter, which EmailQueue to fetch.
     */
    where: EmailQueueWhereUniqueInput
  }

  /**
   * EmailQueue findUniqueOrThrow
   */
  export type EmailQueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * Filter, which EmailQueue to fetch.
     */
    where: EmailQueueWhereUniqueInput
  }

  /**
   * EmailQueue findFirst
   */
  export type EmailQueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * Filter, which EmailQueue to fetch.
     */
    where?: EmailQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailQueues to fetch.
     */
    orderBy?: EmailQueueOrderByWithRelationInput | EmailQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailQueues.
     */
    cursor?: EmailQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailQueues.
     */
    distinct?: EmailQueueScalarFieldEnum | EmailQueueScalarFieldEnum[]
  }

  /**
   * EmailQueue findFirstOrThrow
   */
  export type EmailQueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * Filter, which EmailQueue to fetch.
     */
    where?: EmailQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailQueues to fetch.
     */
    orderBy?: EmailQueueOrderByWithRelationInput | EmailQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailQueues.
     */
    cursor?: EmailQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailQueues.
     */
    distinct?: EmailQueueScalarFieldEnum | EmailQueueScalarFieldEnum[]
  }

  /**
   * EmailQueue findMany
   */
  export type EmailQueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * Filter, which EmailQueues to fetch.
     */
    where?: EmailQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailQueues to fetch.
     */
    orderBy?: EmailQueueOrderByWithRelationInput | EmailQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailQueues.
     */
    cursor?: EmailQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailQueues.
     */
    skip?: number
    distinct?: EmailQueueScalarFieldEnum | EmailQueueScalarFieldEnum[]
  }

  /**
   * EmailQueue create
   */
  export type EmailQueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * The data needed to create a EmailQueue.
     */
    data: XOR<EmailQueueCreateInput, EmailQueueUncheckedCreateInput>
  }

  /**
   * EmailQueue createMany
   */
  export type EmailQueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailQueues.
     */
    data: EmailQueueCreateManyInput | EmailQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailQueue createManyAndReturn
   */
  export type EmailQueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * The data used to create many EmailQueues.
     */
    data: EmailQueueCreateManyInput | EmailQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailQueue update
   */
  export type EmailQueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * The data needed to update a EmailQueue.
     */
    data: XOR<EmailQueueUpdateInput, EmailQueueUncheckedUpdateInput>
    /**
     * Choose, which EmailQueue to update.
     */
    where: EmailQueueWhereUniqueInput
  }

  /**
   * EmailQueue updateMany
   */
  export type EmailQueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailQueues.
     */
    data: XOR<EmailQueueUpdateManyMutationInput, EmailQueueUncheckedUpdateManyInput>
    /**
     * Filter which EmailQueues to update
     */
    where?: EmailQueueWhereInput
    /**
     * Limit how many EmailQueues to update.
     */
    limit?: number
  }

  /**
   * EmailQueue updateManyAndReturn
   */
  export type EmailQueueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * The data used to update EmailQueues.
     */
    data: XOR<EmailQueueUpdateManyMutationInput, EmailQueueUncheckedUpdateManyInput>
    /**
     * Filter which EmailQueues to update
     */
    where?: EmailQueueWhereInput
    /**
     * Limit how many EmailQueues to update.
     */
    limit?: number
  }

  /**
   * EmailQueue upsert
   */
  export type EmailQueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * The filter to search for the EmailQueue to update in case it exists.
     */
    where: EmailQueueWhereUniqueInput
    /**
     * In case the EmailQueue found by the `where` argument doesn't exist, create a new EmailQueue with this data.
     */
    create: XOR<EmailQueueCreateInput, EmailQueueUncheckedCreateInput>
    /**
     * In case the EmailQueue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailQueueUpdateInput, EmailQueueUncheckedUpdateInput>
  }

  /**
   * EmailQueue delete
   */
  export type EmailQueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
    /**
     * Filter which EmailQueue to delete.
     */
    where: EmailQueueWhereUniqueInput
  }

  /**
   * EmailQueue deleteMany
   */
  export type EmailQueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailQueues to delete
     */
    where?: EmailQueueWhereInput
    /**
     * Limit how many EmailQueues to delete.
     */
    limit?: number
  }

  /**
   * EmailQueue without action
   */
  export type EmailQueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailQueue
     */
    select?: EmailQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailQueue
     */
    omit?: EmailQueueOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string | null
    password: string
    role: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "role" | "createdAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string | null
      password: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model WhatsappLog
   */

  export type AggregateWhatsappLog = {
    _count: WhatsappLogCountAggregateOutputType | null
    _avg: WhatsappLogAvgAggregateOutputType | null
    _sum: WhatsappLogSumAggregateOutputType | null
    _min: WhatsappLogMinAggregateOutputType | null
    _max: WhatsappLogMaxAggregateOutputType | null
  }

  export type WhatsappLogAvgAggregateOutputType = {
    id: number | null
  }

  export type WhatsappLogSumAggregateOutputType = {
    id: number | null
  }

  export type WhatsappLogMinAggregateOutputType = {
    id: number | null
    target: string | null
    message: string | null
    status: string | null
    sendAt: Date | null
    createdAt: Date | null
  }

  export type WhatsappLogMaxAggregateOutputType = {
    id: number | null
    target: string | null
    message: string | null
    status: string | null
    sendAt: Date | null
    createdAt: Date | null
  }

  export type WhatsappLogCountAggregateOutputType = {
    id: number
    target: number
    message: number
    status: number
    sendAt: number
    createdAt: number
    _all: number
  }


  export type WhatsappLogAvgAggregateInputType = {
    id?: true
  }

  export type WhatsappLogSumAggregateInputType = {
    id?: true
  }

  export type WhatsappLogMinAggregateInputType = {
    id?: true
    target?: true
    message?: true
    status?: true
    sendAt?: true
    createdAt?: true
  }

  export type WhatsappLogMaxAggregateInputType = {
    id?: true
    target?: true
    message?: true
    status?: true
    sendAt?: true
    createdAt?: true
  }

  export type WhatsappLogCountAggregateInputType = {
    id?: true
    target?: true
    message?: true
    status?: true
    sendAt?: true
    createdAt?: true
    _all?: true
  }

  export type WhatsappLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WhatsappLog to aggregate.
     */
    where?: WhatsappLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappLogs to fetch.
     */
    orderBy?: WhatsappLogOrderByWithRelationInput | WhatsappLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WhatsappLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WhatsappLogs
    **/
    _count?: true | WhatsappLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WhatsappLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WhatsappLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WhatsappLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WhatsappLogMaxAggregateInputType
  }

  export type GetWhatsappLogAggregateType<T extends WhatsappLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWhatsappLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWhatsappLog[P]>
      : GetScalarType<T[P], AggregateWhatsappLog[P]>
  }




  export type WhatsappLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WhatsappLogWhereInput
    orderBy?: WhatsappLogOrderByWithAggregationInput | WhatsappLogOrderByWithAggregationInput[]
    by: WhatsappLogScalarFieldEnum[] | WhatsappLogScalarFieldEnum
    having?: WhatsappLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WhatsappLogCountAggregateInputType | true
    _avg?: WhatsappLogAvgAggregateInputType
    _sum?: WhatsappLogSumAggregateInputType
    _min?: WhatsappLogMinAggregateInputType
    _max?: WhatsappLogMaxAggregateInputType
  }

  export type WhatsappLogGroupByOutputType = {
    id: number
    target: string
    message: string
    status: string
    sendAt: Date
    createdAt: Date
    _count: WhatsappLogCountAggregateOutputType | null
    _avg: WhatsappLogAvgAggregateOutputType | null
    _sum: WhatsappLogSumAggregateOutputType | null
    _min: WhatsappLogMinAggregateOutputType | null
    _max: WhatsappLogMaxAggregateOutputType | null
  }

  type GetWhatsappLogGroupByPayload<T extends WhatsappLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WhatsappLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WhatsappLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WhatsappLogGroupByOutputType[P]>
            : GetScalarType<T[P], WhatsappLogGroupByOutputType[P]>
        }
      >
    >


  export type WhatsappLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target?: boolean
    message?: boolean
    status?: boolean
    sendAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["whatsappLog"]>

  export type WhatsappLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target?: boolean
    message?: boolean
    status?: boolean
    sendAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["whatsappLog"]>

  export type WhatsappLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target?: boolean
    message?: boolean
    status?: boolean
    sendAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["whatsappLog"]>

  export type WhatsappLogSelectScalar = {
    id?: boolean
    target?: boolean
    message?: boolean
    status?: boolean
    sendAt?: boolean
    createdAt?: boolean
  }

  export type WhatsappLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "target" | "message" | "status" | "sendAt" | "createdAt", ExtArgs["result"]["whatsappLog"]>

  export type $WhatsappLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WhatsappLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      target: string
      message: string
      status: string
      sendAt: Date
      createdAt: Date
    }, ExtArgs["result"]["whatsappLog"]>
    composites: {}
  }

  type WhatsappLogGetPayload<S extends boolean | null | undefined | WhatsappLogDefaultArgs> = $Result.GetResult<Prisma.$WhatsappLogPayload, S>

  type WhatsappLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WhatsappLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WhatsappLogCountAggregateInputType | true
    }

  export interface WhatsappLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WhatsappLog'], meta: { name: 'WhatsappLog' } }
    /**
     * Find zero or one WhatsappLog that matches the filter.
     * @param {WhatsappLogFindUniqueArgs} args - Arguments to find a WhatsappLog
     * @example
     * // Get one WhatsappLog
     * const whatsappLog = await prisma.whatsappLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WhatsappLogFindUniqueArgs>(args: SelectSubset<T, WhatsappLogFindUniqueArgs<ExtArgs>>): Prisma__WhatsappLogClient<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WhatsappLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WhatsappLogFindUniqueOrThrowArgs} args - Arguments to find a WhatsappLog
     * @example
     * // Get one WhatsappLog
     * const whatsappLog = await prisma.whatsappLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WhatsappLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WhatsappLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WhatsappLogClient<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WhatsappLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappLogFindFirstArgs} args - Arguments to find a WhatsappLog
     * @example
     * // Get one WhatsappLog
     * const whatsappLog = await prisma.whatsappLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WhatsappLogFindFirstArgs>(args?: SelectSubset<T, WhatsappLogFindFirstArgs<ExtArgs>>): Prisma__WhatsappLogClient<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WhatsappLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappLogFindFirstOrThrowArgs} args - Arguments to find a WhatsappLog
     * @example
     * // Get one WhatsappLog
     * const whatsappLog = await prisma.whatsappLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WhatsappLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WhatsappLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WhatsappLogClient<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WhatsappLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WhatsappLogs
     * const whatsappLogs = await prisma.whatsappLog.findMany()
     * 
     * // Get first 10 WhatsappLogs
     * const whatsappLogs = await prisma.whatsappLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const whatsappLogWithIdOnly = await prisma.whatsappLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WhatsappLogFindManyArgs>(args?: SelectSubset<T, WhatsappLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WhatsappLog.
     * @param {WhatsappLogCreateArgs} args - Arguments to create a WhatsappLog.
     * @example
     * // Create one WhatsappLog
     * const WhatsappLog = await prisma.whatsappLog.create({
     *   data: {
     *     // ... data to create a WhatsappLog
     *   }
     * })
     * 
     */
    create<T extends WhatsappLogCreateArgs>(args: SelectSubset<T, WhatsappLogCreateArgs<ExtArgs>>): Prisma__WhatsappLogClient<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WhatsappLogs.
     * @param {WhatsappLogCreateManyArgs} args - Arguments to create many WhatsappLogs.
     * @example
     * // Create many WhatsappLogs
     * const whatsappLog = await prisma.whatsappLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WhatsappLogCreateManyArgs>(args?: SelectSubset<T, WhatsappLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WhatsappLogs and returns the data saved in the database.
     * @param {WhatsappLogCreateManyAndReturnArgs} args - Arguments to create many WhatsappLogs.
     * @example
     * // Create many WhatsappLogs
     * const whatsappLog = await prisma.whatsappLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WhatsappLogs and only return the `id`
     * const whatsappLogWithIdOnly = await prisma.whatsappLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WhatsappLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WhatsappLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WhatsappLog.
     * @param {WhatsappLogDeleteArgs} args - Arguments to delete one WhatsappLog.
     * @example
     * // Delete one WhatsappLog
     * const WhatsappLog = await prisma.whatsappLog.delete({
     *   where: {
     *     // ... filter to delete one WhatsappLog
     *   }
     * })
     * 
     */
    delete<T extends WhatsappLogDeleteArgs>(args: SelectSubset<T, WhatsappLogDeleteArgs<ExtArgs>>): Prisma__WhatsappLogClient<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WhatsappLog.
     * @param {WhatsappLogUpdateArgs} args - Arguments to update one WhatsappLog.
     * @example
     * // Update one WhatsappLog
     * const whatsappLog = await prisma.whatsappLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WhatsappLogUpdateArgs>(args: SelectSubset<T, WhatsappLogUpdateArgs<ExtArgs>>): Prisma__WhatsappLogClient<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WhatsappLogs.
     * @param {WhatsappLogDeleteManyArgs} args - Arguments to filter WhatsappLogs to delete.
     * @example
     * // Delete a few WhatsappLogs
     * const { count } = await prisma.whatsappLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WhatsappLogDeleteManyArgs>(args?: SelectSubset<T, WhatsappLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WhatsappLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WhatsappLogs
     * const whatsappLog = await prisma.whatsappLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WhatsappLogUpdateManyArgs>(args: SelectSubset<T, WhatsappLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WhatsappLogs and returns the data updated in the database.
     * @param {WhatsappLogUpdateManyAndReturnArgs} args - Arguments to update many WhatsappLogs.
     * @example
     * // Update many WhatsappLogs
     * const whatsappLog = await prisma.whatsappLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WhatsappLogs and only return the `id`
     * const whatsappLogWithIdOnly = await prisma.whatsappLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WhatsappLogUpdateManyAndReturnArgs>(args: SelectSubset<T, WhatsappLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WhatsappLog.
     * @param {WhatsappLogUpsertArgs} args - Arguments to update or create a WhatsappLog.
     * @example
     * // Update or create a WhatsappLog
     * const whatsappLog = await prisma.whatsappLog.upsert({
     *   create: {
     *     // ... data to create a WhatsappLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WhatsappLog we want to update
     *   }
     * })
     */
    upsert<T extends WhatsappLogUpsertArgs>(args: SelectSubset<T, WhatsappLogUpsertArgs<ExtArgs>>): Prisma__WhatsappLogClient<$Result.GetResult<Prisma.$WhatsappLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WhatsappLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappLogCountArgs} args - Arguments to filter WhatsappLogs to count.
     * @example
     * // Count the number of WhatsappLogs
     * const count = await prisma.whatsappLog.count({
     *   where: {
     *     // ... the filter for the WhatsappLogs we want to count
     *   }
     * })
    **/
    count<T extends WhatsappLogCountArgs>(
      args?: Subset<T, WhatsappLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WhatsappLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WhatsappLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WhatsappLogAggregateArgs>(args: Subset<T, WhatsappLogAggregateArgs>): Prisma.PrismaPromise<GetWhatsappLogAggregateType<T>>

    /**
     * Group by WhatsappLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhatsappLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WhatsappLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WhatsappLogGroupByArgs['orderBy'] }
        : { orderBy?: WhatsappLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WhatsappLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWhatsappLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WhatsappLog model
   */
  readonly fields: WhatsappLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WhatsappLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WhatsappLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WhatsappLog model
   */
  interface WhatsappLogFieldRefs {
    readonly id: FieldRef<"WhatsappLog", 'Int'>
    readonly target: FieldRef<"WhatsappLog", 'String'>
    readonly message: FieldRef<"WhatsappLog", 'String'>
    readonly status: FieldRef<"WhatsappLog", 'String'>
    readonly sendAt: FieldRef<"WhatsappLog", 'DateTime'>
    readonly createdAt: FieldRef<"WhatsappLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WhatsappLog findUnique
   */
  export type WhatsappLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * Filter, which WhatsappLog to fetch.
     */
    where: WhatsappLogWhereUniqueInput
  }

  /**
   * WhatsappLog findUniqueOrThrow
   */
  export type WhatsappLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * Filter, which WhatsappLog to fetch.
     */
    where: WhatsappLogWhereUniqueInput
  }

  /**
   * WhatsappLog findFirst
   */
  export type WhatsappLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * Filter, which WhatsappLog to fetch.
     */
    where?: WhatsappLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappLogs to fetch.
     */
    orderBy?: WhatsappLogOrderByWithRelationInput | WhatsappLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WhatsappLogs.
     */
    cursor?: WhatsappLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WhatsappLogs.
     */
    distinct?: WhatsappLogScalarFieldEnum | WhatsappLogScalarFieldEnum[]
  }

  /**
   * WhatsappLog findFirstOrThrow
   */
  export type WhatsappLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * Filter, which WhatsappLog to fetch.
     */
    where?: WhatsappLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappLogs to fetch.
     */
    orderBy?: WhatsappLogOrderByWithRelationInput | WhatsappLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WhatsappLogs.
     */
    cursor?: WhatsappLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WhatsappLogs.
     */
    distinct?: WhatsappLogScalarFieldEnum | WhatsappLogScalarFieldEnum[]
  }

  /**
   * WhatsappLog findMany
   */
  export type WhatsappLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * Filter, which WhatsappLogs to fetch.
     */
    where?: WhatsappLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WhatsappLogs to fetch.
     */
    orderBy?: WhatsappLogOrderByWithRelationInput | WhatsappLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WhatsappLogs.
     */
    cursor?: WhatsappLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WhatsappLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WhatsappLogs.
     */
    skip?: number
    distinct?: WhatsappLogScalarFieldEnum | WhatsappLogScalarFieldEnum[]
  }

  /**
   * WhatsappLog create
   */
  export type WhatsappLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * The data needed to create a WhatsappLog.
     */
    data: XOR<WhatsappLogCreateInput, WhatsappLogUncheckedCreateInput>
  }

  /**
   * WhatsappLog createMany
   */
  export type WhatsappLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WhatsappLogs.
     */
    data: WhatsappLogCreateManyInput | WhatsappLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WhatsappLog createManyAndReturn
   */
  export type WhatsappLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * The data used to create many WhatsappLogs.
     */
    data: WhatsappLogCreateManyInput | WhatsappLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WhatsappLog update
   */
  export type WhatsappLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * The data needed to update a WhatsappLog.
     */
    data: XOR<WhatsappLogUpdateInput, WhatsappLogUncheckedUpdateInput>
    /**
     * Choose, which WhatsappLog to update.
     */
    where: WhatsappLogWhereUniqueInput
  }

  /**
   * WhatsappLog updateMany
   */
  export type WhatsappLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WhatsappLogs.
     */
    data: XOR<WhatsappLogUpdateManyMutationInput, WhatsappLogUncheckedUpdateManyInput>
    /**
     * Filter which WhatsappLogs to update
     */
    where?: WhatsappLogWhereInput
    /**
     * Limit how many WhatsappLogs to update.
     */
    limit?: number
  }

  /**
   * WhatsappLog updateManyAndReturn
   */
  export type WhatsappLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * The data used to update WhatsappLogs.
     */
    data: XOR<WhatsappLogUpdateManyMutationInput, WhatsappLogUncheckedUpdateManyInput>
    /**
     * Filter which WhatsappLogs to update
     */
    where?: WhatsappLogWhereInput
    /**
     * Limit how many WhatsappLogs to update.
     */
    limit?: number
  }

  /**
   * WhatsappLog upsert
   */
  export type WhatsappLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * The filter to search for the WhatsappLog to update in case it exists.
     */
    where: WhatsappLogWhereUniqueInput
    /**
     * In case the WhatsappLog found by the `where` argument doesn't exist, create a new WhatsappLog with this data.
     */
    create: XOR<WhatsappLogCreateInput, WhatsappLogUncheckedCreateInput>
    /**
     * In case the WhatsappLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WhatsappLogUpdateInput, WhatsappLogUncheckedUpdateInput>
  }

  /**
   * WhatsappLog delete
   */
  export type WhatsappLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
    /**
     * Filter which WhatsappLog to delete.
     */
    where: WhatsappLogWhereUniqueInput
  }

  /**
   * WhatsappLog deleteMany
   */
  export type WhatsappLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WhatsappLogs to delete
     */
    where?: WhatsappLogWhereInput
    /**
     * Limit how many WhatsappLogs to delete.
     */
    limit?: number
  }

  /**
   * WhatsappLog without action
   */
  export type WhatsappLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhatsappLog
     */
    select?: WhatsappLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WhatsappLog
     */
    omit?: WhatsappLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EmailQueueScalarFieldEnum: {
    id: 'id',
    to: 'to',
    subject: 'subject',
    body: 'body',
    bulan: 'bulan',
    tahun: 'tahun',
    sendAt: 'sendAt',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type EmailQueueScalarFieldEnum = (typeof EmailQueueScalarFieldEnum)[keyof typeof EmailQueueScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WhatsappLogScalarFieldEnum: {
    id: 'id',
    target: 'target',
    message: 'message',
    status: 'status',
    sendAt: 'sendAt',
    createdAt: 'createdAt'
  };

  export type WhatsappLogScalarFieldEnum = (typeof WhatsappLogScalarFieldEnum)[keyof typeof WhatsappLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type EmailQueueWhereInput = {
    AND?: EmailQueueWhereInput | EmailQueueWhereInput[]
    OR?: EmailQueueWhereInput[]
    NOT?: EmailQueueWhereInput | EmailQueueWhereInput[]
    id?: IntFilter<"EmailQueue"> | number
    to?: StringFilter<"EmailQueue"> | string
    subject?: StringFilter<"EmailQueue"> | string
    body?: StringFilter<"EmailQueue"> | string
    bulan?: StringFilter<"EmailQueue"> | string
    tahun?: StringFilter<"EmailQueue"> | string
    sendAt?: DateTimeFilter<"EmailQueue"> | Date | string
    status?: StringFilter<"EmailQueue"> | string
    createdAt?: DateTimeFilter<"EmailQueue"> | Date | string
  }

  export type EmailQueueOrderByWithRelationInput = {
    id?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    bulan?: SortOrder
    tahun?: SortOrder
    sendAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailQueueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmailQueueWhereInput | EmailQueueWhereInput[]
    OR?: EmailQueueWhereInput[]
    NOT?: EmailQueueWhereInput | EmailQueueWhereInput[]
    to?: StringFilter<"EmailQueue"> | string
    subject?: StringFilter<"EmailQueue"> | string
    body?: StringFilter<"EmailQueue"> | string
    bulan?: StringFilter<"EmailQueue"> | string
    tahun?: StringFilter<"EmailQueue"> | string
    sendAt?: DateTimeFilter<"EmailQueue"> | Date | string
    status?: StringFilter<"EmailQueue"> | string
    createdAt?: DateTimeFilter<"EmailQueue"> | Date | string
  }, "id">

  export type EmailQueueOrderByWithAggregationInput = {
    id?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    bulan?: SortOrder
    tahun?: SortOrder
    sendAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: EmailQueueCountOrderByAggregateInput
    _avg?: EmailQueueAvgOrderByAggregateInput
    _max?: EmailQueueMaxOrderByAggregateInput
    _min?: EmailQueueMinOrderByAggregateInput
    _sum?: EmailQueueSumOrderByAggregateInput
  }

  export type EmailQueueScalarWhereWithAggregatesInput = {
    AND?: EmailQueueScalarWhereWithAggregatesInput | EmailQueueScalarWhereWithAggregatesInput[]
    OR?: EmailQueueScalarWhereWithAggregatesInput[]
    NOT?: EmailQueueScalarWhereWithAggregatesInput | EmailQueueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EmailQueue"> | number
    to?: StringWithAggregatesFilter<"EmailQueue"> | string
    subject?: StringWithAggregatesFilter<"EmailQueue"> | string
    body?: StringWithAggregatesFilter<"EmailQueue"> | string
    bulan?: StringWithAggregatesFilter<"EmailQueue"> | string
    tahun?: StringWithAggregatesFilter<"EmailQueue"> | string
    sendAt?: DateTimeWithAggregatesFilter<"EmailQueue"> | Date | string
    status?: StringWithAggregatesFilter<"EmailQueue"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmailQueue"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WhatsappLogWhereInput = {
    AND?: WhatsappLogWhereInput | WhatsappLogWhereInput[]
    OR?: WhatsappLogWhereInput[]
    NOT?: WhatsappLogWhereInput | WhatsappLogWhereInput[]
    id?: IntFilter<"WhatsappLog"> | number
    target?: StringFilter<"WhatsappLog"> | string
    message?: StringFilter<"WhatsappLog"> | string
    status?: StringFilter<"WhatsappLog"> | string
    sendAt?: DateTimeFilter<"WhatsappLog"> | Date | string
    createdAt?: DateTimeFilter<"WhatsappLog"> | Date | string
  }

  export type WhatsappLogOrderByWithRelationInput = {
    id?: SortOrder
    target?: SortOrder
    message?: SortOrder
    status?: SortOrder
    sendAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WhatsappLogWhereInput | WhatsappLogWhereInput[]
    OR?: WhatsappLogWhereInput[]
    NOT?: WhatsappLogWhereInput | WhatsappLogWhereInput[]
    target?: StringFilter<"WhatsappLog"> | string
    message?: StringFilter<"WhatsappLog"> | string
    status?: StringFilter<"WhatsappLog"> | string
    sendAt?: DateTimeFilter<"WhatsappLog"> | Date | string
    createdAt?: DateTimeFilter<"WhatsappLog"> | Date | string
  }, "id">

  export type WhatsappLogOrderByWithAggregationInput = {
    id?: SortOrder
    target?: SortOrder
    message?: SortOrder
    status?: SortOrder
    sendAt?: SortOrder
    createdAt?: SortOrder
    _count?: WhatsappLogCountOrderByAggregateInput
    _avg?: WhatsappLogAvgOrderByAggregateInput
    _max?: WhatsappLogMaxOrderByAggregateInput
    _min?: WhatsappLogMinOrderByAggregateInput
    _sum?: WhatsappLogSumOrderByAggregateInput
  }

  export type WhatsappLogScalarWhereWithAggregatesInput = {
    AND?: WhatsappLogScalarWhereWithAggregatesInput | WhatsappLogScalarWhereWithAggregatesInput[]
    OR?: WhatsappLogScalarWhereWithAggregatesInput[]
    NOT?: WhatsappLogScalarWhereWithAggregatesInput | WhatsappLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WhatsappLog"> | number
    target?: StringWithAggregatesFilter<"WhatsappLog"> | string
    message?: StringWithAggregatesFilter<"WhatsappLog"> | string
    status?: StringWithAggregatesFilter<"WhatsappLog"> | string
    sendAt?: DateTimeWithAggregatesFilter<"WhatsappLog"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"WhatsappLog"> | Date | string
  }

  export type EmailQueueCreateInput = {
    to: string
    subject: string
    body: string
    bulan: string
    tahun: string
    sendAt: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type EmailQueueUncheckedCreateInput = {
    id?: number
    to: string
    subject: string
    body: string
    bulan: string
    tahun: string
    sendAt: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type EmailQueueUpdateInput = {
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bulan?: StringFieldUpdateOperationsInput | string
    tahun?: StringFieldUpdateOperationsInput | string
    sendAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailQueueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bulan?: StringFieldUpdateOperationsInput | string
    tahun?: StringFieldUpdateOperationsInput | string
    sendAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailQueueCreateManyInput = {
    id?: number
    to: string
    subject: string
    body: string
    bulan: string
    tahun: string
    sendAt: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type EmailQueueUpdateManyMutationInput = {
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bulan?: StringFieldUpdateOperationsInput | string
    tahun?: StringFieldUpdateOperationsInput | string
    sendAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailQueueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    bulan?: StringFieldUpdateOperationsInput | string
    tahun?: StringFieldUpdateOperationsInput | string
    sendAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    email: string
    name?: string | null
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappLogCreateInput = {
    target: string
    message: string
    status: string
    sendAt?: Date | string
    createdAt?: Date | string
  }

  export type WhatsappLogUncheckedCreateInput = {
    id?: number
    target: string
    message: string
    status: string
    sendAt?: Date | string
    createdAt?: Date | string
  }

  export type WhatsappLogUpdateInput = {
    target?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sendAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    target?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sendAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappLogCreateManyInput = {
    id?: number
    target: string
    message: string
    status: string
    sendAt?: Date | string
    createdAt?: Date | string
  }

  export type WhatsappLogUpdateManyMutationInput = {
    target?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sendAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WhatsappLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    target?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sendAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EmailQueueCountOrderByAggregateInput = {
    id?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    bulan?: SortOrder
    tahun?: SortOrder
    sendAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailQueueAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EmailQueueMaxOrderByAggregateInput = {
    id?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    bulan?: SortOrder
    tahun?: SortOrder
    sendAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailQueueMinOrderByAggregateInput = {
    id?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    bulan?: SortOrder
    tahun?: SortOrder
    sendAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailQueueSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type WhatsappLogCountOrderByAggregateInput = {
    id?: SortOrder
    target?: SortOrder
    message?: SortOrder
    status?: SortOrder
    sendAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WhatsappLogMaxOrderByAggregateInput = {
    id?: SortOrder
    target?: SortOrder
    message?: SortOrder
    status?: SortOrder
    sendAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappLogMinOrderByAggregateInput = {
    id?: SortOrder
    target?: SortOrder
    message?: SortOrder
    status?: SortOrder
    sendAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WhatsappLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}