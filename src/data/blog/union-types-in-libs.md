---
title: Alternate ways to handle deep types in libraries
pubDatetime: 2021-07-30T11:00:00.000-06:00
tags:
  - typescript
  - libraries
  - types
---

Take the following scenario in a typescript library we'll call `foo-lib`.

```typescript
import { LibAType } from "libA";
import { LibBType } from "libB";

interface FooType {
  foo: number;
}

const libAObject: LibAType = { a: 0 };
const libBObject: LibBType = { b: 1 };
const anObject: FooType = { foo: 2 };
export const FOO: MyType & LibAType & LibBType = Object.assign(
  anObject,
  libAObject,
  libBObject
);
```

You've got your own type (`FooType`), two types from other libraries (`LibAType`, `LibBType`),
and you're exporting a constant that is a union of all three types.
And you yourself are a library.

Now let's take the following scenario of how your consumer may use your library.

```typescript
import { FOO } from "foo-lib";

interface ConsumerType {
  consumer: number;
}

const consumerObject: ConsumerType = { consumer: 4 };

export const consumerConst: FooType & LibAType & LibBType & ConsumerType =
  Object.assign(FOO, consumerObject);
```

The consumer has their own type `ConsumerType` and is trying to build a constant that is a union if its own type (`FooType`)
and the type of the exported constant (`FOO`) from `foo-lib`.

Note that in order to properly and explicitly declare the type for `consumerConst`, you need to reference `LibAType` and `LibBType`,
but you can't import those types because they're transitive dependencies. Thus this wouldn't compile properly.

So how do we solve? I see two solutions.

### `typeof` in the consumer

```typescript
export const consumerConst: FooType & typeof FOO = Object.assign(
  FOO,
  consumerObject
);
```

This is succinct and avoids the library having to do anything.

### Explicit type in the library

In the library:

```typescript
export type MyInnerType = MyType & LibAType & LibBType;
export const FOO: MyInnerType = Object.assign(anObject, libAObject, libBObject);
```

In the consumer:

```typescript
import { MyInnerType } from "foo-lib";

export const consumerConst: FooType & MyInnerType = Object.assign(
  FOO,
  consumerObject
);
```

This puts an extra line of work on the library to explicitly declare a type of `FOO`,
but now the consumer doesn't need to know about the inner workings of the deep libraries.

I think I prefer tha explicit type scenario, but it's _six of one, half of a dozen_.
The explicit type is effectively doing what `typeof` does for you under the covers. 🤷
