import { MINI_REACT_ELEMENT_TYPE } from '../react';

/**
 * 判断传入对象是否是合法的Element类型
 */
export function isValidateElement(element: any) {
  return (
    element != null && typeof element === 'object' && element.$$typeof === MINI_REACT_ELEMENT_TYPE
  );
}

// 将组件转化为document对象
export function createDocElement(element: any) {
  if (typeof element === 'string') {
    return document.createTextNode(element);
  }

  if (!isValidateElement(element)) {
    throw new Error('element对象不符合生成规则');
  }

  const { type, props } = element;
  const node = typeof type === 'function' ? createDocElement(type()) : document.createElement(type);

  // 处理attribute
  for (const key in props) {
    if (key === 'children') {
      for (const child of props.children) {
        node.appendChild(createDocElement(child));
      }
    } else if (key === 'className') {
      node.setAttribute('class', props.className);
    } else {
      node.setAttribute(key.toLowerCase(), props[key]);
    }
  }

  return node;
}

export function render(element, container: HTMLElement) {
  /**
   * 检查内存中是否存在fiber树
   * 存在 => 首次渲染  => 清空所有子节点 => mount
   * 不存在 => 执行diff
   */
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }

  const node = createDocElement(element);

  container.appendChild(node);
}
