import chroma from 'chroma-js';
import enrich, {UniversalColor} from './color';

export default <T extends UniversalColor>(_color: T): T => {
  const color = enrich(_color);
  // eslint-disable-next-line no-bitwise
  const result = chroma(color.num() ^ 0xffffff).alpha(color.alpha());
  return (
    typeof _color === 'object'
      ? result
      : typeof _color === 'number'
      ? result.num()
      : result.hex()
  ) as T;
};
