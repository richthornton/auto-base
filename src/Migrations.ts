import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";

export type MigrationSteps<T> = {
  initialValue: T;
  finalCodec: t.Type<T>;
};

export function migrations<A>(a: [t.Type<A>, () => A]): MigrationSteps<A>;
export function migrations<A, B>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B]
): MigrationSteps<B>;
export function migrations<A, B, C>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C]
): MigrationSteps<C>;
export function migrations<A, B, C, D>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D]
): MigrationSteps<D>;
export function migrations<A, B, C, D, E>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E]
): MigrationSteps<E>;
export function migrations<A, B, C, D, E, F>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F]
): MigrationSteps<F>;
export function migrations<A, B, C, D, E, F, G>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G]
): MigrationSteps<G>;
export function migrations<A, B, C, D, E, F, G, H>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H]
): MigrationSteps<H>;
export function migrations<A, B, C, D, E, F, G, H, I>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I]
): MigrationSteps<I>;
export function migrations<A, B, C, D, E, F, G, H, I, J>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J]
): MigrationSteps<J>;
export function migrations<A, B, C, D, E, F, G, H, I, J, K>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K]
): MigrationSteps<K>;
export function migrations<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K],
  kl: [t.Type<L>, (k: K) => L]
): MigrationSteps<L>;
export function migrations<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K],
  kl: [t.Type<L>, (k: K) => L],
  lm: [t.Type<M>, (l: L) => M]
): MigrationSteps<M>;
export function migrations<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K],
  kl: [t.Type<L>, (k: K) => L],
  lm: [t.Type<M>, (l: L) => M],
  mn: [t.Type<N>, (m: M) => N]
): MigrationSteps<N>;
export function migrations<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K],
  kl: [t.Type<L>, (k: K) => L],
  lm: [t.Type<M>, (l: L) => M],
  mn: [t.Type<N>, (m: M) => N],
  no: [t.Type<O>, (n: N) => O]
): MigrationSteps<O>;
export function migrations<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K],
  kl: [t.Type<L>, (k: K) => L],
  lm: [t.Type<M>, (l: L) => M],
  mn: [t.Type<N>, (m: M) => N],
  no: [t.Type<O>, (n: N) => O],
  op: [t.Type<P>, (o: O) => P]
): MigrationSteps<P>;
export function migrations<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K],
  kl: [t.Type<L>, (k: K) => L],
  lm: [t.Type<M>, (l: L) => M],
  mn: [t.Type<N>, (m: M) => N],
  no: [t.Type<O>, (n: N) => O],
  op: [t.Type<P>, (o: O) => P],
  pq: [t.Type<Q>, (p: P) => Q]
): MigrationSteps<Q>;
export function migrations<
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R
>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K],
  kl: [t.Type<L>, (k: K) => L],
  lm: [t.Type<M>, (l: L) => M],
  mn: [t.Type<N>, (m: M) => N],
  no: [t.Type<O>, (n: N) => O],
  op: [t.Type<P>, (o: O) => P],
  pq: [t.Type<Q>, (p: P) => Q],
  qr: [t.Type<R>, (q: Q) => R]
): MigrationSteps<R>;
export function migrations<
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S
>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K],
  kl: [t.Type<L>, (k: K) => L],
  lm: [t.Type<M>, (l: L) => M],
  mn: [t.Type<N>, (m: M) => N],
  no: [t.Type<O>, (n: N) => O],
  op: [t.Type<P>, (o: O) => P],
  pq: [t.Type<Q>, (p: P) => Q],
  qr: [t.Type<R>, (q: Q) => R],
  rs: [t.Type<S>, (r: R) => S]
): MigrationSteps<S>;
export function migrations<
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T
>(
  a: [t.Type<A>, () => A],
  ab: [t.Type<B>, (a: A) => B],
  bc: [t.Type<C>, (b: B) => C],
  cd: [t.Type<D>, (c: C) => D],
  de: [t.Type<E>, (d: D) => E],
  ef: [t.Type<F>, (e: E) => F],
  fg: [t.Type<G>, (f: F) => G],
  gh: [t.Type<H>, (g: G) => H],
  hi: [t.Type<I>, (h: H) => I],
  ij: [t.Type<J>, (i: I) => J],
  jk: [t.Type<K>, (j: J) => K],
  kl: [t.Type<L>, (k: K) => L],
  lm: [t.Type<M>, (l: L) => M],
  mn: [t.Type<N>, (m: M) => N],
  no: [t.Type<O>, (n: N) => O],
  op: [t.Type<P>, (o: O) => P],
  pq: [t.Type<Q>, (p: P) => Q],
  qr: [t.Type<R>, (q: Q) => R],
  rs: [t.Type<R>, (r: R) => S],
  st: [t.Type<T>, (s: S) => T]
): MigrationSteps<T>;

export function migrations(
  a: [t.Type<unknown>, Function],
  ab?: [t.Type<unknown>, Function],
  bc?: [t.Type<unknown>, Function],
  cd?: [t.Type<unknown>, Function],
  de?: [t.Type<unknown>, Function],
  ef?: [t.Type<unknown>, Function],
  fg?: [t.Type<unknown>, Function],
  gh?: [t.Type<unknown>, Function],
  hi?: [t.Type<unknown>, Function]
): unknown {
  const args = Array.from(arguments);
  const functions = args.map((ar) => ar[1]) as [any, any];
  const finalMigration = args[args.length - 1] as [t.Type<unknown>, Function];
  return {
    finalCodec: finalMigration[0],
    initialValue: pipe(undefined, ...functions),
  };
}
