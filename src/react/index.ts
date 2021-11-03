//
export type ElementType = string | any;

/**
 * @description 接收三个参数
 * @param  {ElmentType} type 组件的类型
 * @param {Record<string,any>} config 代表组件的props
 */
export function createElement(type: ElementType, config: Record<string, any>, ...children: any[]) {
  const props = {
    children: [],
  };
  let key: string = null;

  // 处理defaultProps
  if (typeof type !== 'string' && type.defaultProps != null) {
    for (const item in type.defaultProps) {
      props[item] = type.defaultProps[item];
    }
  }

  // 处理props
  if (config != null) {
    for (const item in config) {
      const value = config[item];

      if (item === 'key') {
        // 针对key属性单独处理
        if (typeof value === 'string') {
          key = value;
        } else {
          throw new Error('props的key属性必须是string乐行');
        }
      } else {
        // 其他全部塞入props中
        props[item] = value;
      }
    }
  }

  // 处理children
  if (Array.isArray(children) && children.length > 0) {
    for (const item of children) {
      props.children.push(item);
    }
  }

  return MiniReactElement(type, key, props);
}

// 用来标识React组件
export const MINI_REACT_ELEMENT_TYPE = Symbol('mini-react-element');
/**
 * 返回ReactElement对象
 */
function MiniReactElement(type: ElementType, key: string, config: Record<string, any>) {
  return {
    $$typeof: MINI_REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    props: config,
  };
}
