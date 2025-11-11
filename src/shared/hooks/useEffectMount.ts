import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 *  Вызывается один раз после монтирования
 * @param cb - callback
 * @param dependencies - массив зависимостей
 */
export const useEffectAfterMount = (
  cb: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  const mounted = useRef(true);
  useEffect(() => {
    if (!mounted.current) {
      return cb();
    }
    mounted.current = false;
  }, dependencies);
};

/**
 *  Вызывается один раз при монтировании
 * @param cb - callback
 * @param dependencies - массив зависимостей
 */
export const useEffectMount = (
  cb: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  const mounted = useRef(true);
  useEffect(() => {
    if (mounted.current) {
      return cb();
    }
    mounted.current = false;
  }, dependencies);
};
